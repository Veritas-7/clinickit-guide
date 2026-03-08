import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ClipboardList, Map, CheckSquare } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    // The usePageMeta hook in App handles 404 meta via fallbackMeta automatically
    // since this route won't match any routeMeta key
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="mb-8">
        <span className="text-6xl font-bold text-muted-foreground/30">404</span>
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">페이지를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        요청하신 페이지(<code className="guide-code text-xs">{location.pathname}</code>)가 존재하지 않습니다.
        아래 링크에서 원하시는 페이지로 이동하세요.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
        <Link to="/" className="guide-card flex items-center gap-3 hover:border-accent transition-colors">
          <Home className="h-5 w-5 text-accent" />
          <div className="text-left">
            <p className="text-sm font-medium text-card-foreground">가이드 홈</p>
            <p className="text-xs text-muted-foreground">메인 대시보드</p>
          </div>
        </Link>
        <Link to="/client-brief" className="guide-card flex items-center gap-3 hover:border-accent transition-colors">
          <ClipboardList className="h-5 w-5 text-accent" />
          <div className="text-left">
            <p className="text-sm font-medium text-card-foreground">고객사 브리프</p>
            <p className="text-xs text-muted-foreground">프로젝트 시작</p>
          </div>
        </Link>
        <Link to="/site-blueprint" className="guide-card flex items-center gap-3 hover:border-accent transition-colors">
          <Map className="h-5 w-5 text-accent" />
          <div className="text-left">
            <p className="text-sm font-medium text-card-foreground">사이트 블루프린트</p>
            <p className="text-xs text-muted-foreground">구조 자동 설계</p>
          </div>
        </Link>
        <Link to="/checklist" className="guide-card flex items-center gap-3 hover:border-accent transition-colors">
          <CheckSquare className="h-5 w-5 text-accent" />
          <div className="text-left">
            <p className="text-sm font-medium text-card-foreground">체크리스트</p>
            <p className="text-xs text-muted-foreground">실무 점검</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
