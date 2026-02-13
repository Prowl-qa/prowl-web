'use client';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  shimmer?: boolean;
}

export default function GradientText({ children, className = '', shimmer = false }: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent ${
        shimmer ? 'animate-gradient-shimmer' : ''
      } ${className}`}
    >
      {children}
    </span>
  );
}
