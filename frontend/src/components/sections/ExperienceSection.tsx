import { useEffect, useRef } from 'react';
import { Briefcase } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { gsap } from '@/lib/gsap-setup';
import { experience } from '@/data/resume';

const TYPE_COLORS: Record<string, string> = {
  internship: '#4F46E5',
  job:        '#06B6D4',
  freelance:  '#14B8A6',
  volunteer:  '#F59E0B',
};

export default function ExperienceSection() {
  const { ref } = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {

      // ── Section header reveal ────────────────────────────────────────────
      gsap.from('[data-exp="label"]', {
        clipPath: 'inset(0 100% 0 0)', opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-exp="label"]', start: 'top 88%' },
      });

      gsap.from('[data-exp="title-word"]', {
        y: 60, opacity: 0, duration: 0.65, ease: 'power4.out', stagger: 0.08,
        scrollTrigger: { trigger: '[data-exp="title"]', start: 'top 88%' },
      });

      // ── Center timeline line scrubs as you scroll ────────────────────────
      gsap.from('[data-exp="center-line"]', {
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-exp="center-line"]',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      // ── Timeline node dots pop in ────────────────────────────────────────
      gsap.from('[data-exp="node"]', {
        scale: 0, opacity: 0, duration: 0.4, ease: 'elastic.out(1.5, 0.5)', stagger: 0.15,
        scrollTrigger: { trigger: '[data-exp="center-line"]', start: 'top 75%' },
      });

      // ── Experience cards alternate slide-in ──────────────────────────────
      el.querySelectorAll<HTMLElement>('[data-exp="card"]').forEach((card, i) => {
        const fromX = i % 2 === 0 ? -60 : 60;
        gsap.from(card, {
          x: fromX, opacity: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });

      // ── Tech tags cascade in ─────────────────────────────────────────────
      gsap.from('[data-exp="tech"]', {
        scale: 0, opacity: 0, duration: 0.3, ease: 'back.out(2)', stagger: 0.04,
        scrollTrigger: { trigger: '[data-exp="tech"]', start: 'top 90%' },
      });

    }, el);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section id="experience" className="py-24 bg-[#F8FAFC]" ref={(node) => {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    }}>
      <div className="section-container">
        <div>
          <div className="mb-12">
            <span data-exp="label" className="section-label">Experience</span>
            <h2 data-exp="title" className="section-title overflow-hidden">
              {["Where", "I've", "Worked"].map(w => (
                <span key={w} data-exp="title-word" className="inline-block mr-3">{w}</span>
              ))}
            </h2>
            <p className="section-subtitle">My professional journey so far</p>
          </div>

          {experience.length === 0 ? (
            <div className="brutal-card p-12 text-center">
              <Briefcase size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="font-display font-bold text-lg text-slate-400">
                Actively seeking opportunities!
              </p>
              <p className="font-body text-sm text-slate-400 mt-1">
                Open to internships and entry-level roles.
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Center line — scrubs on scroll */}
              <div
                data-exp="center-line"
                className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-black -translate-x-1/2"
              />

              <div className="space-y-10">
                {experience.map((exp, i) => (
                  <div
                    key={exp.id}
                    className={`relative lg:flex ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-8`}
                  >
                    {/* Card */}
                    <div className="lg:w-[calc(50%-2rem)]">
                      <div data-exp="card" className="brutal-card p-6">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-display font-bold text-lg">{exp.role}</h3>
                            <p className="font-body text-sm text-slate-500">{exp.company}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span
                              className="brutal-tag text-white text-[10px]"
                              style={{ backgroundColor: TYPE_COLORS[exp.type] || '#4F46E5' }}
                            >
                              {exp.type}
                            </span>
                            <span className="font-mono text-xs text-slate-400">{exp.duration}</span>
                          </div>
                        </div>

                        <ul className="space-y-1 mb-4">
                          {exp.description.map((desc, di) => (
                            <li key={di} className="font-body text-sm text-slate-600 flex gap-2">
                              <span className="text-primary mt-0.5">›</span>
                              {desc}
                            </li>
                          ))}
                        </ul>

                        {exp.techStack && (
                          <div className="flex flex-wrap gap-2">
                            {exp.techStack.map(t => (
                              <span key={t} data-exp="tech" className="brutal-tag bg-white text-[10px]">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Centre node */}
                    <div
                      data-exp="node"
                      className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 w-5 h-5 bg-primary border-2 border-black items-center justify-center"
                      style={{ boxShadow: '2px 2px 0 #000' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
