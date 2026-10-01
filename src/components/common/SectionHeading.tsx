import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  centered = false,
  className = '',
}) => {
  return (
    <div className={`space-y-2.5 ${centered ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {kicker && (
        <p className="text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
          {kicker}
        </p>
      )}
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1C3829] [text-wrap:balance]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#555C56] leading-relaxed [text-wrap:pretty]">
          {subtitle}
        </p>
      )}
    </div>
  );
};
