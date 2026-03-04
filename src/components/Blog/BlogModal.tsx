import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { playSound } from '../../hooks/useAudio';
import type { BlogPost } from '../../data/blog';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogModal({ post, onClose }: BlogModalProps) {
  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="cyber-glass-strong max-w-3xl w-full max-h-[85vh] overflow-y-auto hide-scrollbar"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, type: 'spring' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 p-4 md:p-6 border-b border-cyan-900/30 bg-cyber-black/95 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyber-green" />
                  <span className="font-code text-[10px] text-cyber-green uppercase tracking-widest">
                    Decrypted Data
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-code text-xs text-cyber-blue-dim">{post.date}</span>
                  <span className="font-code text-xs text-cyber-blue-dim">•</span>
                  <span className="font-code text-xs text-cyber-blue-dim">{post.readTime}</span>
                </div>
              </div>
              <h2 className="font-cyber text-lg md:text-xl text-cyber-blue uppercase tracking-wider">
                {post.title}
              </h2>
              <div className="flex gap-2 mt-2 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="neon-badge text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Markdown content */}
            <div className="p-4 md:p-6 prose-cyber">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-cyber text-xl text-neon-pink mb-4 mt-6">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-cyber text-lg text-cyber-blue mb-3 mt-5 border-b border-cyan-900/20 pb-2">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-cyber text-base text-cyber-purple mb-2 mt-4">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="font-code text-sm text-cyber-blue-dim leading-relaxed mb-4">{children}</p>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes('language-');
                    if (isBlock) {
                      return (
                        <div className="my-4 cyber-glass p-4 rounded-lg overflow-x-auto">
                          <code className="font-code text-xs text-cyber-green whitespace-pre">
                            {children}
                          </code>
                        </div>
                      );
                    }
                    return (
                      <code className="font-code text-xs bg-cyber-blue/10 text-cyber-blue px-1.5 py-0.5 rounded">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => <>{children}</>,
                  ul: ({ children }) => (
                    <ul className="space-y-1 mb-4 ml-4">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="space-y-1 mb-4 ml-4 list-decimal">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="font-code text-sm text-cyber-blue-dim flex items-start gap-2">
                      <span className="text-neon-pink mt-0.5">▸</span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-cyber-blue font-bold">{children}</strong>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-cyber-purple pl-4 my-4 italic text-cyber-blue-dim">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Close button */}
            <div className="sticky bottom-0 p-4 border-t border-cyan-900/30 bg-cyber-black/95 backdrop-blur-sm flex justify-end">
              <motion.button
                className="cyber-button-red text-xs px-5 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSound('click');
                  onClose();
                }}
              >
                ✕ Close Transmission
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
