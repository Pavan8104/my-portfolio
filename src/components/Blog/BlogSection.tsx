import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogPosts, type BlogPost } from '../../data/blog';
import BlogCard from './BlogCard';
import BlogModal from './BlogModal';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [threadPaths, setThreadPaths] = useState<string[]>([]);

  // Generate SVG thread connections between related posts
  useEffect(() => {
    const generateThreads = () => {
      if (!sectionRef.current) return;
      const paths: string[] = [];

      blogPosts.forEach((post) => {
        if (!post.related) return;
        const sourceCard = sectionRef.current?.querySelector(`[data-blog-id="${post.id}"]`);
        if (!sourceCard) return;

        post.related.forEach((relatedId) => {
          const targetCard = sectionRef.current?.querySelector(`[data-blog-id="${relatedId}"]`);
          if (!targetCard) return;

          const sourceRect = sourceCard.getBoundingClientRect();
          const targetRect = targetCard.getBoundingClientRect();
          const sectionRect = sectionRef.current!.getBoundingClientRect();

          const x1 = sourceRect.left + sourceRect.width / 2 - sectionRect.left;
          const y1 = sourceRect.top + sourceRect.height / 2 - sectionRect.top;
          const x2 = targetRect.left + targetRect.width / 2 - sectionRect.left;
          const y2 = targetRect.top + targetRect.height / 2 - sectionRect.top;

          // Curved path
          const midX = (x1 + x2) / 2;
          const midY = Math.min(y1, y2) - 40;
          paths.push(`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`);
        });
      });

      setThreadPaths(paths);
    };

    // Delay to let layout settle
    const timer = setTimeout(generateThreads, 1000);
    window.addEventListener('resize', generateThreads);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', generateThreads);
    };
  }, []);

  return (
    <section id="blog" className="relative min-h-screen py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" />

      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
            {'// INTERCEPTED TRANSMISSIONS'}
          </p>
          <h2 className="cyber-heading text-3xl md:text-5xl neon-text-pink">Blog</h2>
          <p className="font-code text-cyber-blue-dim text-sm max-w-xl mx-auto mt-4">
            Decoded data streams from the digital underground. Thoughts on tech, security, and the future.
          </p>
        </motion.div>

        {/* SVG thread connections */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block"
          style={{ overflow: 'visible' }}
        >
          {threadPaths.map((path, i) => (
            <motion.path
              key={i}
              d={path}
              fill="none"
              stroke="rgba(255, 68, 68, 0.15)"
              strokeWidth={1}
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          ))}
        </svg>

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {blogPosts.map((post, index) => (
            <div key={post.id} data-blog-id={post.id}>
              <BlogCard
                post={post}
                index={index}
                onClick={() => setSelectedPost(post)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Blog modal */}
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  );
}
