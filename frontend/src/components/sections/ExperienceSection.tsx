import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { experience } from '@/data/resume';

const TYPE_COLORS: Record<string, string> = {
  internship: '#4F46E5',
  job:        '#06B6D4',
  freelance:  '#14B8A6',
  volunteer:  '#F59E0B',
};

export default function ExperienceSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="experience" className="py-24 bg-[#F8FAFC]" ref={ref}>
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={staggerItem} className="mb-12">
            <span className="section-label">Experience</span>
            <h2 className="section-title">Where I've Worked</h2>
            <p className="section-subtitle">My professional journey so far</p>
          </motion.div>

          {experience.length === 0 ? (
            <motion.div
              variants={staggerItem}
              className="brutal-card p-12 text-center"
            >
              <Briefcase size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="font-display font-bold text-lg text-slate-400">
                Actively seeking opportunities!
              </p>
              <p className="font-body text-sm text-slate-400 mt-1">
                Open to internships and entry-level roles.
              </p>
            </motion.div>
          ) : (
            <div className="relative">
              {/* Center line — desktop only */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-black -translate-x-1/2" />

              <div className="space-y-10">
                {experience.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    variants={staggerItem}
                    className={`relative lg:flex ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-8`}
                  >
                    {/* Card */}
                    <div className="lg:w-[calc(50%-2rem)]">
                      <div className="brutal-card p-6">
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
                              <span key={t} className="brutal-tag bg-white text-[10px]">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Centre node — desktop */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 w-5 h-5 bg-primary border-2 border-black items-center justify-center"
                      style={{ boxShadow: '2px 2px 0 #000' }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
