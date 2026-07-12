import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import skills from '@/data/skills';

// Category metadata
const categoryMeta: Record<string, { icon: string; bg: string; accent: string; glow: string }> = {
  Frontend:  { icon: '⚡', bg: 'from-violet-500/8 to-indigo-500/8',   accent: '#4F46E5', glow: 'rgba(79,70,229,0.15)'  },
  Backend:   { icon: '🛠', bg: 'from-cyan-500/8 to-blue-500/8',       accent: '#06B6D4', glow: 'rgba(6,182,212,0.15)'  },
  Database:  { icon: '🗄', bg: 'from-teal-500/8 to-emerald-500/8',    accent: '#14B8A6', glow: 'rgba(20,184,166,0.15)' },
  Languages: { icon: '💬', bg: 'from-purple-500/8 to-fuchsia-500/8',  accent: '#8B5CF6', glow: 'rgba(139,92,246,0.15)' },
  Tools:     { icon: '🔧', bg: 'from-amber-500/8 to-orange-500/8',    accent: '#F59E0B', glow: 'rgba(245,158,11,0.15)' },
};

function levelLabel(level: number) {
  if (level >= 85) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 60) return 'Proficient';
  return 'Learning';
}

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

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {skills.map((category) => {
              const meta = categoryMeta[category.category] ?? {
                icon: '📦',
                bg: 'from-slate-500/8 to-gray-500/8',
                accent: '#64748B',
                glow: 'rgba(100,116,139,0.15)',
              };

              return (
                <motion.div
                  key={category.category}
                  variants={staggerItem}
                  className="relative rounded-2xl border-2 border-black overflow-hidden bg-white"
                  style={{ boxShadow: '4px 4px 0 #000' }}
                  whileHover={{ y: -3, boxShadow: '7px 7px 0 #000' }}
                  transition={{ duration: 0.18 }}
                >
                  {/* Subtle tinted bg */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${meta.bg} pointer-events-none`} />

                  {/* Top accent stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: meta.accent }}
                  />

                  <div className="relative p-6 pt-7">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border-2 border-black bg-white"
                          style={{ boxShadow: '2px 2px 0 #000' }}
                        >
                          {meta.icon}
                        </div>
                        <h3 className="font-display font-bold text-base text-dark">
                          {category.category}
                        </h3>
                      </div>

                      {/* Count badge */}
                      <span
                        className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full text-white border border-black/20"
                        style={{ backgroundColor: meta.accent }}
                      >
                        {category.skills.length} skills
                      </span>
                    </div>

                    {/* Skills list with progress bars */}
                    <div className="space-y-3">
                      {category.skills.map((skill, i) => (
                        <div key={skill.name}>
                          {/* Name + level row */}
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              {/* Colored dot */}
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: meta.accent }}
                              />
                              <span className="font-body text-sm font-medium text-dark">
                                {skill.name}
                              </span>
                            </div>
                            <span
                              className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-black/10"
                              style={{ color: meta.accent, backgroundColor: `${meta.accent}15` }}
                            >
                              {levelLabel(skill.level)}
                            </span>
                          </div>

                          {/* Progress track */}
                          <div className="h-1.5 bg-slate-100 rounded-full border border-black/5 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${meta.accent}cc, ${meta.accent})`,
                              }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.07 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
