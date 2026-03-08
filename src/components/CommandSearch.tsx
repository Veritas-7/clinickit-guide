import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { navigationItems } from "@/data/navigationConfig";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback(
    (path: string) => {
      setOpen(false);
      navigate(path);
    },
    [navigate],
  );

  const guides = navigationItems.filter(i => i.group === "guide");
  const tools = navigationItems.filter(i => i.group === "tool");

  const buildSearchValue = (item: typeof navigationItems[0]) =>
    [item.label, item.title, item.description, ...item.keywords, ...item.searchIntent].join(" ").toLowerCase();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:bg-secondary transition-colors"
        aria-label="문서 검색 열기 (Ctrl+K)"
      >
        <span className="hidden sm:inline">검색</span>
        <kbd className="pointer-events-none rounded border border-border/60 bg-secondary px-1.5 py-0.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="페이지, 키워드, 또는 의도를 검색하세요..." />
        <CommandList>
          <CommandEmpty>
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground">검색 결과가 없습니다.</p>
              <p className="text-xs text-muted-foreground mt-1">다른 키워드로 검색하거나 가이드 홈에서 탐색하세요.</p>
            </div>
          </CommandEmpty>
          <CommandGroup heading="가이드 메뉴">
            {guides.map(item => (
              <CommandItem
                key={item.path}
                value={buildSearchValue(item)}
                onSelect={() => handleSelect(item.path)}
                className="cursor-pointer"
              >
                <item.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-sm">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="제작 도구">
            {tools.map(item => (
              <CommandItem
                key={item.path}
                value={buildSearchValue(item)}
                onSelect={() => handleSelect(item.path)}
                className="cursor-pointer"
              >
                <item.icon className="mr-2 h-4 w-4 text-accent" />
                <div className="flex flex-col">
                  <span className="text-sm">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
