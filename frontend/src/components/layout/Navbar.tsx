import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import personal from '@/data/personal';

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setActive(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white border-b-2 border-black shadow-[0_4px_0_#000]'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-black text-xl tracking-tight border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors duration-150"
            style={{ boxShadow: '2px 2px 0 #000' }}
          >
            {personal.firstName}<span className="text-primary">.</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`font-body font-medium text-sm px-3 py-2 transition-colors duration-150 relative group ${
                  active === link.href ? 'text-primary' : 'text-dark hover:text-primary'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-200 ${
                  active === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </div>

          {/* Resume CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="brutal-btn bg-primary text-white flex items-center gap-2 text-sm"
            >
              <Download size={14} /> Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden border-2 border-black p-2"
            style={{ boxShadow: '2px 2px 0 #000' }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 glass-dark flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleNav(link.href)}
                className="font-display font-bold text-2xl text-white hover:text-secondary transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="brutal-btn bg-primary text-white flex items-center gap-2 mt-4"
            >
              <Download size={16} /> Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
