import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { TerminalBox } from "@/components/TerminalBox";
import { MatrixBackground } from "@/components/MatrixBackground";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-20">
      <MatrixBackground />
      <div className="container mx-auto px-4">
        <TerminalBox className="max-w-2xl mx-auto text-center">
          <div className="space-y-6">
            <AlertTriangle className="w-16 h-16 text-terminal-red mx-auto" />
            
            <div>
              <h1 className="text-6xl font-display font-bold text-terminal-red mb-4">
                404
              </h1>
              <p className="text-xl text-primary font-mono mb-2">
                $ ls {location.pathname}
              </p>
              <p className="text-muted-foreground font-mono">
                ls: cannot access '{location.pathname}': No such file or directory
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-terminal-yellow font-mono">
                ERROR: The requested page could not be found in our system.
              </p>
              <p className="text-muted-foreground font-mono text-sm">
                This route doesn't exist in the ARTEMIZ navigation tree.
              </p>
            </div>

            <Link to="/">
              <Button variant="terminal" size="lg" className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
            </Link>
          </div>
        </TerminalBox>
      </div>
    </div>
  );
};

export default NotFound;
