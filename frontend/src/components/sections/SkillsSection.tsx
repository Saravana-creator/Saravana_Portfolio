import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { gsap } from '@/lib/gsap-setup';
import skills from '@/data/skills';
import type { SkillCategory } from '@/types';

// ── Category config — Restore the bold custom emojis, no default fallback emoji ──
const categoryMeta: Record<string, {
  emoji: string;
  bg: string;
  accent: string;
  shadow: string;
}> = {
  Frontend:  { emoji: '⚡', bg: 'from-violet-500/10 to-indigo-500/5',   accent: '#4F46E5', shadow: 'rgba(79,70,229,0.25)'   },
  Backend:   { emoji: '🛠', bg: 'from-cyan-500/10 to-blue-500/5',       accent: '#06B6D4', shadow: 'rgba(6,182,212,0.25)'   },
  Database:  { emoji: '🗄', bg: 'from-teal-500/10 to-emerald-500/5',    accent: '#14B8A6', shadow: 'rgba(20,184,166,0.25)'  },
  Languages: { emoji: '💬', bg: 'from-purple-500/10 to-fuchsia-500/5',  accent: '#8B5CF6', shadow: 'rgba(139,92,246,0.25)'  },
  Tools:     { emoji: '🔧', bg: 'from-amber-500/10 to-orange-500/5',    accent: '#F59E0B', shadow: 'rgba(245,158,11,0.25)'  },
};

function levelLabel(level: number) {
  if (level >= 85) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 60) return 'Proficient';
  return 'Learning';
}

// ── 3D tilt card ────────────────────────────────────────────────────────────
function TiltCard({ category, sectionInView }: { category: SkillCategory; sectionInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const meta = categoryMeta[category.category] ?? {
    emoji: '', // Remove default emoji
    bg: 'from-slate-500/10 to-gray-500/5',
    accent: '#64748B',
    shadow: 'rgba(100,116,139,0.25)',
  };

  // Mouse-tracking motion values for 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale   = useMotionValue(1);

  // Spring-smooth the tilt
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const cx = (e.clientX - left) / width  - 0.5;   // -0.5 → 0.5
    const cy = (e.clientY - top)  / height - 0.5;
    rotateY.set( cx * 18);   // max ±9°
    rotateX.set(-cy * 18);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <div
      data-skills="card"
      style={{ perspective: '900px' }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: springX,
          rotateY: springY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl border-2 border-black overflow-hidden bg-white cursor-default"
      >
        {/* Dynamic box-shadow driven by tilt */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `4px 4px 0 #000`,
          }}
        />

        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${meta.bg} pointer-events-none`} />

        {/* 3D floating top layer — gives depth illusion */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.05)`,
          }}
        />

        {/* Top accent stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ backgroundColor: meta.accent }}
        />

        {/* Glowing orb — pushed into 3D space */}
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none opacity-20 blur-2xl"
          style={{
            backgroundColor: meta.accent,
            transform: 'translateZ(20px)',
          }}
        />

        <div className="relative p-6 pt-7">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              {/* 3D emoji box (if exists) */}
              {meta.emoji && (
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl border-2 border-black bg-white"
                  style={{
                    boxShadow: `3px 3px 0 #000, inset 0 1px 0 rgba(255,255,255,0.8)`,
                    transform: 'translateZ(8px)',
                  }}
                >
                  {meta.emoji}
                </div>
              )}
              <h3 className="font-display font-bold text-base text-dark" style={{ transform: 'translateZ(4px)' }}>
                {category.category}
              </h3>
            </div>

            {/* Count badge */}
            <span
              className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full text-white"
              style={{
                backgroundColor: meta.accent,
                boxShadow: `1px 1px 0 #000`,
                transform: 'translateZ(6px)',
              }}
            >
              {category.skills.length}
            </span>
          </div>

          {/* Skills — progress bars animate only when the entire section is shown */}
          <div className="space-y-3">
            {category.skills.map((skill, i) => (
              <div key={skill.name} style={{ transform: 'translateZ(2px)' }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: meta.accent }}
                    />
                    <span className="font-body text-sm font-medium text-dark">
                      {skill.name}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border border-black/10"
                    style={{ color: meta.accent, backgroundColor: `${meta.accent}18` }}
                  >
                    {levelLabel(skill.level)}
                  </span>
                </div>

                {/* Progress — fires ONLY when all skills are shown (section is in view) */}
                <div className="h-1.5 bg-slate-100 rounded-full border border-black/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${meta.accent}99, ${meta.accent})`,
                    }}
                    initial={{ width: 0 }}
                    animate={sectionInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.0, ease: 'easeOut', delay: i * 0.08 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Monitor viewport visibility for the entire skills section (animating skills progress only when shown)
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3, // Trigger when 30% of the section is visible (ensures all top sections/cards are fully visible)
    triggerOnce: true,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // ── Section label clip-path reveal ───────────────────────────────────
      gsap.from('[data-skills="label"]', {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-skills="label"]', start: 'top 88%' },
      });

      // ── Title: words stagger up ──────────────────────────────────────────
      gsap.from('[data-skills="title-word"]', {
        y: 60, opacity: 0, duration: 0.65, ease: 'power4.out', stagger: 0.07,
        scrollTrigger: { trigger: '[data-skills="title"]', start: 'top 88%' },
      });

      // ── Cards stagger entrance with 3D feel ──────────────────────────────
      gsap.from('[data-skills="card"]', {
        y: 60, opacity: 0, rotationX: 10, transformPerspective: 900,
        duration: 0.75, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '[data-skills="card"]', start: 'top 85%' },
      });
    }, el);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section id="skills" className="py-24 bg-[#F8FAFC]" ref={(node) => {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      inViewRef(node);
    }}>
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="mb-14">
            <span data-skills="label" className="section-label">Skills</span>
            <h2 data-skills="title" className="section-title overflow-hidden">
              {['What', 'I', 'Work', 'With'].map(w => (
                <span key={w} data-skills="title-word" className="inline-block mr-3">{w}</span>
              ))}
            </h2>
            <p className="section-subtitle">Technologies and tools I use to build things</p>
          </motion.div>

          {/* 3D tilt cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {skills.map((category) => (
              <TiltCard key={category.category} category={category} sectionInView={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
