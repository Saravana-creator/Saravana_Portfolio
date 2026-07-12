import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { fadeInRight, staggerContainer, staggerItem } from '@/lib/animations';
import { gsap } from '@/lib/gsap-setup';
import personal from '@/data/personal';

// Skeuomorphic laptop SVG component
function SkeuoLaptop() {
  return (
    <div className="relative w-full max-w-md mx-auto animate-float">
      {/* Screen */}
      <div className="skeuo-screen rounded-t-2xl p-4 aspect-[16/10] relative overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-3 h-3 rounded-full bg-red-400 border border-red-600" />
          <span className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-600" />
          <span className="w-3 h-3 rounded-full bg-green-400 border border-green-600" />
          <div className="flex-1 h-5 bg-slate-700 rounded ml-2 flex items-center px-2">
            <span className="font-mono text-xs text-slate-400">localhost:5173</span>
          </div>
        </div>
        {/* Code content */}
        <div className="font-mono text-xs space-y-1">
          <p><span className="text-purple-400">const</span> <span className="text-blue-300">developer</span> <span className="text-white">= {'{'}</span></p>
          <p className="pl-4"><span className="text-green-300">name</span><span className="text-white">:</span> <span className="text-yellow-300">"{personal.name}"</span><span className="text-white">,</span></p>
          <p className="pl-4"><span className="text-green-300">role</span><span className="text-white">:</span> <span className="text-yellow-300">"Full Stack Dev"</span><span className="text-white">,</span></p>
          <p className="pl-4"><span className="text-green-300">skills</span><span className="text-white">:</span> <span className="text-orange-300">['React', 'Node.js']</span><span className="text-white">,</span></p>
          <p className="pl-4"><span className="text-green-300">available</span><span className="text-white">:</span> <span className="text-cyan-300">true</span></p>
          <p className="text-white">{'}'}<span className="animate-pulse text-primary">|</span></p>
        </div>
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
      </div>

      {/* Keyboard base */}
      <div className="skeuo-surface rounded-b-2xl px-6 py-4">
        <div className="flex flex-wrap gap-1 justify-center mb-2">
          {['Q','W','E','R','T','Y','U','I','O','P'].map(k => (
            <span key={k} className="skeuo-key w-6 h-6 flex items-center justify-center text-xs font-mono text-slate-600 text-[10px]">{k}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 justify-center mb-2">
          {['A','S','D','F','G','H','J','K','L'].map(k => (
            <span key={k} className="skeuo-key w-6 h-6 flex items-center justify-center text-xs font-mono text-slate-600 text-[10px]">{k}</span>
          ))}
        </div>
        <div className="flex gap-1 justify-center">
          <span className="skeuo-key w-20 h-6 flex items-center justify-center text-[10px] font-mono text-slate-600">SPACE</span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const socialLinks = [
    { icon: Github,   href: personal.social.github,        label: 'GitHub',   value: 'Saravana-creator' },
    { icon: Linkedin, href: personal.social.linkedin,       label: 'LinkedIn', value: 'saravana-perumal-m' },
    { icon: Mail,     href: `mailto:${personal.email}`,     label: 'Gmail',    value: personal.email },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {

      // ── Badge slide-in ───────────────────────────────────────────────────
      gsap.from('[data-gsap="badge"]', {
        y: -20, opacity: 0, duration: 0.6, ease: 'back.out(2)', delay: 0.1,
      });

      // ── Headline: slide up and fade ──────────────────────────────────────
      gsap.from('[data-gsap="headline"]', {
        y: 35, opacity: 0, duration: 0.8,
        ease: 'power3.out', delay: 0.3,
      });

      // ── Bio fade + slight upward drift ──────────────────────────────────
      gsap.from('[data-gsap="bio"]', {
        opacity: 0, y: 25, duration: 0.8, ease: 'power2.out', delay: 0.55,
      });

      // ── CTA button elastic bounce ────────────────────────────────────────
      gsap.from('[data-gsap="cta"]', {
        scale: 0.7, opacity: 0, duration: 0.6,
        ease: 'elastic.out(1, 0.5)', stagger: 0.1, delay: 0.85,
      });

      // ── Social icons pop in with stagger ────────────────────────────────
      gsap.from('[data-gsap="social"]', {
        scale: 0, rotation: -15, opacity: 0, duration: 0.5,
        ease: 'back.out(2.5)', stagger: 0.07, delay: 1.0,
      });

      // ── Stats: counter increment on scroll ──────────────────────────────
      el.querySelectorAll<HTMLElement>('[data-gsap="stat"]').forEach(stat => {
        gsap.from(stat, {
          opacity: 0, y: 24, scale: 0.85, duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: stat,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      // ── Laptop parallax: drifts up as you scroll hero ───────────────────
      gsap.to('[data-gsap="laptop"]', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // ── Background blobs parallax ────────────────────────────────────────
      gsap.to('[data-gsap="blob-1"]', {
        y: -80, x: 30,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 2 },
      });
      gsap.to('[data-gsap="blob-2"]', {
        y: -50, x: -20,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 1.5 },
      });

    }, el);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center relative overflow-hidden bg-[#F8FAFC] pt-16">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Blobs */}
      <div data-gsap="blob-1" className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
      <div data-gsap="blob-2" className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-secondary/10 blur-3xl animate-float" />

      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12">
          {/* Left — text */}
          <div className="space-y-6">
            <div className="mb-4">
              <span data-gsap="badge" className="section-label">👋 Available for opportunities</span>
            </div>

            <h1
              data-gsap="headline"
              className="font-display font-black text-xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-5xl text-dark leading-tight mb-4 whitespace-normal lg:whitespace-nowrap"
            >
              Hi, I'm <span className="gradient-text">{personal.firstName}</span>
            </h1>

            <div className="mb-6">
              <div className="font-display font-bold text-xl sm:text-2xl text-slate-600">
                <TypeAnimation
                  sequence={personal.roles.flatMap(r => [r, 2000])}
                  wrapper="span"
                  repeat={Infinity}
                />
              </div>
            </div>

            <p
              data-gsap="bio"
              className="font-body text-slate-500 text-base sm:text-lg leading-relaxed max-w-lg mb-8"
            >
              {personal.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                data-gsap="cta"
                href="#projects"
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="brutal-btn bg-primary text-white text-sm animate-pulse-slow"
              >
                View Projects
              </a>
            </div>

            {/* Social links — icon buttons */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    data-gsap="social"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="border-2 border-black p-2.5 hover:bg-black hover:text-white transition-colors duration-150"
                    style={{ boxShadow: '3px 3px 0 #000' }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
              <span className="font-mono text-xs text-slate-400">{personal.location}</span>
            </div>
          </div>

          {/* Right — skeuomorphic laptop */}
          <motion.div
            data-gsap="laptop"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <SkeuoLaptop />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8"
        >
          {personal.stats.map(stat => (
            <motion.div
              key={stat.label}
              data-gsap="stat"
              variants={staggerItem}
              className="glass-card text-center"
            >
              <div className="font-display font-black text-3xl gradient-text">{stat.value}</div>
              <div className="font-body text-xs text-slate-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowDown size={20} className="text-slate-400" />
      </motion.div>
    </section>
  );
}
