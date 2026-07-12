import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import personal from '@/data/personal';
import type { ContactForm } from '@/types';

// ── Web3Forms Configuration ──────────────────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = '63a8cb3d-b507-45e4-a382-98feb5738c97';
const WEB3FORMS_ENDPOINT   = 'https://api.web3forms.com/submit';
// ─────────────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'sending' | 'success' | 'error';

const INITIAL: ContactForm = { name: '', email: '', subject: '', message: '' };

export default function ContactSection() {
  const { ref, inView } = useScrollReveal();
  const [form, setForm]     = useState<ContactForm>(INITIAL);
  const [status, setStatus] = useState<Status>('idle');
  const [errMsg, setErrMsg] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrMsg('');

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      // Honeypot field — helps block bots
      formData.append('botcheck', '');

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setForm(INITIAL);
      } else {
        throw new Error(data.message || 'Submission failed. Please try again.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      console.error('[ContactForm] Web3Forms error:', message);
      setStatus('error');
      setErrMsg(message);
    }
  };

  return (
    <section id="contact" className="py-24 bg-dark" ref={ref}>
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={staggerItem} className="mb-12">
            <span className="section-label bg-white text-dark">Contact</span>
            <h2 className="section-title text-white">Let's Work Together</h2>
            <p className="section-subtitle text-slate-400">I'm always open to new opportunities and collaborations</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Left — contact info */}
            <motion.div variants={fadeInLeft} className="lg:col-span-2 space-y-6">
              <div
                className="border-2 border-white p-6"
                style={{ boxShadow: '4px 4px 0 #fff' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Mail size={18} className="text-primary" />
                  <div>
                    <p className="font-body text-xs text-slate-400">Email</p>
                    <a
                      href={`mailto:${personal.email}`}
                      className="font-mono text-sm text-white hover:text-primary transition-colors"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-secondary" />
                  <div>
                    <p className="font-body text-xs text-slate-400">Location</p>
                    <p className="font-mono text-sm text-white">{personal.location}</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {[
                  { icon: Github,   href: personal.social.github,  label: 'GitHub' },
                  { icon: Linkedin, href: personal.social.linkedin, label: 'LinkedIn' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="border-2 border-white text-white p-3 hover:bg-white hover:text-dark transition-colors"
                    style={{ boxShadow: '3px 3px 0 #fff' }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              <div className="glass-dark rounded-xl p-5">
                <p className="font-body text-sm text-slate-300 leading-relaxed">
                  I typically respond within <strong className="text-white">24–48 hours</strong>.
                  Whether it's a project idea, internship opportunity, or just a hello — feel free to reach out!
                </p>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div variants={fadeInRight} className="lg:col-span-3">
              <form
                onSubmit={onSubmit}
                className="border-2 border-white bg-white/5 p-8 space-y-5"
                style={{ boxShadow: '6px 6px 0 #fff' }}
              >
                {/* Hidden honeypot — Web3Forms bot protection */}
                <input type="checkbox" name="botcheck" className="hidden" readOnly />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-xs text-slate-400 block mb-2">Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      required
                      placeholder="Your Name"
                      className="brutal-input bg-transparent text-white placeholder:text-slate-600 border-white focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-slate-400 block mb-2">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      placeholder="you@email.com"
                      className="brutal-input bg-transparent text-white placeholder:text-slate-600 border-white focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-slate-400 block mb-2">Subject *</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    required
                    placeholder="What's this about?"
                    className="brutal-input bg-transparent text-white placeholder:text-slate-600 border-white focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-slate-400 block mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="brutal-input bg-transparent text-white placeholder:text-slate-600 border-white focus:border-primary resize-none"
                  />
                </div>

                {/* Status feedback */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm font-body"
                  >
                    <CheckCircle size={16} />
                    Message sent! I'll get back to you soon. 🎉
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm font-body"
                  >
                    <AlertCircle size={16} />
                    {errMsg}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="brutal-btn bg-primary text-white w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
