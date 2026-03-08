import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { briefFields, briefGroups } from "@/data/clientBriefFields";
import { Link } from "react-router-dom";

type BriefData = Record<string, string | string[]>;

export default function ClientBrief() {
  const [data, setData] = useState<BriefData>({});
  const [saved, setSaved] = useState(false);

  const updateField = (id: string, value: string | string[]) => {
    setData(prev => ({ ...prev, [id]: value }));
    setSaved(false);
  };

  const toggleMulti = (id: string, option: string) => {
    const current = (data[id] as string[]) || [];
    const next = current.includes(option)
      ? current.filter(v => v !== option)
      : [...current, option];
    updateField(id, next);
  };

  const handleSave = () => {
    localStorage.setItem("clientBrief", JSON.stringify(data));
    setSaved(true);
  };

  const handleLoad = () => {
    const stored = localStorage.getItem("clientBrief");
    if (stored) {
      setData(JSON.parse(stored));
      setSaved(true);
    }
  };

  const filledCount = briefFields.filter(f => {
    const v = data[f.id];
    if (Array.isArray(v)) return v.length > 0;
    return v && v.trim() !== "";
  }).length;

  return (
    <div>
      <SectionHeading
        tag="h1"
        sub="병원/의원 고객사의 정보를 체계적으로 수집하고 정리합니다. 입력된 정보는 사이트 블루프린트 생성에 활용됩니다."
      >
        고객사 브리프
      </SectionHeading>

      {/* 진행률 & 액션 */}
      <div className="guide-card mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-card-foreground">진행률</span>
            <span className="text-xs text-muted-foreground">{filledCount}/{briefFields.length}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${(filledCount / briefFields.length) * 100}%`, background: "hsl(var(--accent))" }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleLoad} className="text-xs border border-border rounded-lg px-3 py-1.5 text-muted-foreground hover:bg-secondary transition-colors">
            불러오기
          </button>
          <button onClick={handleSave} className="text-xs bg-primary text-primary-foreground rounded-lg px-3 py-1.5 hover:opacity-90 transition-opacity">
            {saved ? "✓ 저장됨" : "임시 저장"}
          </button>
        </div>
      </div>

      {/* 필드 그룹 */}
      {briefGroups.map(group => (
        <section key={group} className="guide-section">
          <SectionHeading tag="h2">{group}</SectionHeading>
          <div className="space-y-5">
            {briefFields.filter(f => f.group === group).map(field => (
              <div key={field.id} className="guide-card">
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  {field.label}
                  {field.required && <span className="text-emergency ml-1">*</span>}
                </label>

                {field.type === "text" && (
                  <input
                    type="text"
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                    placeholder={field.placeholder}
                    value={(data[field.id] as string) || ""}
                    onChange={e => updateField(field.id, e.target.value)}
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background min-h-[80px] focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                    placeholder={field.placeholder}
                    value={(data[field.id] as string) || ""}
                    onChange={e => updateField(field.id, e.target.value)}
                  />
                )}

                {field.type === "number" && (
                  <input
                    type="number"
                    className="w-32 border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                    placeholder={field.placeholder}
                    value={(data[field.id] as string) || ""}
                    onChange={e => updateField(field.id, e.target.value)}
                  />
                )}

                {field.type === "select" && field.options && (
                  <select
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                    value={(data[field.id] as string) || ""}
                    onChange={e => updateField(field.id, e.target.value)}
                  >
                    <option value="">선택하세요</option>
                    {field.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}

                {field.type === "radio" && field.options && (
                  <div className="flex flex-wrap gap-2">
                    {field.options.map(opt => (
                      <label key={opt} className={`inline-flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-sm cursor-pointer transition-colors ${(data[field.id] as string) === opt ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:bg-secondary"}`}>
                        <input
                          type="radio"
                          name={field.id}
                          value={opt}
                          checked={(data[field.id] as string) === opt}
                          onChange={() => updateField(field.id, opt)}
                          className="sr-only"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                {field.type === "multiselect" && field.options && (
                  <div className="flex flex-wrap gap-2">
                    {field.options.map(opt => {
                      const selected = ((data[field.id] as string[]) || []).includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleMulti(field.id, opt)}
                          className={`border rounded-lg px-3 py-1.5 text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:bg-secondary"}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {field.helpText && (
                  <p className="text-xs text-muted-foreground mt-1">{field.helpText}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* 하단 CTA */}
      <div className="guide-section text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={handleSave} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            브리프 저장
          </button>
          <Link
            to="/site-blueprint"
            className="bg-accent text-accent-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            블루프린트 생성 →
          </Link>
        </div>
      </div>
    </div>
  );
}
