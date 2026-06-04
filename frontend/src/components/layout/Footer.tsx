import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import personal from '@/data/personal';

const quickLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-dark text-white border-t-2 border-black">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div
              className="font-display font-black text-2xl border-2 border-white inline-block px-3 py-1 mb-4"
              style={{ boxShadow: '3px 3px 0 #fff' }}
            >
              {personal.firstName}<span className="text-primary">.</span>
            </div>
            <p className="font-body text-slate-400 text-sm leading-relaxed max-w-xs">
              {personal.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 border-b-2 border-white pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link}>
                  <button
                    onClick={() =>
                      document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="font-body text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    → {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 border-b-2 border-white pb-2 inline-block">
              Get In Touch
            </h4>
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-4"
            >
              <Mail size={14} /> {personal.email}
            </a>
            <div className="flex items-center gap-3">
              {[
                { icon: Github,   href: personal.social.github,   label: 'GitHub' },
                { icon: Linkedin, href: personal.social.linkedin,  label: 'LinkedIn' },
                ...(personal.social.twitter
                  ? [{ icon: Twitter, href: personal.social.twitter, label: 'Twitter' }]
                  : []),
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="border-2 border-white p-2 hover:bg-white hover:text-dark transition-colors"
                  style={{ boxShadow: '2px 2px 0 #fff' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-700 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-slate-500">
            © {new Date().getFullYear()} {personal.name} — Built with React + Node.js
          </p>
          <button
            onClick={scrollTop}
            className="border-2 border-white p-2 hover:bg-white hover:text-dark transition-colors"
            style={{ boxShadow: '2px 2px 0 #fff' }}
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
