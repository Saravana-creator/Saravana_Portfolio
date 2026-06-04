import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import projects from '@/data/projects';
import type { Project } from '@/types';

const FILTERS = ['all', 'frontend', 'backend', 'fullstack'] as const;
type Filter = typeof FILTERS[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="brutal-card overflow-hidden group"
    >
      {/* Project image / placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-primary/10 to-secondary/10 border-b-2 border-black overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display font-black text-4xl text-primary/30">
              {project.title[0]}
            </span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="brutal-btn bg-dark text-white py-2 px-4 text-xs"
              onClick={e => e.stopPropagation()}
            >
              <Github size={14} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="brutal-btn bg-primary text-white py-2 px-4 text-xs"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {project.featured && (
          <span className="absolute top-3 left-3 brutal-tag bg-primary text-white text-[10px]">
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-bold text-lg">{project.title}</h3>
          <span className="font-mono text-xs text-slate-400">{project.year}</span>
        </div>
        <p className="font-body text-sm text-slate-500 mb-4 leading-relaxed">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <span key={tech} className="brutal-tag bg-slate-50 text-[10px]">{tech}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const { ref, inView } = useScrollReveal();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-white" ref={ref}>
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={staggerItem} className="mb-12">
            <span className="section-label">Projects</span>
            <h2 className="section-title">What I've Built</h2>
            <p className="section-subtitle">A selection of projects I'm proud of</p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={staggerItem} className="flex flex-wrap gap-3 mb-10">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`brutal-btn text-sm capitalize py-2 ${
                  filter === f
                    ? 'bg-primary text-white'
                    : 'bg-white text-dark hover:bg-slate-50'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filtered.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400 font-body">
              No projects in this category yet.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
