
import React, { useState, useEffect, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Github, Linkedin, Mail, FileText, Download, Quote, Loader2, CheckCircle, Send, ChevronDown, Code, Zap, Database, Terminal, Calendar, Clock, BookOpen, ArrowUpRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SKILLS_DATA } from '../constants';
import { BlogPost } from '../types';

// Helper for smooth scrolling
const scrollToSection = (sectionId: string) => {
  document.querySelector(sectionId)?.scrollIntoView({
    behavior: 'smooth',
  });
};
// --- HERO SECTION ---
export const Hero: React.FC<{ onViewChange?: (view: 'home' | 'blog' | 'article', id?: string) => void }> = ({ onViewChange }) => {
  const { t } = useLanguage();
  const [textIndex, setTextIndex] = useState(0);
 const words = useMemo(() => ["Developer", "Innovator", "Quick Learner", "Problem Solver"], []);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = words[textIndex % words.length];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setTextIndex(prev => prev + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex, typingSpeed, words]);

  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Dynamic Background with Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      
      {/* Floating Blobs */}
      <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob dark:bg-purple-900/30"></div>
      <div className="absolute top-40 -right-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000 dark:bg-blue-900/30"></div>
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000 dark:bg-pink-900/30"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md animate-fade-in shadow-lg shadow-blue-500/10">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 tracking-wide uppercase">Available for new opportunities</span>
        </div>

        <h2 className="text-xl md:text-3xl font-light text-gray-600 dark:text-gray-300 mb-4 animate-slide-up">
            {t.hero.greeting}
        </h2>
        
        <h1 className="text-5xl md:text-8xl font-display font-bold text-gray-900 dark:text-white mb-8 leading-tight animate-slide-up drop-shadow-sm" style={{ animationDelay: '0.1s' }}>
          I am a <br className="md:hidden" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 animate-gradient-x">
            {currentText}
          </span>
          <span className="animate-pulse text-blue-600 dark:text-blue-400">|</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Transforming ideas into digital reality with passion and precision. 
            Focused on <span className="text-blue-600 dark:text-blue-400 font-semibold">scalability</span>, <span className="text-purple-600 dark:text-purple-400 font-semibold">performance</span>, and <span className="text-pink-600 dark:text-pink-400 font-semibold">user experience</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <a 
            href="#contact" 
            onClick={() => scrollToSection( '#contact')}
            className="group px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
          >
            {t.hero.cta_primary} 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => {
                if (onViewChange) {
                    onViewChange('blog');
                    window.scrollTo(0, 0);
                } else {
                    const el = document.querySelector('#blog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
            }}
             className="px-8 py-4 rounded-full bg-white dark:bg-white/5 text-gray-800 dark:text-white font-bold text-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center gap-2 hover:shadow-lg hover:border-gray-300 dark:hover:border-white/20"
          >
            {t.hero.cta_secondary}
            <BookOpen className="w-5 h-5 opacity-70" />
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => scrollToSection( '#about')}>
            <ChevronDown className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
    </section>
  );
};

// --- ABOUT SECTION ---
export const About: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="about" className="py-32 bg-white dark:bg-dark relative overflow-hidden">
             {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Interactive Image Card */}
                    <div className="w-full lg:w-1/2 relative group perspective-1000">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] transform rotate-6 scale-95 opacity-20 group-hover:rotate-12 group-hover:scale-100 transition-all duration-500 blur-2xl"></div>
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2 border border-white/20 dark:border-slate-700 bg-gray-100 dark:bg-slate-800">
                            <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000" alt="Working" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <p className="text-white font-display text-2xl font-bold">"Building the future, one line at a time."</p>
                            </div>
                        </div>
                        
                        {/* Floating Stats */}
                        <div className="absolute -right-6 top-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700 animate-float">
                            <Zap className="w-8 h-8 text-yellow-500 mb-2" />
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Focus</span>
                            <div className="font-bold text-xl text-gray-900 dark:text-white">100%</div>
                        </div>
                         <div className="absolute -left-6 bottom-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700 animate-float" style={{ animationDelay: '1.5s' }}>
                            <Code className="w-8 h-8 text-blue-500 mb-2" />
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quality</span>
                            <div className="font-bold text-xl text-gray-900 dark:text-white">Clean</div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                            About Me
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight font-display">
                            {t.about.title} <span className="text-blue-600">.</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            {t.about.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { icon: Terminal, title: "Frontend Magic", desc: "React, Next.js, Tailwind, Framer Motion" },
                                { icon: Database, title: "Backend Robustness", desc: "Node.js, PostgreSQL, Supabase, AWS" },
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all group hover:shadow-lg cursor-default">
                                    <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{item.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- SKILLS SECTION (Data Viz) ---
export const Skills: React.FC = () => {
    const { t } = useLanguage();
    
    // Theme-aware colors
    const isDark = document.documentElement.classList.contains('dark');
    const strokeColor = '#3b82f6'; // Always blue for vibrancy
    const gridColor = isDark ? '#334155' : '#cbd5e1';
    const textColor = isDark ? '#94a3b8' : '#475569';

    const techStack = [
        "React", "TypeScript", "Next.js", "TailwindCSS", "Node.js", "PostgreSQL", "Git", "Docker", "AWS", "Figma"
    ];

    return (
        <section id="skills" className="py-32 bg-gray-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Background Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
                    Expertise
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white font-display">{t.skills.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">{t.skills.subtitle}</p>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                    {/* Chart */}
                    <div className="relative w-full max-w-2xl">
                        {/* Decorative Rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-500/10 rounded-full animate-pulse-glow"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-purple-500/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

                        <div className="h-[450px] w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] border border-white/60 dark:border-white/5 shadow-2xl p-4 relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={SKILLS_DATA}>
                                    <PolarGrid stroke={gridColor} strokeDasharray="3 3" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 13, fontWeight: 700 }} />
                                    <Radar
                                        name="Skills"
                                        dataKey="A"
                                        stroke={strokeColor}
                                        strokeWidth={4}
                                        fill="url(#radarGradient)"
                                        fillOpacity={0.5}
                                    />
                                    <defs>
                                        <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                                        </linearGradient>
                                    </defs>
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Tech Badges */}
                <div className="mt-16 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {techStack.map((tech, idx) => (
                        <div key={idx} className="px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-gray-100 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:scale-110 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-default">
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- BLOG SECTION (Home Preview) ---
export const Blog: React.FC<{ 
  onViewChange?: (view: 'home' | 'blog' | 'article', id?: string) => void;
  posts: BlogPost[];
  isLoading?: boolean;

}> = ({ onViewChange, posts, isLoading }) => {
    const { t } = useLanguage();

    const handleArticleClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        if (onViewChange) {
            onViewChange('article', id);
            window.scrollTo(0, 0);
        }
    };

    return (
        <section id="blog" className="py-32 bg-gray-50 dark:bg-slate-950 relative overflow-hidden">
             {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/10 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="max-w-2xl">
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-xs font-bold uppercase tracking-wider">
                            Blog
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white font-display">{t.blog.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{t.blog.subtitle}</p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => onViewChange && onViewChange('blog')}
                            className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:gap-3 transition-all"
                        >
                            {t.blog.view_all} <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-96 rounded-3xl bg-gray-200 dark:bg-slate-800 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {posts.slice(0, 3).map((post) => (
                            <div key={post.id} className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300 hover:-translate-y-2">
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-bold rounded-full text-blue-600 dark:text-blue-400">
                                        {post.category}
                                    </span>
                                </div>
                                
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                                        {post.excerpt}
                                    </p>
                                    
                                    <a href={`#article/${post.id}`} onClick={(e) => handleArticleClick(e, post.id)} className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-auto cursor-pointer">
                                        {t.blog.read_more} <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                 <div className="mt-8 text-center md:hidden">
                     <button 
                        onClick={() => onViewChange && onViewChange('blog')}
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold"
                     >
                        {t.blog.view_all} <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
            </div>
        </section>
    );
};

// --- ARTICLE DETAIL PAGE ---
export const ArticleDetailPage: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
    const { t } = useLanguage();
    
    return (
        <div className="min-h-screen pt-32 pb-20 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-6 max-w-4xl">
                 <button 
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'auto' });
                        onBack();
                    }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 font-semibold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    {t.blog.back_to_blog}
                </button>

                <div className="space-y-8 animate-fade-in">
                    <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-bold rounded-full uppercase tracking-wider">
                        {post.category}
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-slate-800 pb-8">
                         <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="https://ui-avatars.com/api/?name=Mustafa+Altas&background=3b82f6&color=fff" alt="Mustafa Altas" className="w-6 h-6 rounded-full" />
                            Mustafa Altas
                        </div>
                    </div>

                    <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl mb-12">
                         <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                        {/* Simulating rich text content */}
                        <p className="text-xl font-medium leading-relaxed text-gray-900 dark:text-gray-100">
                            {post.excerpt}
                        </p>
                        {post.content.map((paragraph, index) => (
                             <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 dark:border-slate-800 pt-12 mt-12">
                         <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Share this article</h3>
                         <div className="flex gap-4">
                            {['Twitter', 'LinkedIn', 'Facebook'].map(platform => (
                                <button key={platform} className="px-6 py-2 rounded-full border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-sm font-semibold">
                                    {platform}
                                </button>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- ALL POSTS PAGE ---
export const AllPostsPage: React.FC<{ 
  onBack: () => void; 
  onArticleClick: (id: string) => void;
  posts: BlogPost[];
}> = ({ onBack, onArticleClick, posts }) => {
    const { t } = useLanguage();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Use dynamic data
    const allPosts = posts;
    
    // Pagination logic
    const totalPages = Math.ceil(allPosts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPosts = allPosts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-slate-950">
            <div className="container mx-auto px-6">
                <button 
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'auto' });
                        onBack();
                    }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-12 font-semibold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    {t.blog.back_to_home}
                </button>

                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
                        {t.blog.all_posts_title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t.blog.all_posts_subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {currentPosts.map((post) => (
                         <div key={post.id} className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300 hover:-translate-y-2">
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-bold rounded-full text-blue-600 dark:text-blue-400">
                                    {post.category}
                                </span>
                            </div>
                            
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {post.readTime}
                                    </div>
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                                    {post.excerpt}
                                </p>
                                
                                <button onClick={() => { window.scrollTo({ top: 0, behavior: 'auto' }); onArticleClick(post.id); }} className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-auto cursor-pointer">
                                    {t.blog.read_more} <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-3 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        <div className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            {t.blog.page} {currentPage} {t.blog.of} {totalPages}
                        </div>

                        <button 
                             onClick={() => handlePageChange(currentPage + 1)}
                             disabled={currentPage === totalPages}
                             className="p-3 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- COVER LETTER SECTION ---
export const CoverLetter: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="cover-letter" className="py-32 bg-white dark:bg-dark relative">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="md:w-1/3">
                            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white sticky top-32 font-display">
                                {t.cover_letter.title}
                                <span className="block text-lg font-normal text-gray-500 mt-2 font-sans">{t.cover_letter.subtitle}</span>
                            </h2>
                        </div>
                        
                        <div className="md:w-2/3">
                            <div className="bg-gray-50 dark:bg-slate-900 p-10 md:p-14 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800 relative group hover:shadow-2xl transition-all duration-300 hover:border-blue-500/20">
                                <Quote className="absolute top-10 left-10 w-20 h-20 text-blue-100 dark:text-blue-900/10 group-hover:text-blue-200 dark:group-hover:text-blue-900/20 transition-colors transform group-hover:scale-110 duration-500" />
                                
                                <div className="space-y-6 relative z-10 text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
                                    {t.cover_letter.content.map((paragraph, index) => (
                                        <p key={index} className="transition-colors group-hover:text-gray-900 dark:group-hover:text-gray-100">{paragraph}</p>
                                    ))}
                                </div>
                                
                                <div className="mt-12 flex items-center justify-end gap-5">
                                    <div className="flex flex-col items-end">
                                        <span className="font-display font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Mustafa Altas</span>
                                        <span className="text-sm text-gray-500 font-semibold tracking-wide uppercase">Software Engineer</span>
                                    </div>
                                     <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg border-2 border-white dark:border-slate-700"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- CV DOWNLOAD SECTION ---
export const CVSection: React.FC = () => {
    const { t } = useLanguage();
    
    return (
        <section id="cv" className="py-24 bg-gray-50 dark:bg-slate-950">
             <div className="container mx-auto px-6">
                <div className="relative overflow-hidden rounded-[3rem] bg-dark text-white p-12 md:p-24 text-center group shadow-2xl">
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                    {/* Animated Shapes */}
                    <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center p-5 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/20">
                             <FileText className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-display">{t.cv.title}</h2>
                        <p className="text-blue-50 text-xl mb-10 leading-relaxed opacity-90 font-light">
                           {t.cv.description}
                        </p>
                        <button className="bg-white text-blue-700 font-bold px-10 py-5 rounded-full shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all flex items-center gap-3 mx-auto text-lg hover:ring-4 ring-white/30 active:scale-95">
                            <Download className="w-6 h-6" />
                            {t.cv.download}
                        </button>
                    </div>
                </div>
             </div>
        </section>
    );
};

// --- CONTACT SECTION ---
export const Contact: React.FC = () => {
    const { t } = useLanguage();
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) return;
        setStatus('sending');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <section id="contact" className="py-32 bg-white dark:bg-dark relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 dark:border-slate-800 min-h-[650px]">
                    <div className="p-12 md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                        
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-6 font-display">{t.contact.title}</h3>
                            <p className="text-blue-100 text-lg mb-12 leading-relaxed font-light">Let's build something amazing together. Reach out for collaborations or just a chat.</p>
                            
                            <div className="space-y-8">
                                <a href="mailto:mustafa.altas@example.com" className="flex items-center gap-5 hover:translate-x-2 transition-transform cursor-pointer group">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:bg-white/20 transition-colors">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium text-lg">mustafa.altas@example.com</span>
                                </a>
                                <a href="#" className="flex items-center gap-5 hover:translate-x-2 transition-transform cursor-pointer group">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:bg-white/20 transition-colors">
                                        <Linkedin className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium text-lg">linkedin.com/in/mustafaaltas</span>
                                </a>
                            </div>
                        </div>

                        <div className="mt-12 relative z-10">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-blue-600 cursor-pointer transition-all duration-300">
                                    <Github className="w-5 h-5" />
                                </div>
                                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-blue-600 cursor-pointer transition-all duration-300">
                                    <Linkedin className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-12 md:w-3/5 bg-white dark:bg-slate-900">
                        <form className="space-y-6 h-full flex flex-col justify-center" onSubmit={handleSubmit}>
                            <div className="group">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formState.name}
                                    onChange={handleInputChange}
                                    placeholder={t.contact.name_placeholder} 
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all shadow-sm hover:shadow-md text-gray-900 dark:text-white placeholder-gray-400" 
                                    required
                                />
                            </div>
                            <div className="group">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formState.email}
                                    onChange={handleInputChange}
                                    placeholder={t.contact.email_placeholder} 
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all shadow-sm hover:shadow-md text-gray-900 dark:text-white placeholder-gray-400" 
                                    required
                                />
                            </div>
                            <div className="group">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Message</label>
                                <textarea 
                                    rows={4} 
                                    name="message"
                                    value={formState.message}
                                    onChange={handleInputChange}
                                    placeholder={t.contact.message_placeholder} 
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all shadow-sm hover:shadow-md text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                                    required
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                disabled={status !== 'idle'}
                                className={`w-full py-5 font-bold text-lg rounded-2xl transition-all transform hover:-translate-y-1 shadow-xl flex items-center justify-center gap-3 ${
                                    status === 'success' 
                                        ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30' 
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/30'
                                }`}
                            >
                                {status === 'sending' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : status === 'success' ? (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        Sent!
                                    </>
                                ) : (
                                    <>
                                        {t.contact.send} <Send className="w-5 h-5 ml-1" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
