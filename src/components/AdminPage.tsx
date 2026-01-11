
import React, { useState, useEffect } from 'react';
import { X, Send, Plus, Loader2, Lock, LayoutDashboard, FileText, ArrowLeft, LogOut, Trash2, Sparkles, Wand2, Tag as TagIcon, RefreshCw } from 'lucide-react';
import { addBlogPost, getBlogPosts, db } from '../service/firebaseService';
import { generateArticleWithAI, GeneratedArticle } from '../service/blogAiService';
import { BlogPost } from '../types';
import { doc, deleteDoc } from "firebase/firestore";

interface AdminPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBack, onSuccess }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'ai'>('list');
  
  // Tag Input States
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [lastSearchTerm, setLastSearchTerm] = useState('technology');
  

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    image: '',
    readTime: '5 min read',
    content: ''
  });

  useEffect(() => {
    if (isAuthenticated) fetchPosts();
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await getBlogPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) setIsAuthenticated(true);
    else alert("Geçersiz Şifre!");
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = currentInput.trim().replace(',', '');
      if (val && !keywords.includes(val)) {
        setKeywords([...keywords, val]);
        setCurrentInput('');
      }
    } else if (e.key === 'Backspace' && !currentInput && keywords.length > 0) {
      setKeywords(keywords.slice(0, -1));
    }
  };

  const removeKeyword = (indexToRemove: number) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
  };

  const refreshImage = () => {
    const term = lastSearchTerm || 'technology';
    const newImageUrl = `https://loremflickr.com/1200/800/${encodeURIComponent(term)}?lock=${Math.floor(Math.random() * 1000)}`;
    setFormData(prev => ({ ...prev, image: newImageUrl }));
  };

  const handleMagicCreate = async () => {
    if (keywords.length < 3) {
      alert("Lütfen en az 3 anahtar kelime girin.");
      return;
    }

    setIsGenerating(true);
    try {
      const generated: GeneratedArticle = await generateArticleWithAI(keywords);
      const term = generated.imageSearchTerm || 'technology';
      setLastSearchTerm(term);
      
      const imageUrl = `https://loremflickr.com/1200/800/${encodeURIComponent(term)}?lock=${Math.floor(Math.random() * 1000)}`;
      
      setFormData({
        title: generated.title,
        excerpt: generated.excerpt,
        category: generated.category,
        image: imageUrl,
        readTime: `${Math.ceil(generated.content.join(' ').split(' ').length / 200)} dk okuma`,
        content: generated.content.join('\n\n')
      });
      setActiveTab('add');
    } catch (err) {
      console.error(err)
      alert("Yapay zeka makale oluştururken bir hata oluştu.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addBlogPost({
        title: formData.title,
        excerpt: formData.excerpt,
        category: formData.category,
        image: formData.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
        readTime: formData.readTime,
        date: new Date().toLocaleDateString('tr-TR', { month: 'long', day: 'numeric', year: 'numeric' }),
        content: formData.content.split('\n\n').filter(p => p.trim() !== '')
      });
      alert("Makale başarıyla yayınlandı!");
      setFormData({ title: '', excerpt: '', category: '', image: '', readTime: '5 min read', content: '' });
      setKeywords([]);
      setActiveTab('list');
      fetchPosts();
      onSuccess();
    } catch (err) {
      console.error(err)
      alert("Yayınlama sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!db) return;
    if (!window.confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    try {
      await deleteDoc(doc(db, "blog_posts", id));
      fetchPosts();
      onSuccess();
    } catch (err) { 
      console.error(err)
      alert("Silme hatası."); }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-6">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 text-center animate-fade-in">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Lock className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2 font-display">Yönetici Girişi</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500 text-center"
              autoFocus
            />
            <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all">Giriş Yap</button>
            <button type="button" onClick={onBack} className="text-gray-500 text-sm">Siteye Dön</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col md:flex-row">
      <div className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><LayoutDashboard className="w-6 h-6 text-white" /></div>
            <span className="font-bold text-xl font-display">Yönetim</span>
          </div>
          <nav className="space-y-2">
            <button onClick={() => setActiveTab('list')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'list' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold' : 'text-gray-500'}`}><FileText className="w-5 h-5" /> Yazılarım</button>
            <button onClick={() => setActiveTab('ai')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'ai' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 font-bold' : 'text-gray-500'}`}><Sparkles className="w-5 h-5" /> AI Sihirbazı</button>
            <button onClick={() => setActiveTab('add')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'add' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold' : 'text-gray-500'}`}><Plus className="w-5 h-5" /> Manuel Ekle</button>
          </nav>
        </div>
        <div className="space-y-2 pt-10">
          <button onClick={onBack} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500"><ArrowLeft className="w-5 h-5" /> Siteyi Gör</button>
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500"><LogOut className="w-5 h-5" /> Çıkış</button>
        </div>
      </div>

      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        {activeTab === 'list' && (
          <>
            <h2 className="text-3xl font-bold mb-8 font-display">Yazıları Yönet</h2>
            <div className="grid gap-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <img src={post.image} className="w-16 h-16 rounded-2xl object-cover" />
                    <div>
                      <h4 className="font-bold">{post.title}</h4>
                      <p className="text-xs text-gray-500">{post.category} • {post.date}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'ai' && (
          <div className="max-w-3xl mx-auto text-center py-12">
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-4xl font-bold mb-4 font-display">AI Makale Sihirbazı</h2>
            <p className="text-gray-500 mb-10">Kelimeleri yazıp Enter'a basarak ekleyin. AI sizin için profesyonel bir içerik ve görsel hazırlayacak.</p>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-dashed border-purple-200 dark:border-purple-900 shadow-xl">
              <div className="flex flex-wrap gap-3 mb-4">
                {keywords.map((keyword, index) => (
                  <span key={index} className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm font-bold animate-fade-in border border-purple-100 dark:border-purple-800">
                    {keyword}
                    <button onClick={() => removeKeyword(index)} className="hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
                <input 
                  value={currentInput}
                  onChange={e => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeywordKeyDown}
                  placeholder={keywords.length === 0 ? "Kelimeleri eklemeye başlayın..." : "Sıradaki..."}
                  className="flex-1 min-w-[200px] p-2 bg-transparent outline-none text-lg dark:text-white"
                />
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-400 mt-6 border-t border-gray-50 dark:border-slate-800 pt-4">
                <span className="flex items-center gap-1"><TagIcon className="w-3 h-3" /> {keywords.length} Kelime Eklendi</span>
                <span>Enter veya Virgül ile ekleyin</span>
              </div>
            </div>

            <button 
              onClick={handleMagicCreate}
              disabled={isGenerating || keywords.length < 3}
              className="mt-10 w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Wand2 className="w-6 h-6" />}
              {isGenerating ? 'Yazılıyor...' : 'Sihirli Makaleyi Oluştur'}
            </button>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">Makale Önizleme ve Düzenleme</h3>
                {formData.image && (
                  <button onClick={refreshImage} className="flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors">
                    <RefreshCw className="w-4 h-4" /> Görseli Değiştir
                  </button>
                )}
              </div>

              {/* Image Preview Area */}
              {formData.image && (
                <div className="relative w-full h-64 mb-10 rounded-3xl overflow-hidden bg-gray-100 dark:bg-slate-800 group">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
                </div>
              )}

              <form onSubmit={handlePublish} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Başlık</label>
                    <input required placeholder="Başlık" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500 font-bold text-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Kategori</label>
                    <input required placeholder="Kategori" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Görsel URL</label>
                    <input required placeholder="Görsel URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500" />
                  </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Kısa Özet</label>
                    <textarea required placeholder="Kısa Özet" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500 h-24" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-2 uppercase">İçerik</label>
                    <textarea required placeholder="İçerik (Her paragraf arasında bir boşluk bırakın)" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500 h-80" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 active:scale-[0.99] transition-all flex items-center justify-center gap-3">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                  Makaleyi Yayınla
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
