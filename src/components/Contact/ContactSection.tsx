import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../../hooks/useAudio';

const GFORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd-4LxWG4YRlzwTNtunzkDdPvWUHEam5pQPjwNT3cI_ihwbSQ/formResponse';
const ENTRY_NAME = 'entry.637031929';
const ENTRY_EMAIL = 'entry.585507557';
const ENTRY_MESSAGE = 'entry.1331300177';

const COOLDOWN_MS = 60_000; // 60 seconds between messages
const DAILY_LIMIT = 3;
const STORAGE_KEY = 'contact_rate';

function getRateData(): { lastSent: number; dailyCount: number; dailyDate: string } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { lastSent: 0, dailyCount: 0, dailyDate: '' };
}

function setRateData(data: { lastSent: number; dailyCount: number; dailyDate: string }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);

  // Cooldown timer
  useEffect(() => {
    const rate = getRateData();
    const remaining = Math.max(0, COOLDOWN_MS - (Date.now() - rate.lastSent));
    if (remaining > 0) setCooldown(Math.ceil(remaining / 1000));

    const interval = setInterval(() => {
      setCooldown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [sent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');
    setError('');

    // Rate limit checks
    const rate = getRateData();
    const today = new Date().toDateString();
    const dailyCount = rate.dailyDate === today ? rate.dailyCount : 0;

    const elapsed = Date.now() - rate.lastSent;
    if (elapsed < COOLDOWN_MS) {
      setError(`Please wait ${Math.ceil((COOLDOWN_MS - elapsed) / 1000)}s before sending again.`);
      return;
    }
    if (dailyCount >= DAILY_LIMIT) {
      setError(`Daily limit reached (${DAILY_LIMIT} messages). Try again tomorrow.`);
      return;
    }

    setSending(true);

    try {
      const body = new URLSearchParams();
      body.append(ENTRY_NAME, formData.name);
      body.append(ENTRY_EMAIL, formData.email);
      body.append(ENTRY_MESSAGE, formData.message);

      await fetch(GFORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      // Update rate limit
      setRateData({ lastSent: Date.now(), dailyCount: dailyCount + 1, dailyDate: today });
      setCooldown(Math.ceil(COOLDOWN_MS / 1000));

      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSending(false);
      setError('Transmission failed. Try again.');
    }
  };

  const contactItems = [
    { icon: '📧', label: 'Email', value: 'mayank275sharma@gmail.com', href: 'mailto:mayank275sharma@gmail.com' },
    { icon: '🔗', label: 'GitHub', value: 'github.com/Ms-10182', href: 'https://github.com/Ms-10182' },
    { icon: '💼', label: 'LinkedIn', value: 'mayank-sharma-078278243', href: 'https://www.linkedin.com/in/mayank-sharma-078278243/' },
    { icon: '🐦', label: 'Twitter/X', value: '@mayank_275', href: 'https://x.com/Mayank_275' },
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: '⟐' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mayank-sharma-078278243/', icon: '◈' },
    { name: 'Twitter', url: 'https://x.com/Mayank_275', icon: '⬡' },
    { name: 'Discord', url: '#', icon: '◇' },
  ];

  return (
    <section id="contact" className="relative min-h-screen py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
            {'// ESTABLISH CONNECTION'}
          </p>
          <h2 className="cyber-heading text-3xl md:text-5xl neon-text">Contact</h2>
          <p className="font-code text-cyber-blue-dim text-sm max-w-lg mx-auto mt-4">
            Ready to build something extraordinary? Open a secure channel.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Contact Info + Resume */}
          <motion.div
            className="cyber-glass p-6 md:p-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="cyber-heading text-lg neon-text-purple mb-6">Connect</h3>

            <div className="space-y-3 mb-8">
              {contactItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all group border border-transparent hover:border-cyber-blue/15"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => playSound('hover')}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-xl w-8 h-8 flex items-center justify-center rounded-lg bg-cyber-blue/5 group-hover:bg-cyber-blue/10 transition-colors">
                    {item.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-cyber-blue-dim text-[10px] block uppercase tracking-wider">{item.label}</span>
                    <span className="text-cyber-blue font-code text-sm truncate block">{item.value}</span>
                  </div>
                  <span className="text-cyber-blue-dim text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </motion.a>
              ))}
            </div>

            {/* Resume button */}
            <motion.a
              href="https://1drv.ms/b/c/2d4592b27b627992/IQDaqIuuSEGfQJkHIhZipAt-AZyxHedjflBOA8xhn3S8APA?e=oSv3ZC"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button w-full text-center py-3 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => playSound('click')}
            >
              <span>📄</span> View Resume
            </motion.a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="cyber-glass p-6 md:p-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="cyber-heading text-lg neon-text-purple mb-6">Send Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-cyber-blue-dim text-[10px] font-code block mb-1.5 uppercase tracking-wider">
                  {'>'} Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/50 border border-cyber-blue/20 rounded-lg px-4 py-2.5 font-code text-sm text-cyber-blue placeholder:text-cyber-blue-dim/30 focus:outline-none focus:border-cyber-blue/60 focus:shadow-neon transition-all"
                  placeholder="Enter your alias..."
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-cyber-blue-dim text-[10px] font-code block mb-1.5 uppercase tracking-wider">
                  {'>'} Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/50 border border-cyber-blue/20 rounded-lg px-4 py-2.5 font-code text-sm text-cyber-blue placeholder:text-cyber-blue-dim/30 focus:outline-none focus:border-cyber-blue/60 focus:shadow-neon transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-cyber-blue-dim text-[10px] font-code block mb-1.5 uppercase tracking-wider">
                  {'>'} Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-black/50 border border-cyber-blue/20 rounded-lg px-4 py-2.5 font-code text-sm text-cyber-blue placeholder:text-cyber-blue-dim/30 focus:outline-none focus:border-cyber-blue/60 focus:shadow-neon transition-all resize-none"
                  placeholder="Type your message..."
                  required
                />
              </div>

              {/* Submit */}
              <div className="relative">
                <motion.button
                  type="submit"
                  className={`cyber-button-pink w-full py-3 ${sending || cooldown > 0 ? 'opacity-70' : ''}`}
                  disabled={sending || cooldown > 0}
                  whileHover={!sending && cooldown === 0 ? { scale: 1.02 } : {}}
                  whileTap={!sending && cooldown === 0 ? { scale: 0.98 } : {}}
                >
                  {sending
                    ? '⟳ Transmitting...'
                    : sent
                    ? '✓ Message Sent!'
                    : cooldown > 0
                    ? `⏳ Wait ${cooldown}s`
                    : '⚡ Send Message'}
                </motion.button>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="absolute -bottom-10 left-0 right-0 text-center font-code text-[10px] text-cyber-red"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      ⚠ {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success animation */}
                <AnimatePresence>
                  {sent && (
                    <motion.div
                      className="absolute -top-12 left-1/2 -translate-x-1/2 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green font-code text-xs px-4 py-2 rounded-lg whitespace-nowrap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{ boxShadow: '0 0 15px rgba(0,255,65,0.2)' }}
                    >
                      ✓ Transmission received successfully
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-20 pt-8 border-t border-cyan-900/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo + copyright */}
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="font-cyber text-sm text-cyber-blue">
                <span className="text-neon-pink">{'<'}</span>MS<span className="text-neon-pink">{'/>'}</span>
              </div>
              <p className="font-code text-[10px] text-cyber-blue-dim">
                Designed & Built by <span className="text-neon-pink">Mayank Sharma with AI</span> — {new Date().getFullYear()}
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-cyber-blue/20 flex items-center justify-center text-cyber-blue-dim hover:text-cyber-blue hover:border-cyber-blue/50 hover:bg-cyber-blue/5 transition-all font-cyber text-sm"
                  whileHover={{ scale: 1.1, y: -2 }}
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <span className="font-code text-[10px] text-cyber-blue-dim">
                All systems operational
              </span>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
