export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
  content: string;
  related?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Hexagonal Architecture in Go: Moving Beyond MVC',
    excerpt: 'How I restructured my Go backend using Ports and Adapters to make business logic completely independent of frameworks and databases.',
    date: '2025-12-10',
    tags: ['Go', 'Architecture', 'Backend'],
    readTime: '6 min',
    content: `# Hexagonal Architecture in Go: Moving Beyond MVC

> **TL;DR** — Hexagonal Architecture (Ports & Adapters) separates your core business logic from HTTP, databases, and frameworks. In Go, explicit interfaces make this pattern feel native. Structure: \`core\` (domain), \`transport\` (HTTP), \`repo\` (DB), \`service\` (glue).

---

I've been refining the backend for my latest project, and I decided to move away from standard layered architectures to a strict Hexagonal Architecture (Ports and Adapters).

The goal was to make the core business logic completely independent of the framework and database.

## How I Structured the Project

- **\`internal/core\`** — Pure domain logic and interfaces (Ports). Zero dependencies on HTTP or SQL.
- **\`internal/transport\`** — Driving Adapters (HTTP/Gin). This is where the middleware lives.
- **\`internal/repo\`** — Driven Adapters (Postgres/pgx & Redis).
- **\`internal/service\`** — The application glue connecting everything.

## The Key Insight

Separating the "Task ID" and "Rate Limiter" logic into distinct middlewares within the transport layer cleaned up the code significantly. It forces you to think about where logic actually belongs — is it business logic, or is it just handling the request?

Implementing this in Go has been a joy. The explicit interface implementation makes the "Ports" concept very natural.

\`\`\`go
// Port (interface in core) — zero external dependencies
type LaborerRepository interface {
    FindByID(ctx context.Context, id string) (*Laborer, error)
    Save(ctx context.Context, l *Laborer) error
}

// Adapter (in repo layer) — implements the port
type PostgresLaborerRepo struct { db *pgxpool.Pool }

func (r *PostgresLaborerRepo) FindByID(ctx context.Context, id string) (*core.Laborer, error) {
    // SQL implementation here
}
\`\`\`

The business logic never imports \`pgx\`. The adapter never bleeds into \`core\`. Clean, testable, deletable.`,
    related: ['post-2'],
  },
  {
    id: 'post-2',
    title: 'Why I Chose a Modular Monolith Over Microservices',
    excerpt: 'Unless you have 10 million users, microservices are just distributed spaghetti. Here\'s the architecture decision I made for my high-concurrency Go project.',
    date: '2025-11-20',
    tags: ['Go', 'Architecture', 'Backend'],
    readTime: '7 min',
    content: `# Why I Chose a Modular Monolith Over Microservices

> **TL;DR** — Microservices add network latency and deployment complexity without solving your actual problem unless you're at massive scale. A Modular Monolith with strict Go interface boundaries gives you "Cohesion now, Microservices later" — the business logic stays the same when you eventually split.

---

When I started migrating my backend from Node.js to Go, my instinct was to over-engineer. I wanted to split everything into Microservices, implement Database Sharding, and use complex design patterns.

I thought that's what "Scale" looked like. I was wrong.

## The Hard Truth

Unless you have 10 million users, Microservices are just "Distributed Spaghetti." They add network latency and deployment complexity without solving the core problem.

For my current project (a high-concurrency labor marketplace), I adopted the **Modular Monolith** architecture. The goal? *"Cohesion now, Microservices later."*

## The Secret: Go Interfaces as Boundaries

By defining dependencies as behaviors, not implementations, I decouple my domains:

\`\`\`go
// Today: direct method call (monolith)
type BookingService struct {
    laborers LaborerService // This is an interface, not a concrete type
}

// Tomorrow: swap the implementation to a gRPC/HTTP client
// BookingService doesn't change. Zero refactoring required.
\`\`\`

## What Actually Matters for Production

- **12-Factor Config**: No hardcoded secrets (\`os.Getenv\`)
- **Structured Logging**: JSON logs over \`fmt.Println\` for observability
- **Graceful Shutdowns**: Handling SIGTERM so users don't get cut off during deploys
- **Migrations**: Version control for SQL, not manual queries

Scale is a privilege, not a starting point. Write code that is easy to delete, easy to move, and easy to debug.`,
    related: ['post-1', 'post-3'],
  },
  {
    id: 'post-3',
    title: 'Why sync.Mutex is a Trap in Backend Engineering',
    excerpt: 'A Mutex locks memory, not data. In a Kubernetes environment with multiple replicas, application-level locks are a race condition waiting to happen.',
    date: '2025-11-05',
    tags: ['Go', 'Concurrency', 'Backend'],
    readTime: '5 min',
    content: `# Why sync.Mutex is a Trap in Backend Engineering

> **TL;DR** — \`sync.Mutex\` locks memory on a single process. In a Kubernetes cluster with multiple replicas, it does nothing. Push concurrency control to the database layer using \`SELECT ... FOR UPDATE\` (Pessimistic Locking) instead.

---

Migrating from Node.js to Go has been a shift in mindset. The syntax is easy; thinking in distributed systems is the hard part.

I'm currently building a high-concurrency booking engine. The biggest hurdle wasn't the logic — it was data integrity.

## The Trap

I initially reached for Go's \`sync.Mutex\` to prevent double-bookings. It worked perfectly in local testing.

But then I realized: **Mutex locks memory, not data.**

In a production environment (Kubernetes) with multiple replicas, a memory lock on **Pod A** does absolutely nothing to stop a request hitting **Pod B**.

## The Fix: Database-Level Locking

\`\`\`sql
-- Pessimistic Locking: lock the row at the DB level
BEGIN;
SELECT * FROM bookings WHERE slot_id = $1 FOR UPDATE;
-- Now safely perform your write
UPDATE bookings SET status = 'confirmed' WHERE slot_id = $1;
COMMIT;
\`\`\`

This works across all pods, all replicas, all restarts. The lock is owned by the transaction, not by a process in memory.

## The Lesson

If your lock doesn't survive a server restart or a horizontal scale-out, it's not a lock — it's a race condition waiting to happen.

Application-level locks are fine for in-process coordination (goroutines within one binary). For anything that touches persistent data at scale, the database is the single source of truth.`,
    related: ['post-4'],
  },
  {
    id: 'post-4',
    title: 'Concurrency Part 2: Locking Fixed the Write. What About the Read?',
    excerpt: 'Non-deterministic reads are just as dangerous as race conditions on writes. Timestamp collisions in distributed systems will silently corrupt your query results.',
    date: '2025-10-22',
    tags: ['Go', 'Concurrency', 'PostgreSQL'],
    readTime: '5 min',
    content: `# Concurrency Part 2: Locking Fixed the Write. What About the Read?

> **TL;DR** — Timestamp collisions at millisecond-level precision make \`ORDER BY created_at DESC LIMIT 1\` non-deterministic. Always append a unique monotonic key as a tie-breaker: \`ORDER BY created_at DESC, id DESC LIMIT 1\`.

---

In my previous post, I talked about using Locking to prevent race conditions when writing data. We assume that once the data is safely written, the hard part is over.

But in distributed systems, **reading the data can be just as dangerous.**

## The Scenario

You've successfully handled high-concurrency writes. Your system logs state changes or retries rapidly — sometimes multiple times within the same second. You run a standard query:

\`\`\`sql
SELECT * FROM booking_attempts ORDER BY created_at DESC LIMIT 1
\`\`\`

## The Hidden Failure

If your database stores timestamps in **seconds** (or if you hit millisecond-level collisions), you now have multiple valid rows with the exact same \`created_at\`.

Because you didn't define a unique sort order, the database engine essentially **"guesses"** which row to return based on disk order. Your result becomes **non-deterministic**.

You might fetch "Retry #1" instead of "Retry #2," even though Retry #2 happened later.

## The Fix: Deterministic Tie-Breaking

\`\`\`sql
-- Always append a unique, monotonic key as a tie-breaker
SELECT * FROM booking_attempts 
ORDER BY created_at DESC, id DESC 
LIMIT 1
\`\`\`

## Takeaway: Concurrency Fights You on Two Fronts

| Front | Problem | Solution |
|-------|---------|----------|
| **Writes** | Race conditions | Database locks (\`FOR UPDATE\`) |
| **Reads** | Non-determinism | Deterministic tie-breaker sorting |

Lesson: **Criticality > Quantity.** We often ignore edge cases because they seem rare — until they silently corrupt production data.`,
    related: ['post-3'],
  },
  {
    id: 'post-5',
    title: 'Decentralized Identity: The Future of Auth',
    excerpt: 'How blockchain-based identity systems will replace traditional authentication and give users true ownership of their data.',
    date: '2025-09-15',
    tags: ['Web3', 'Security', 'Blockchain'],
    readTime: '8 min',
    content: `# Decentralized Identity: The Future of Auth

> **TL;DR** — Traditional auth stores your credentials in corporate honeypots. Decentralized Identifiers (DIDs) use cryptographic proofs on a blockchain — you own your identity, share only what you choose, and no central server can be breached.

---

The way we handle identity online is fundamentally broken. Every service stores its own copy of your credentials, creating honeypots for hackers and giving corporations control over your digital existence.

## The Problem

Traditional authentication relies on centralized databases. When these get breached — and they always do — millions of users are affected. We've accepted this as normal, but it doesn't have to be.

## Enter DIDs

Decentralized Identifiers (DIDs) flip the model. Instead of trusting a third party to verify who you are, you prove your identity using cryptographic proofs stored on a blockchain.

\`\`\`solidity
contract IdentityRegistry {
    mapping(address => DID) public identities;
    
    function registerIdentity(bytes32 didHash) external {
        identities[msg.sender] = DID({
            owner: msg.sender,
            hash: didHash,
            timestamp: block.timestamp
        });
    }
}
\`\`\`

## Why It Matters

- **Self-Sovereign**: You own your data, period.
- **Interoperable**: One identity across all platforms.
- **Privacy-First**: Share only what you choose.

The future of authentication isn't about stronger passwords — it's about eliminating them entirely.`,
    related: ['post-6'],
  },
  {
    id: 'post-6',
    title: 'Smart Contract Security: Lessons from $2B in Hacks',
    excerpt: 'Analyzing the most devastating DeFi exploits and what they teach us about writing secure smart contracts.',
    date: '2025-08-10',
    tags: ['Security', 'Solidity', 'DeFi'],
    readTime: '10 min',
    content: `# Smart Contract Security: Lessons from $2B in Hacks

> **TL;DR** — Reentrancy, flash loan attacks, and access control failures have drained billions from DeFi. Follow the CEI pattern (Checks → Effects → Interactions), use OpenZeppelin, and never skip audits.

---

The DeFi space has lost billions to smart contract exploits. Each hack teaches us something critical about secure development.

## Common Attack Vectors

### Reentrancy
The classic. A malicious contract calls back into your contract before state is updated.

### Flash Loan Attacks
Borrow millions, manipulate prices, profit, repay — all in one transaction.

### Access Control Failures
When critical functions lack proper authorization checks, anyone can drain funds.

## Best Practices

1. **Follow CEI pattern**: Checks, Effects, Interactions
2. **Use battle-tested libraries**: OpenZeppelin is your friend
3. **Formal verification**: Mathematical proof your code is correct
4. **Multiple audits**: One audit is never enough

The cost of security is always less than the cost of a breach.`,
    related: ['post-5'],
  },
];
