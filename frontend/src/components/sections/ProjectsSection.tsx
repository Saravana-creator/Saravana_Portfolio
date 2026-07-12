import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { gsap } from '@/lib/gsap-setup';
import projects from '@/data/projects';
import type { Project } from '@/types';

const FILTERS = ['all', 'frontend', 'backend', 'fullstack'] as const;
type Filter = typeof FILTERS[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      data-proj="card"
      className="brutal-card overflow-hidden group bg-white h-full"
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
    </div>
  );
}

export default function ProjectsSection() {
  const { ref } = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {

      // ── Label + title reveal ─────────────────────────────────────────────
      gsap.from('[data-proj="label"]', {
        clipPath: 'inset(0 100% 0 0)', opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-proj="label"]', start: 'top 88%' },
      });

      gsap.from('[data-proj="title-word"]', {
        y: 60, opacity: 0, duration: 0.65, ease: 'power4.out', stagger: 0.07,
        scrollTrigger: { trigger: '[data-proj="title"]', start: 'top 88%' },
      });

      // ── Filter buttons: fan in ───────────────────────────────────────────
      gsap.from('[data-proj="filter"]', {
        x: -20, opacity: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: '[data-proj="filter"]', start: 'top 90%' },
      });

      // ── Project cards: stagger in from bottom with slight 3D (container-triggered) ──
      gsap.from('[data-proj="card"]', {
        y: 60, opacity: 0, rotationX: 8, transformPerspective: 600,
        duration: 0.65, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '[data-proj="grid"]', start: 'top 85%' },
      });

    }, el);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section id="projects" className="py-24 bg-white" ref={(node) => {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    }}>
      <div className="section-container">
        <div>
          <div className="mb-12">
            <span data-proj="label" className="section-label">Projects</span>
            <h2 data-proj="title" className="section-title overflow-hidden">
              {["What", "I've", "Built"].map(w => (
                <span key={w} data-proj="title-word" className="inline-block mr-3">{w}</span>
              ))}
            </h2>
            <p className="section-subtitle">A selection of projects I'm proud of</p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3 mb-10">
            {FILTERS.map(f => (
              <button
                key={f}
                data-proj="filter"
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
          </div>

          {/* Grid */}
          <div
            data-proj="grid"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400 font-body">
              No projects in this category yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
