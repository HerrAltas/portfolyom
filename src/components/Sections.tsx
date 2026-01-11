
import React, { useState, useEffect, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Linkedin, Mail, FileText, Download, Quote, Loader2, CheckCircle, Send, Calendar, Clock, BookOpen, ArrowUpRight, ArrowLeft, ChevronLeft, ChevronRight, Share2, Twitter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SKILLS_DATA } from '../constants';
import { BlogPost } from '../types';
import Photo from "../assets/favicon.svg"

// Helper for smooth scrolling
const scrollToSection = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
};

// --- HERO SECTION ---
export const Hero: React.FC<{ onViewChange?: (view: 'home' | 'blog' | 'article' | 'admin', id?: string) => void }> = ({ onViewChange }) => {
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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md animate-fade-in shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 tracking-wide uppercase">Offen für neue Möglichkeiten</span>
        </div>
        <h2 className="text-xl md:text-3xl font-light text-gray-600 dark:text-gray-300 mb-4 animate-slide-up">{t.hero.greeting}</h2>
        <h1 className="text-5xl md:text-8xl font-display font-bold text-gray-900 dark:text-white mb-8 leading-tight animate-slide-up">
          Ben bir <br className="md:hidden" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 animate-gradient-x">{currentText}</span>
          <span className="animate-pulse text-blue-600">|</span>
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="group px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
            {t.hero.cta_primary} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button onClick={() => onViewChange?.('blog')} className="px-8 py-4 rounded-full bg-white dark:bg-white/5 text-gray-800 dark:text-white font-bold text-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            {t.hero.cta_secondary} <BookOpen className="w-5 h-5 opacity-70" />
          </button>
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
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 border border-white/20 dark:border-slate-700 bg-gray-100 dark:bg-slate-800">
                            <img src={Photo} alt="Working" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <p className="text-white font-display text-2xl font-bold">{t.about.experience_title}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">{t.about.title}</div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight font-display">{t.about.title} <span className="text-blue-600">.</span></h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{t.about.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- SKILLS SECTION ---
export const Skills: React.FC = () => {
    const { t } = useLanguage();
    const isDark = document.documentElement.classList.contains('dark');
    const strokeColor = '#3b82f6';
    const gridColor = isDark ? '#334155' : '#cbd5e1';
    const textColor = isDark ? '#94a3b8' : '#475569';
    const techStack = ["React", "TypeScript", "Next.js", "TailwindCSS", "Node.js", "PostgreSQL", "Git", "Docker", "AWS", "Figma"];

    return (
        <section id="skills" className="py-32 bg-gray-50 dark:bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white font-display">{t.skills.title}</h2>
                <div className="h-[450px] w-full max-w-2xl mx-auto bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] border border-white/60 dark:border-white/5 shadow-2xl p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={SKILLS_DATA}>
                            <PolarGrid stroke={gridColor} strokeDasharray="3 3" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 13, fontWeight: 700 }} />
                            <Radar name="Skills" dataKey="A" stroke={strokeColor} strokeWidth={4} fill="url(#radarGradient)" fillOpacity={0.5} />
                            <defs>
                                <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                                </linearGradient>
                            </defs>
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-16 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {techStack.map((tech, idx) => (
                        <div key={idx} className="px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-gray-100 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:scale-110 transition-all cursor-default">{tech}</div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- BLOG SECTION (Home Preview) ---
export const Blog: React.FC<{ onViewChange?: (view: 'home' | 'blog' | 'article' | 'admin', id?: string) => void; posts: BlogPost[]; isLoading?: boolean; }> = ({ onViewChange, posts, isLoading }) => {
    const { t } = useLanguage();
    return (
        <section id="blog" className="py-32 bg-gray-50 dark:bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="max-w-2xl">
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-xs font-bold uppercase tracking-wider">Blog</div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white font-display">{t.blog.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{t.blog.subtitle}</p>
                    </div>
                    <button onClick={() => onViewChange?.('blog')} className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">{t.blog.view_all} <ArrowRight className="w-5 h-5" /></button>
                </div>
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (<div key={i} className="h-96 rounded-3xl bg-gray-200 dark:bg-slate-800 animate-pulse"></div>))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {posts.slice(0, 3).map((post) => (
                            <div key={post.id} onClick={() => onViewChange?.('article', post.id)} className="group cursor-pointer flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-bold rounded-full text-blue-600">{post.category}</span>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6">{post.excerpt}</p>
                                    <div className="mt-auto flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">{t.blog.read_more} <ArrowUpRight className="w-4 h-4" /></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

// --- ARTICLE DETAIL PAGE (Premium Layout) ---
export const ArticleDetailPage: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
    const { t } = useLanguage();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setScrollProgress((winScroll / height) * 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen pb-20 bg-white dark:bg-slate-950 animate-fade-in">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 dark:bg-slate-800 z-50">
                <div className="h-full bg-blue-600 transition-all duration-100" style={{ width: `${scrollProgress}%` }}></div>
            </div>

            {/* Hero Section of Article */}
            <div className="relative h-[70vh] w-full">
                <div className="absolute inset-0">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-10 md:p-20 z-10">
                    <div className="container mx-auto max-w-4xl">
                        <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-10 transition-colors font-semibold bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            <ArrowLeft className="w-5 h-5" /> {t.blog.back_to_blog}
                        </button>
                        <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-full uppercase tracking-wider mb-6">
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-7xl font-display font-bold text-white leading-tight mb-8">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</div>
                            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</div>
                            <div className="flex items-center gap-2">
                                <img src="https://ui-avatars.com/api/?name=Mustafa+Altas&background=3b82f6&color=fff" className="w-6 h-6 rounded-full" />
                                Mustafa Altas
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 max-w-3xl mt-20">
                <div className="prose prose-xl dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-12">
                    <p className="text-2xl font-medium leading-relaxed text-gray-900 dark:text-gray-100 italic border-l-4 border-blue-600 pl-8 py-2">
                        {post.excerpt}
                    </p>
                    
                    <div className="article-content space-y-8 text-lg md:text-xl">
                        {post.content.map((paragraph, index) => (
                            <p key={index} className={index === 0 ? "first-letter:text-7xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-3 first-letter:float-left first-letter:font-display" : ""}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Engagement Footer */}
                <div className="mt-20 pt-12 border-t border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <h4 className="text-xl font-bold mb-2">Bu makaleyi beğendiniz mi?</h4>
                        <p className="text-gray-500">Daha fazla içerik için beni takip edebilir veya iletişime geçebilirsiniz.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"><Twitter /></button>
                        <button className="p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"><Linkedin /></button>
                        <button className="p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"><Share2 /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- ALL POSTS PAGE ---
export const AllPostsPage: React.FC<{ onBack: () => void; onArticleClick: (id: string) => void; posts: BlogPost[]; }> = ({ onBack, onArticleClick, posts }) => {
    const { t } = useLanguage();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPosts = posts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-slate-950">
            <div className="container mx-auto px-6">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-12 font-semibold"><ArrowLeft className="w-5 h-5" /> {t.blog.back_to_home}</button>
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">{t.blog.all_posts_title}</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {currentPosts.map((post) => (
                         <div key={post.id} onClick={() => onArticleClick(post.id)} className="group cursor-pointer flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300">
                            <div className="relative h-48 overflow-hidden"><img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" /></div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{post.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6">{post.excerpt}</p>
                                <div className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">{t.blog.read_more} <ArrowUpRight className="w-4 h-4" /></div>
                            </div>
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4">
                        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-3 rounded-full bg-white dark:bg-slate-800 border disabled:opacity-50"><ChevronLeft /></button>
                        <div className="text-sm font-bold">{currentPage} / {totalPages}</div>
                        <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-3 rounded-full bg-white dark:bg-slate-800 border disabled:opacity-50"><ChevronRight /></button>
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
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/3"><h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white font-display">{t.cover_letter.title}<span className="block text-lg font-normal text-gray-500 mt-2 font-sans">{t.cover_letter.subtitle}</span></h2></div>
                    <div className="md:w-2/3">
                        <div className="bg-gray-50 dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800 relative group">
                            <Quote className="absolute top-10 left-10 w-20 h-20 text-blue-100 dark:text-blue-900/10" />
                            <div className="space-y-6 relative z-10 text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
                                {t.cover_letter.content.map((paragraph, index) => (<p key={index}>{paragraph}</p>))}
                            </div>
                            <div className="mt-12 flex items-center justify-end gap-5">
                                <div className="flex flex-col items-end"><span className="font-display font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Mustafa Altas</span><span className="text-sm text-gray-500 font-semibold tracking-wide uppercase">Software Engineer</span></div>
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white"></div>
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
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-90"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center p-5 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/20"><FileText className="w-10 h-10 text-white" /></div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">{t.cv.title}</h2>
                        <p className="text-blue-50 text-xl mb-10 leading-relaxed opacity-90">{t.cv.description}</p>
                        <button className="bg-white text-blue-700 font-bold px-10 py-5 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-3 mx-auto text-lg"><Download className="w-6 h-6" /> {t.cv.download}</button>
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
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formState.name.trim();
    const email = formState.email.trim();
    const message = formState.message.trim();
    if (!name || !email || !message) return;

    setStatus('sending');

    try {
      const res = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error('Formspree send failed');

      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch  {
      setStatus('error');
      
    }
  };
    return (
        <section id="contact" className="py-32 bg-white dark:bg-dark relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 dark:border-slate-800">
                    <div className="p-12 md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex flex-col justify-between">
                        <h3 className="text-3xl font-bold mb-6 font-display">{t.contact.title}</h3>
                        <div className="space-y-8">
                            <a href="mailto:mustafa.altas@example.com" className="flex items-center gap-5 hover:translate-x-2 transition-transform"><div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10"><Mail className="w-6 h-6" /></div><span className="font-medium text-lg">mustafa.altas@example.com</span></a>
                            <a href="#" className="flex items-center gap-5 hover:translate-x-2 transition-transform"><div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10"><Linkedin className="w-6 h-6" /></div><span className="font-medium text-lg">linkedin.com/in/mustafaaltas</span></a>
                        </div>
                    </div>
                    <div className="p-12 md:w-3/5 bg-white dark:bg-slate-900">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <input name="name" value={formState.name} onChange={handleInputChange} placeholder={t.contact.name_placeholder} className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500" required />
                            <input type="email" name="email" value={formState.email} onChange={handleInputChange} placeholder={t.contact.email_placeholder} className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500" required />
                            <textarea rows={4} name="message" value={formState.message} onChange={handleInputChange} placeholder={t.contact.message_placeholder} className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500 resize-none" required></textarea>
                            <button type="submit" disabled={status !== 'idle'} className="w-full py-5 font-bold text-lg rounded-2xl bg-blue-600 text-white shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                                {status === 'sending' ? <Loader2 className="w-5 h-5 animate-spin" /> : status === 'success' ? <CheckCircle className="w-5 h-5" /> : <>{t.contact.send} <Send className="w-5 h-5" /></>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
