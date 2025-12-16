import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { Language } from '../types';

export const Navigation: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.blog, href: '#blog' },
    { name: t.nav.cover_letter, href: '#cover-letter' },
    { name: t.nav.cv, href: '#cv' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-slate-900/90 backdrop-blur-md shadow-lg py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center gap-12">
        {/* Logo */}
        <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-300 whitespace-nowrap cursor-pointer transition-all"
        >
          Mustafa Altas<span className="text-blue-500 dark:text-blue-300">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <div className="flex gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group whitespace-nowrap cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>

          <div className="flex items-center gap-4">
             {/* Lang Switcher */}
             <div className="relative group">
                <button className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                    <Globe className="w-4 h-4" />
                    <span className="uppercase text-xs font-bold">{language}</span>
                </button>
                <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                    {(['en', 'tr', 'de'] as Language[]).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 ${language === lang ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-400'}`}
                        >
                            {lang.toUpperCase()}
                        </button>
                    ))}
                </div>
             </div>

             {/* Theme Toggle */}
             <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-transform hover:rotate-12">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800 dark:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-xl p-4 flex flex-col gap-4 animate-slide-up">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-medium text-gray-800 dark:text-gray-200 py-2 border-b border-gray-100 dark:border-slate-800 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
             <div className="flex justify-between items-center pt-4">
                 <div className="flex gap-2">
                    {(['en', 'tr', 'de'] as Language[]).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`px-3 py-1 rounded text-xs font-bold border ${language === lang ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-600 dark:text-gray-400 border-gray-300 dark:border-slate-600'}`}
                        >
                            {lang.toUpperCase()}
                        </button>
                    ))}
                 </div>
                 <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200">
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                 </button>
             </div>
        </div>
      )}
    </nav>
  );
};