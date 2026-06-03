import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: Non-existent route accessed:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-6xl font-black text-gradient mb-4">404</h1>
        <h2 className="text-xl font-bold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
          Looks like this item got lost too! The page you're looking for doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Go Home
          </Link>
          <Link to="/feed" className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 border border-border text-foreground font-medium px-6 py-3 rounded-xl transition-colors">
            Browse Items
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
