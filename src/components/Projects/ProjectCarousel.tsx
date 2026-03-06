import { useRef, useState, useEffect } from 'react';
import { playSound } from '../../hooks/useAudio';
import { projects, type Project } from '../../data/projects';
import ProjectCard from './ProjectCard';

interface CarouselProps {
  onProjectSelect: (project: Project) => void;
}

export default function ProjectCarousel({ onProjectSelect }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showToast, setShowToast] = useState(true);

  // Hide toast after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to active
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 300; // approximate
      carouselRef.current.scrollTo({
        left: activeIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-4 py-6 px-4 hide-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="min-w-[280px] w-[280px] flex-shrink-0"
            style={{ scrollSnapAlign: 'center' }}
          >
            <ProjectCard
              project={project}
              index={index}
              onClick={() => onProjectSelect(project)}
            />
          </div>
        ))}
      </div>

      {/* Nav dots */}
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-cyber-blue w-6 shadow-neon'
                : 'bg-cyber-blue/30 w-2'
            }`}
            onClick={() => {
              setActiveIndex(index);
              playSound('click');
            }}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 cyber-button p-2 text-sm opacity-60 hover:opacity-100 z-10"
        onClick={() => {
          setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
          playSound('click');
        }}
      >
        ◀
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 cyber-button p-2 text-sm opacity-60 hover:opacity-100 z-10"
        onClick={() => {
          setActiveIndex((prev) => (prev + 1) % projects.length);
          playSound('click');
        }}
      >
        ▶
      </button>

      {/* Edge gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-cyber-black to-transparent pointer-events-none z-[5]" />

      {/* Mobile helper text */}
      <div className="flex lg:hidden flex-col items-center mt-4 pb-4 relative z-20">
        {showToast && (
          <div
            className="mb-2 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green font-code text-xs px-4 py-2 rounded-lg whitespace-nowrap"
            style={{ boxShadow: '0 0 15px rgba(0,255,65,0.2)' }}
          >
            Swipe to browse projects
          </div>
        )}
      </div>
    </div>
  );
}
