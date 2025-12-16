import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { Hero, About, Skills, Blog, CoverLetter, CVSection, Contact } from './components/Sections';

const SEO: React.FC = () => {
    const { t, language } = useLanguage();
    
    useEffect(() => {
        document.title = t.seo.title;
        document.documentElement.lang = language;
        
        const updateMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        updateMeta('description', t.seo.description);
        updateMeta('keywords', "React, Developer, Portfolio, TypeScript, Frontend, Blog");
    }, [t, language]);

    return null;
};

const Main: React.FC = () => {
    return (
        <>
            <SEO />
            
            <div className="bg-gray-50 text-gray-900 dark:bg-dark dark:text-gray-100 min-h-screen transition-colors duration-300 font-sans selection:bg-blue-500 selection:text-white">
                <Navigation />
                <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Blog />
                    <CoverLetter />
                    <CVSection />
                    <Contact />
                </main>
                
                <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                    <p>&copy; {new Date().getFullYear()} Mustafa Altas. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}

const App: React.FC = () => {
  return (
      <ThemeProvider>
        <LanguageProvider>
             <Main />
        </LanguageProvider>
      </ThemeProvider>
  );
};

export default App;