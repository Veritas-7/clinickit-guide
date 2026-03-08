import { Check, AlertTriangle } from "lucide-react";

interface CheckItemProps {
  children: string;
  type?: "check" | "warning";
}

export function CheckItem({ children, type = "check" }: CheckItemProps) {
  return (
    <li className="flex items-start gap-2.5 py-1.5">
      {type === "check" ? (
        <Check className="h-4 w-4 mt-0.5 shrink-0 text-success" />
      ) : (
        <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-warning" />
      )}
      <span className="text-sm text-foreground/85 leading-relaxed">{children}</span>
    </li>
  );
}
