import { useState } from "react";
import { ChevronDown, ChevronUp, List } from "lucide-react";

export interface TocItem {
  id: string;
  label: string;
}

interface PageTocProps {
  items: TocItem[];
  title?: string;
}

export function PageToc({ items, title = "목차" }: PageTocProps) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <nav aria-label="페이지 내 탐색" className="mb-8">
      {/* Desktop: always visible */}
      <div className="hidden md:block guide-card">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <List className="h-3.5 w-3.5" /> {title}
        </h2>
        <ol className="space-y-1">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 py-0.5"
              >
                <span className="text-[10px] text-muted-foreground/60 w-4 text-right">{i + 1}.</span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile: collapsible */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full guide-card flex items-center justify-between"
          aria-expanded={open}
        >
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <List className="h-3.5 w-3.5" /> {title} ({items.length})
          </span>
          {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </button>
        {open && (
          <div className="mt-1 guide-card">
            <ol className="space-y-1">
              {items.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 py-1"
                  >
                    <span className="text-[10px] text-muted-foreground/60 w-4 text-right">{i + 1}.</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </nav>
  );
}
