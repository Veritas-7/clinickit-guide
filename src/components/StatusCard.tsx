import { ReactNode } from "react";
import { AlertTriangle, Info, CheckCircle2, XCircle, Search, FileX } from "lucide-react";

type StatusType = "empty" | "error" | "warning" | "success" | "info" | "not-found";

interface StatusCardProps {
  type: StatusType;
  title: string;
  description?: string;
  children?: ReactNode;
}

const iconMap: Record<StatusType, ReactNode> = {
  empty: <Search className="h-8 w-8 text-muted-foreground" />,
  error: <XCircle className="h-8 w-8 text-emergency" />,
  warning: <AlertTriangle className="h-8 w-8 text-warning" />,
  success: <CheckCircle2 className="h-8 w-8 text-success" />,
  info: <Info className="h-8 w-8 text-info" />,
  "not-found": <FileX className="h-8 w-8 text-muted-foreground" />,
};

/** Reusable status/empty/error state component */
export function StatusCard({ type, title, description, children }: StatusCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-8 text-center">
      <div className="flex justify-center mb-3">{iconMap[type]}</div>
      <p className="font-medium text-sm text-card-foreground">{title}</p>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
