import { ReactNode } from "react";

interface SectionHeadingProps {
  tag?: "h1" | "h2" | "h3";
  children: ReactNode;
  sub?: string;
  badge?: ReactNode;
  className?: string;
}

export function SectionHeading({ tag: Tag = "h2", children, sub, badge, className = "" }: SectionHeadingProps) {
  const sizes = {
    h1: "text-2xl md:text-3xl font-bold",
    h2: "text-xl md:text-2xl font-semibold",
    h3: "text-lg md:text-xl font-semibold",
  };

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center gap-3 flex-wrap">
        <Tag className={`${sizes[Tag]} text-foreground`}>{children}</Tag>
        {badge}
      </div>
      {sub && <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-2xl">{sub}</p>}
    </div>
  );
}
