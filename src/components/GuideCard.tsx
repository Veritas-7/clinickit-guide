import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface GuideCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  to?: string;
  variant?: "default" | "accent";
  children?: ReactNode;
}

export function GuideCard({ title, description, icon, to, variant = "default", children }: GuideCardProps) {
  const base = variant === "accent" ? "guide-card-accent" : "guide-card";

  const content = (
    <>
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5 shrink-0 text-accent">{icon}</div>}
        <div className="min-w-0">
          <h3 className="font-semibold text-card-foreground text-sm md:text-base">{title}</h3>
          <p className="mt-1 text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
      {to && (
        <div className="mt-3 flex items-center gap-1 text-accent text-sm font-medium">
          자세히 보기 <ArrowRight className="h-3.5 w-3.5" />
        </div>
      )}
    </>
  );

  if (to) {
    return <Link to={to} className={`${base} block`}>{content}</Link>;
  }

  return <div className={base}>{content}</div>;
}
