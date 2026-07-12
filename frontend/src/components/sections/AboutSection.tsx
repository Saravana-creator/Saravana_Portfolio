import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, BookOpen } from 'lucide-react';
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { gsap } from '@/lib/gsap-setup';
import personal from '@/data/personal';
import { education } from '@/data/resume';

export default function AboutSection() {
  const { ref, inView } = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {

      // ── Section label clip-path reveal ───────────────────────────────────
      gsap.from('[data-about="label"]', {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-about="label"]', start: 'top 88%' },
      });

      // ── Title: words stagger up ──────────────────────────────────────────
      gsap.from('[data-about="title-word"]', {
        y: 60, opacity: 0, duration: 0.65, ease: 'power4.out', stagger: 0.07,
        scrollTrigger: { trigger: '[data-about="title"]', start: 'top 88%' },
      });

      // ── Profile card: slide from left with slight rotation ───────────────
      gsap.from('[data-about="profile-card"]', {
        x: -80, rotation: -3, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-about="profile-card"]', start: 'top 85%' },
      });

      // ── Avatar: scale bounce ─────────────────────────────────────────────
      gsap.from('[data-about="avatar"]', {
        scale: 0, rotation: 20, opacity: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: '[data-about="avatar"]', start: 'top 85%' },
      });

      // ── Bio text: fade in line by line ───────────────────────────────────
      gsap.from('[data-about="bio"]', {
        opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', delay: 0.2,
        scrollTrigger: { trigger: '[data-about="bio"]', start: 'top 88%' },
      });

      // ── Tags: pop in staggered ───────────────────────────────────────────
      gsap.from('[data-about="tag"]', {
        scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(2)', stagger: 0.08,
        scrollTrigger: { trigger: '[data-about="profile-card"]', start: 'top 85%' },
      });

      // ── Education timeline: line draws down, then cards reveal ───────────
      gsap.from('[data-about="timeline-line"]', {
        scaleY: 0, transformOrigin: 'top center', duration: 1.2, ease: 'power2.inOut',
        scrollTrigger: { trigger: '[data-about="timeline-line"]', start: 'top 85%' },
      });

      gsap.from('[data-about="edu-card"]', {
        x: 40, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: '[data-about="timeline-line"]', start: 'top 85%' },
      });

    }, el);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section id="about" className="py-24 bg-white" ref={(node) => {
      // Merge both refs
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    }}>
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={staggerItem} className="mb-12">
            <span data-about="label" className="section-label">About Me</span>
            <h2 data-about="title" className="section-title overflow-hidden">
              {['Who', 'I', 'Am'].map(w => (
                <span key={w} data-about="title-word" className="inline-block mr-3">{w}</span>
              ))}
            </h2>
            <p className="section-subtitle">A little bit about my background and journey</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Profile card */}
            <motion.div variants={fadeInLeft}>
              <div
                data-about="profile-card"
                className="brutal-card-lg p-8 bg-gradient-to-br from-primary/5 to-secondary/5 mb-6"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div
                    data-about="avatar"
                    className="w-20 h-20 rounded-none border-2 border-black bg-primary flex items-center justify-center text-white font-display font-black text-2xl flex-shrink-0"
                    style={{ boxShadow: '4px 4px 0 #000' }}
                  >
                    {personal.firstName[0]}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">{personal.name}</h3>
                    <p className="font-mono text-sm text-primary">{personal.roles[0]}</p>
                    <div className="flex items-center gap-1 mt-1 text-slate-500 text-sm">
                      <MapPin size={12} />
                      <span className="font-body">{personal.location}</span>
                    </div>
                  </div>
                </div>
                <p data-about="bio" className="font-body text-slate-600 leading-relaxed">{personal.bio}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {['Open to Work', 'Full Stack', 'Problem Solver'].map(tag => (
                    <span key={tag} data-about="tag" className="brutal-tag bg-white">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Quick contact info */}
              <div className="glass-card border border-black/10">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={14} className="text-primary" />
                  <a href={`mailto:${personal.email}`} className="font-mono hover:text-primary transition-colors">
                    {personal.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right — Education timeline */}
            <motion.div variants={fadeInRight}>
              <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-primary" />
                Education
              </h3>

              <div className="space-y-6">
                <div className="relative pl-6">
                  {/* Animated timeline line */}
                  <div
                    data-about="timeline-line"
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-black border-l-2 border-black"
                  />
                  {education.map((edu) => (
                    <motion.div
                      key={edu.id}
                      variants={staggerItem}
                      data-about="edu-card"
                      className="relative mb-6"
                    >
                      {/* Node dot */}
                      <div
                        className="absolute -left-[calc(1.5rem+1px)] top-0 w-4 h-4 bg-primary border-2 border-black"
                        style={{ boxShadow: '2px 2px 0 #000' }}
                      />
                      <div className="glass-card border border-black/10 ml-4">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="font-display font-bold">{edu.institution}</h4>
                            <p className="font-body text-sm text-slate-500">
                              {edu.degree} — {edu.field}
                            </p>
                          </div>
                          <span className="brutal-tag bg-secondary/10 text-secondary">
                            {edu.startYear} – {edu.endYear}
                          </span>
                        </div>
                        {edu.score && (
                          <p className="font-mono text-xs text-slate-500">
                            {edu.scoreType}: <strong className="text-dark">{edu.score}</strong>
                          </p>
                        )}
                        {edu.description && (
                          <p className="font-body text-xs text-slate-500 mt-2">{edu.description}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
