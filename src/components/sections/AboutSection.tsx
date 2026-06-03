import { motion } from 'framer-motion';
import { MapPin, Mail, BookOpen } from 'lucide-react';
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import personal from '@/data/personal';
import { education } from '@/data/resume';

export default function AboutSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="about" className="py-24 bg-white" ref={ref}>
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={staggerItem} className="mb-12">
            <span className="section-label">About Me</span>
            <h2 className="section-title">Who I Am</h2>
            <p className="section-subtitle">A little bit about my background and journey</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Profile card */}
            <motion.div variants={fadeInLeft}>
              {/* Glass profile card */}
              <div className="brutal-card-lg p-8 bg-gradient-to-br from-primary/5 to-secondary/5 mb-6">
                <div className="flex items-start gap-6 mb-6">
                  <div
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
                <p className="font-body text-slate-600 leading-relaxed">{personal.bio}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {['Open to Work', 'Full Stack', 'Problem Solver'].map(tag => (
                    <span key={tag} className="brutal-tag bg-white">{tag}</span>
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
                {education.map((edu) => (
                  <motion.div
                    key={edu.id}
                    variants={staggerItem}
                    className="relative pl-6 border-l-2 border-black"
                  >
                    {/* Node dot */}
                    <div
                      className="absolute -left-[9px] top-0 w-4 h-4 bg-primary border-2 border-black"
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
