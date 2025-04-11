import { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  name: string;
  color: string;
  percentage: number;
}

function SkillBar({ name, color, percentage }: SkillBarProps) {
  const [width, setWidth] = useState(0);
  const skillBarRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, // Déclenche quand 20% de l'élément est visible
      }
    );

    const currentRef = skillBarRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setWidth(percentage);
      }, 100);
    }
  }, [isVisible, percentage]);

  return (
    <div className="mb-6" ref={skillBarRef}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold text-gray-700">{name}</span>
        <span className="text-sm font-medium text-gray-600">
          {isVisible ? `${percentage}%` : "0%"}
        </span>
      </div>
      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${isVisible ? width : 0}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}40`,
          }}
        >
          <div
            className="h-full w-full opacity-30 animate-pulse"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SkillBar;
