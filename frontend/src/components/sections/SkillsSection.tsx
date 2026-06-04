import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import skills from '@/data/skills';

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="font-body text-sm font-medium text-dark">{name}</span>
        <span className="font-mono text-xs text-slate-500">{level}%</span>
      </div>
      <div className="h-2 bg-slate-100 border border-black/10 overflow-hidden">
        <motion.div
          className="h-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
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
          <motion.div variants={staggerItem} className="mb-12">
            <span className="section-label">Skills</span>
            <h2 className="section-title">What I Work With</h2>
            <p className="section-subtitle">Technologies and tools I use to build things</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {skills.map((category) => (
              <motion.div
                key={category.category}
                variants={staggerItem}
                className="brutal-card p-6"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-3 h-3 border-2 border-black"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="font-display font-bold text-lg">{category.category}</h3>
                  {/* Glass chip */}
                  <span className="ml-auto glass text-xs font-mono px-2 py-0.5 rounded-full border border-black/10">
                    {category.skills.length} skills
                  </span>
                </div>

                {/* Skill bars */}
                <div>
                  {category.skills.map(skill => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={category.color}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
