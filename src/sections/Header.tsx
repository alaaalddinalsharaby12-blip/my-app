import { useState, useEffect } from "react";
import { Menu, X, Phone, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "home", label: "الرئيسية" },
  { href: "services", label: "خدماتنا" },
  { href: "projects", label: "أعمالنا" },
  { href: "about", label: "من نحن" },
  { href: "contact", label: "اتصل بنا" },
];

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    window.location.hash = `#/${page}`;
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled ? "bg-white shadow-lg py-3" : "bg-gray-900 py-3"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 group"
          >
            <div className="flex items-center gap-1">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>

              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center -mr-2">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>

            <div>
              <h1
                className={`font-bold text-lg transition-colors ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                سباكة وكهربائي
              </h1>

              <p
                className={`text-xs transition-colors ${
                  isScrolled ? "text-gray-600" : "text-gray-300"
                }`}
              >
                خدمات منزلية
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigate(link.href)}
                className={`px-3 py-3 rounded-lg text-sm font-medium transition-all
                ${
                  currentPage === link.href
                    ? "bg-blue-600 text-white shadow-md"
                    : isScrolled
                    ? "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
                    : "text-white/90 hover:text-white hover:bg-white/20"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:0506880495">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white gap-2 shadow-md">
                <Phone className="w-4 h-4" />
                <span>اتصل الآن</span>
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="bg-white rounded-xl shadow-lg p-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigate(link.href)}
                className={`block w-full text-right px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${
                  currentPage === link.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile CTA */}
            <a href="tel:0500123456" className="block mt-4">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white gap-2 shadow-md">
                <Phone className="w-4 h-4" />
                <span>اتصل الآن</span>
              </Button>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}