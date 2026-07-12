import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import skills from '@/data/skills';

// Category emoji/icon mapping
const categoryMeta: Record<string, { icon: string; bg: string; accent: string }> = {
  Frontend:  { icon: '⚡', bg: 'from-violet-500/10 to-indigo-500/10',   accent: '#4F46E5' },
  Backend:   { icon: '🛠', bg: 'from-cyan-500/10 to-blue-500/10',       accent: '#06B6D4' },
  Database:  { icon: '🗄', bg: 'from-teal-500/10 to-emerald-500/10',    accent: '#14B8A6' },
  Languages: { icon: '💬', bg: 'from-purple-500/10 to-fuchsia-500/10',  accent: '#8B5CF6' },
  Tools:     { icon: '🔧', bg: 'from-amber-500/10 to-orange-500/10',    accent: '#F59E0B' },
};

// Skill level label
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

          {/* Skill cards — new badge layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {skills.map((category) => {
              const meta = categoryMeta[category.category] ?? {
                icon: '📦',
                bg: 'from-slate-500/10 to-gray-500/10',
                accent: '#64748B',
              };

              return (
                <motion.div
                  key={category.category}
                  variants={staggerItem}
                  className={`relative rounded-2xl border-2 border-black overflow-hidden`}
                  style={{ boxShadow: '4px 4px 0 #000' }}
                  whileHover={{ y: -4, boxShadow: '6px 6px 0 #000' }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Gradient bg layer */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${meta.bg} pointer-events-none`}
                  />

                  <div className="relative p-6">
                    {/* Category header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        {/* Icon block */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border-2 border-black bg-white"
                          style={{ boxShadow: '2px 2px 0 #000' }}
                        >
                          {meta.icon}
                        </div>
                        <h3 className="font-display font-bold text-lg text-dark">
                          {category.category}
                        </h3>
                      </div>
                      {/* Count pill */}
                      <span
                        className="text-xs font-mono font-bold px-2.5 py-1 rounded-full text-white border border-black"
                        style={{ backgroundColor: meta.accent, boxShadow: '1px 1px 0 #000' }}
                      >
                        {category.skills.length}
                      </span>
                    </div>

                    {/* Skill chips */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, i) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.06 }}
                          className="group relative"
                        >
                          {/* Chip */}
                          <div
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black bg-white text-dark cursor-default transition-all duration-200 group-hover:text-white"
                            style={{
                              boxShadow: '2px 2px 0 #000',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLDivElement).style.backgroundColor = meta.accent;
                              (e.currentTarget as HTMLDivElement).style.boxShadow = '3px 3px 0 #000';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLDivElement).style.backgroundColor = '#fff';
                              (e.currentTarget as HTMLDivElement).style.boxShadow = '2px 2px 0 #000';
                            }}
                          >
                            {/* Dot indicator */}
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: meta.accent }}
                            />
                            <span className="font-body text-xs font-semibold whitespace-nowrap">
                              {skill.name}
                            </span>
                          </div>

                          {/* Tooltip on hover */}
                          <div
                            className="absolute -top-9 left-1/2 -translate-x-1/2 border-2 border-black bg-dark text-white text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10"
                            style={{ boxShadow: '2px 2px 0 #000' }}
                          >
                            {levelLabel(skill.level)} · {skill.level}%
                          </div>
                        </motion.div>
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
