import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Monitor,
  Server,
  Database,
  Code2,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import skills from '@/data/skills';
import type { SkillCategory } from '@/types';

// ── Category config — Lucide icons replace emojis ──────────────────────────
const categoryMeta: Record<string, {
  Icon: LucideIcon;
  bg: string;
  accent: string;
  shadow: string;
}> = {
  Frontend:  { Icon: Monitor,  bg: 'from-violet-500/10 to-indigo-500/5',   accent: '#4F46E5', shadow: 'rgba(79,70,229,0.25)'   },
  Backend:   { Icon: Server,   bg: 'from-cyan-500/10 to-blue-500/5',       accent: '#06B6D4', shadow: 'rgba(6,182,212,0.25)'   },
  Database:  { Icon: Database, bg: 'from-teal-500/10 to-emerald-500/5',    accent: '#14B8A6', shadow: 'rgba(20,184,166,0.25)'  },
  Languages: { Icon: Code2,    bg: 'from-purple-500/10 to-fuchsia-500/5',  accent: '#8B5CF6', shadow: 'rgba(139,92,246,0.25)'  },
  Tools:     { Icon: Wrench,   bg: 'from-amber-500/10 to-orange-500/5',    accent: '#F59E0B', shadow: 'rgba(245,158,11,0.25)'  },
};

function levelLabel(level: number) {
  if (level >= 85) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 60) return 'Proficient';
  return 'Learning';
}

// ── 3D tilt card ────────────────────────────────────────────────────────────
function TiltCard({ category }: { category: SkillCategory }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const meta = categoryMeta[category.category] ?? {
    Icon: Wrench,
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

  // Per-card: animate bars only when THIS card is fully in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.85,   // 85% of the card must be visible
    triggerOnce: true,
  });

  return (
    <div
      ref={inViewRef}
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
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
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
              {/* 3D icon box */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center border-2 border-black bg-white"
                style={{
                  boxShadow: `3px 3px 0 #000, inset 0 1px 0 rgba(255,255,255,0.8)`,
                  transform: 'translateZ(8px)',
                  color: meta.accent,
                }}
              >
                <meta.Icon size={20} />
              </div>
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

          {/* Skills — bars animate only when card is in view */}
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

                {/* Progress — fires ONLY when this card is ≥85% visible */}
                <div className="h-1.5 bg-slate-100 rounded-full border border-black/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${meta.accent}99, ${meta.accent})`,
                    }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
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
  const { ref, inView } = useScrollReveal();

  return (
    <section id="skills" className="py-24 bg-[#F8FAFC]" ref={ref}>
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="mb-14">
            <span className="section-label">Skills</span>
            <h2 className="section-title">What I Work With</h2>
            <p className="section-subtitle">Technologies and tools I use to build things</p>
          </motion.div>

          {/* 3D tilt cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {skills.map((category) => (
              <TiltCard key={category.category} category={category} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
