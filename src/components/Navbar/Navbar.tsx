import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Compass, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: t("navigation.home") },
    { path: "/about", label: t("navigation.about") },
    { path: "/destinations", label: t("navigation.destinations") },
    { path: "/tours", label: t("navigation.tours") },
    { path: "/activities", label: t("navigation.activities") },
    { path: "/blog", label: t("navigation.blog") },
    { path: "/contact", label: t("navigation.contact") },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-soft-lg border-b border-emerald-100/50"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Compass className="h-8 w-8 text-emerald-600 group-hover:rotate-180 transition-transform duration-500 drop-shadow-glow" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-ceylon-500 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl lg:text-2xl font-bold transition-all duration-300 ${
                  isScrolled ? "text-gray-900" : "text-white drop-shadow-text"
                }`}
              >
                Planet Holiday
              </span>
              <span
                className={`text-xs font-medium tracking-wider ${
                  isScrolled ? "text-emerald-600" : "text-emerald-300"
                }`}
              >
                DISCOVER SRI LANKA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-all duration-300 hover:scale-105 group ${
                  location.pathname === link.path
                    ? isScrolled
                      ? "text-emerald-600"
                      : "text-emerald-300"
                    : isScrolled
                    ? "text-gray-700 hover:text-emerald-600"
                    : "text-white hover:text-emerald-300"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 group-hover:w-full ${
                    location.pathname === link.path ? "w-full" : ""
                  }`}
                />
              </Link>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Enhanced CTA Button */}
            <Link
              to="/contact"
              className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 group"
            >
              <span className="relative z-10">{t("home.cta.button")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-0 group-hover:opacity-30" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
              isScrolled
                ? "text-gray-900 hover:bg-emerald-50"
                : "text-white hover:bg-white/10"
            }`}
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                }`}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass-effect rounded-2xl mt-4 shadow-soft-lg border border-white/20 overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                    location.pathname === link.path
                      ? "text-emerald-600 bg-emerald-50/80 shadow-inner-glow"
                      : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="px-4 py-3">
                <LanguageSwitcher />
              </div>

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block mx-3 mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 rounded-xl text-center font-medium shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
              >
                {t("home.cta.button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
