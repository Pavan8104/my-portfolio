import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../../hooks/useAudio';
import { LOGO } from '../../constants/brand';
import emailjs from '@emailjs/browser';

const COOLDOWN_MS = 30_000; // 30 seconds between messages
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
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' });
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

  const sanitizeInput = (str: string) => {
    return str.replace(/<[^>]*>?/gm, '').trim(); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    if (formData.company !== '') {
      console.warn('Silent block: automated submission detected.');
      return;
    }

    const formEl = e.currentTarget;
    const nameInput = formEl.elements.namedItem('name') as HTMLInputElement;
    const msgInput = formEl.elements.namedItem('message') as HTMLTextAreaElement;
    if (nameInput) nameInput.value = sanitizeInput(formData.name);
    if (msgInput) msgInput.value = sanitizeInput(formData.message);

    if (!nameInput?.value || !msgInput?.value || !formData.email.includes('@')) {
      console.warn('Silent block: Invalid fields detected.');
      return;
    }

    playSound('click');

    const rate = getRateData();
    const today = new Date().toDateString();
    const dailyCount = rate.dailyDate === today ? rate.dailyCount : 0;
    const elapsed = Date.now() - rate.lastSent;

    if (elapsed < COOLDOWN_MS) {
      console.warn(`Silent block: Rate limit exceeded.`);
      return;
    }
    if (dailyCount >= DAILY_LIMIT) {
      console.warn(`Silent block: Daily limit reached.`);
      return;
    }

    setSending(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      e.currentTarget,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      // Update rate limit
      setRateData({ lastSent: Date.now(), dailyCount: dailyCount + 1, dailyDate: today });
      setCooldown(Math.ceil(COOLDOWN_MS / 1000));
      
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setFormData({ name: '', email: '', message: '', company: '' });
    })
    .catch((err) => {
      setSending(false);
      console.error('Email failed:', err);
    });
  };

  const contactItems = [
    { icon: '📧', label: 'Email', href: 'mailto:ps3297169@gmail.com' },
    { icon: '🔗', label: 'GitHub', href: 'https://github.com/Pavan8104' },
    { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/pavan-sharma-1645ab276/' },
    { icon: '🚀', label: 'Projects', href: 'https://github.com/Pavan8104' },
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Pavan8104', icon: '⟐' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pavan-sharma-1645ab276/', icon: '◈' },
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
            <h3 className="cyber-heading text-lg neon-text-purple mb-8 text-center md:text-left">Connect</h3>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
              {contactItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.label === 'Projects' ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="cyber-button py-3 px-6 flex items-center justify-center gap-3 w-full sm:w-auto flex-1 min-w-[140px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => playSound('hover')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    if (item.label === 'Projects') {
                      e.preventDefault();
                      playSound('click');
                      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-code text-xs uppercase tracking-wider">{item.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Resume button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="cyber-button w-full text-center py-3 flex items-center justify-center gap-2 mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playSound('click')}
            >
              <span>📄</span> Download Resume
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
              <input 
                type="text" 
                name="company" 
                style={{ display: 'none' }} 
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                tabIndex={-1} 
                autoComplete="off" 
              />
              <div id="recaptcha-hook" style={{ display: 'none' }}></div>

              {/* Name */}
              <div>
                <label className="text-cyber-blue-dim text-[10px] font-code block mb-1.5 uppercase tracking-wider">
                  {'>'} Name
                </label>
                <input
                  type="text"
                  name="name"
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
                  name="email"
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
                  name="message"
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
                      {error}
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
                      Message sent successfully 🚀
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
                <span className="text-neon-pink">{'<'}</span>{LOGO}<span className="text-neon-pink">{'/>'}</span>
              </div>
              <p className="font-code text-[10px] text-cyber-blue-dim">
                Designed & Built by <span className="text-neon-pink">Pavan Sharma</span> — {new Date().getFullYear()}
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
