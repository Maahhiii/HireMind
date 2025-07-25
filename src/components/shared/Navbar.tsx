import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button-custom";
import { Brain, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"candidate" | "recruiter" | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("userRole") as "candidate" | "recruiter" | null;
    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };

  // ✅ Clean and correct nav links
  const navLinks = [
    { name: "Home", path: "/" },
    ...(isLoggedIn && userRole === "candidate" ? [{ name: "Candidate Dashboard", path: "/candidate" }] : []),
    ...(isLoggedIn && userRole === "recruiter" ? [{ name: "Recruiter Dashboard", path: "/recruiter" }] : []),
    ...(!isLoggedIn ? [{ name: "Login", path: "/login" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-gradient">HireMind</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-text-body"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button asChild variant="cta">
                <Link to="/register">Get Started</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-text-body hover:text-primary hover:bg-muted"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {isLoggedIn ? (
                <Button variant="outline" className="mx-3 mt-2" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button asChild variant="cta" className="mx-3 mt-2">
                  <Link to="/register">Get Started</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
