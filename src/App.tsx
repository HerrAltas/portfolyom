import React, { useEffect, useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { Hero, About, Skills, Blog, CoverLetter, CVSection, Contact, AllPostsPage, ArticleDetailPage } from './components/Sections';
import { BLOG_DATA } from './constants';

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
    const [view, setView] = useState<'home' | 'all-posts' | 'article'>('home');
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    // Handle smooth scrolling or view switching
    const handleNavigate = (target: string) => {
        if (view !== 'home') {
            setView('home');
            // Allow state update then scroll
            setTimeout(() => {
                const element = document.querySelector(target);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.querySelector(target);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }
    };

    const handleViewChange = (newView: 'home' | 'blog' | 'article', id?: string) => {
        if (newView === 'blog') {
            setView('all-posts');
        } else if (newView === 'article' && id) {
            setSelectedPostId(id);
            setView('article');
        } else {
            setView('home');
        }
    };

    const selectedPost = selectedPostId ? BLOG_DATA.find(p => p.id === selectedPostId) : null;

    return (
        <>
            <SEO />
            
            <div className="bg-gray-50 text-gray-900 dark:bg-dark dark:text-gray-100 min-h-screen transition-colors duration-300 font-sans selection:bg-blue-500 selection:text-white">
                <Navigation onNavigate={handleNavigate} />
                <main>
                    {view === 'home' && (
                        <>
                            <Hero onViewChange={handleViewChange} />
                            <About />
                            <Skills />
                            <Blog onViewChange={handleViewChange} />
                            <CoverLetter />
                            <CVSection />
                            <Contact />
                        </>
                    )}
                    {view === 'all-posts' && (
                        <AllPostsPage 
                            onBack={() => setView('home')} 
                            onArticleClick={(id) => handleViewChange('article', id)}
                        />
                    )}
                    {view === 'article' && selectedPost && (
                        <ArticleDetailPage 
                            post={selectedPost} 
                            onBack={() => setView('all-posts')} 
                        />
                    )}
                </main>
                
                <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                    <p>&copy; {new Date().getFullYear()} Mustafa Altas All rights reserved.</p>
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