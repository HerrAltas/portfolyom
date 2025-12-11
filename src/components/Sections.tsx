import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Github, Linkedin, Mail, FileText, Download, Quote, Loader2, CheckCircle, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SKILLS_DATA } from '../constants';

// Helper for smooth scrolling with offset
const scrollToSection = (e: React.MouseEvent<HTMLElement>, href: string) => {
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
};

// --- HERO SECTION ---
export const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Animated Blobs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob dark:bg-purple-900 dark:opacity-20"></div>
      <div className="absolute top-20 -right-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 dark:bg-blue-900 dark:opacity-20"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 dark:bg-pink-900 dark:opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4 animate-slide-up">
            {t.hero.greeting}
        </h2>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
          A Journey of<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"> Growth</span><br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"> Passion, and Purpose.</span><br/>
        </h1>
        <div className="h-8"></div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, '#contact')}
            className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {t.hero.cta_primary} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

// --- ABOUT SECTION ---
export const About: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="about" className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-gray-50 dark:border-slate-800">
                            <img src="https://picsum.photos/800/800?grayscale" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700">
                            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">5+</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t.about.experience_title}</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">{t.about.title}</h2>
                        <div className="h-1 w-20 bg-blue-600 dark:bg-blue-400 mb-8"></div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            {t.about.description}
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-transparent dark:border-slate-700 hover:border-blue-500 transition-colors">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Frontend</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">React, Next.js, Tailwind</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-transparent dark:border-slate-700 hover:border-blue-500 transition-colors">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Backend</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Node, PostgreSQL, AWS</p>
                            </div>
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
    const strokeColor = isDark ? '#60a5fa' : '#2563eb';
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    const textColor = isDark ? '#94a3b8' : '#475569';

    return (
        <section id="skills" className="py-24 bg-gray-50 dark:bg-slate-950">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t.skills.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-12">{t.skills.subtitle}</p>

                <div className="h-[400px] w-full max-w-4xl mx-auto">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILLS_DATA}>
                            <PolarGrid stroke={gridColor} />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 12 }} />
                            <Radar
                                name="Skills"
                                dataKey="A"
                                stroke={strokeColor}
                                strokeWidth={3}
                                fill={strokeColor}
                                fillOpacity={0.4}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

// --- COVER LETTER SECTION ---
export const CoverLetter: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="cover-letter" className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t.cover_letter.title}</h2>
                         <p className="text-gray-600 dark:text-gray-400">{t.cover_letter.subtitle}</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-800 p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 relative">
                        <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-200 dark:text-blue-900/30" />
                        
                        <div className="space-y-6 relative z-10 text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
                            {t.cover_letter.content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        
                        <div className="mt-8 flex items-center justify-end gap-2">
                             <div className="h-px w-12 bg-blue-600 dark:bg-blue-400"></div>
                             <span className="font-display font-bold text-xl text-blue-600 dark:text-blue-400">Mustafa Altas</span>
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
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform -translate-x-10 -translate-y-10"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl transform translate-x-10 translate-y-10"></div>

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto flex items-center justify-center mb-6">
                             <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.cv.title}</h2>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
                           {t.cv.description}
                        </p>
                        <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 mx-auto">
                            <Download className="w-5 h-5" />
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
        // Basic validation
        if (!formState.name || !formState.email || !formState.message) return;

        setStatus('sending');

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 2000));

        setStatus('success');
        setFormState({ name: '', email: '', message: '' });

        // Reset status after a delay
        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <section id="contact" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 dark:from-slate-900 to-transparent"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-slate-950 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 dark:border-slate-800">
                    <div className="p-10 md:w-2/5 bg-blue-600 dark:bg-blue-700 text-white flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">{t.contact.title}</h3>
                            <p className="text-blue-100 mb-8">Reach out for collaborations, job opportunities, or just a friendly hello.</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-blue-300" />
                                    <span>mustafa.altas@example.com</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Linkedin className="w-5 h-5 text-blue-300" />
                                    <span>linkedin.com/in/mustafaaltas</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 cursor-pointer transition">
                                <Github className="w-5 h-5" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 cursor-pointer transition">
                                <Linkedin className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-10 md:w-3/5">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formState.name}
                                    onChange={handleInputChange}
                                    placeholder={t.contact.name_placeholder} 
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition text-gray-900 dark:text-white" 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formState.email}
                                    onChange={handleInputChange}
                                    placeholder={t.contact.email_placeholder} 
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition text-gray-900 dark:text-white" 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                <textarea 
                                    rows={4} 
                                    name="message"
                                    value={formState.message}
                                    onChange={handleInputChange}
                                    placeholder={t.contact.message_placeholder} 
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition text-gray-900 dark:text-white"
                                    required
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                disabled={status !== 'idle'}
                                className={`w-full py-3 font-bold rounded-xl transition transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 ${
                                    status === 'success' 
                                        ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30' 
                                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 dark:bg-blue-500 dark:hover:bg-blue-600'
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
                                        Sent Successfully!
                                    </>
                                ) : (
                                    <>
                                        {t.contact.send} <Send className="w-4 h-4 ml-1" />
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