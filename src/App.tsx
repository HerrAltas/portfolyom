
import React, { useEffect, useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { Hero, About, Skills, Blog, CoverLetter, CVSection, Contact, AllPostsPage, ArticleDetailPage } from './components/Sections';
import { AdminPage } from './components/AdminPage';
import { getBlogPosts } from './service/firebaseService';
import { BlogPost } from './types';
import { BLOG_DATA as STATIC_BLOG_DATA } from './constants';

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
    const [view, setView] = useState<'home' | 'all-posts' | 'article' | 'admin'>('home');
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    const refreshBlogs = async () => {
        setLoadingBlogs(true);
        const fbPosts = await getBlogPosts();
        setBlogPosts(fbPosts.length > 0 ? fbPosts : STATIC_BLOG_DATA);
        setLoadingBlogs(false);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        refreshBlogs();

        // Secret Admin Access Shortcut: Shift + A
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.shiftKey && e.key === 'A') {
            setView('admin');
            window.scrollTo(0, 0);
          }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleNavigate = (target: string) => {
        if (view !== 'home') {
            setView('home');
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

    const handleViewChange = (newView: 'home' | 'blog' | 'article' | 'admin', id?: string) => {
        if (newView === 'blog') {
            setView('all-posts');
        } else if (newView === 'article' && id) {
            setSelectedPostId(id);
            setView('article');
        } else if (newView === 'admin') {
            setView('admin');
        } else {
            setView('home');
        }
    };

    const selectedPost = selectedPostId ? blogPosts.find(p => p.id === selectedPostId) : null;

    if (view === 'admin') {
      return (
        <AdminPage 
          onBack={() => setView('home')} 
          onSuccess={refreshBlogs} 
        />
      );
    }

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
                            <Blog 
                                onViewChange={handleViewChange} 
                                posts={blogPosts} 
                                isLoading={loadingBlogs}
                            />
                            <CoverLetter />
                            <CVSection />
                            <Contact />
                        </>
                    )}
                    {view === 'all-posts' && (
                        <AllPostsPage 
                            posts={blogPosts}
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
                
                <footer className="py-12 px-6 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                      <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Mustafa Altas. Tüm hakları saklıdır.</p>
                      
                      {/* Suble Admin Link for the Owner */}
                      <button 
                        onClick={() => setView('admin')}
                        className="text-gray-300 dark:text-gray-700 hover:text-blue-500 transition-colors text-[10px] uppercase tracking-widest font-bold"
                      >
                        Yönetici Paneli
                      </button>
                    </div>
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
