
import React, { useState, useEffect } from 'react';
import { Send, Plus, Loader2, Lock, LayoutDashboard, FileText, ArrowLeft, LogOut, Trash2 } from 'lucide-react';
import { addBlogPost, getBlogPosts, db } from '../service/firebaseService';
import { BlogPost } from '../types';
// Fixed named imports from firebase/firestore for modular SDK compatibility
import { doc, deleteDoc } from "firebase/firestore";

interface AdminPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBack, onSuccess }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  
  const ADMIN_PASSWORD = "admin123"; // Replace with your secure password

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    image: '',
    readTime: '5 min read',
    content: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await getBlogPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Password!");
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
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        content: formData.content.split('\n').filter(p => p.trim() !== '')
      });
      alert("Successfully published!");
      setFormData({ title: '', excerpt: '', category: '', image: '', readTime: '5 min read', content: '' });
      setActiveTab('list');
      fetchPosts();
      onSuccess();
    } catch (err) {
      alert("An error occurred during publishing.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!db) return;
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      // Use modular doc and deleteDoc functions to remove content
      await deleteDoc(doc(db, "blog_posts", id));
      fetchPosts();
      onSuccess();
    } catch (err) {
      alert("Failed to delete the post.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-6">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 text-center animate-fade-in">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Lock className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2 font-display">Admin Login</h1>
          <p className="text-gray-500 mb-8">Please enter your master password to continue.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500 text-center text-lg"
              autoFocus
            />
            <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all">
              Login
            </button>
            <button type="button" onClick={onBack} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium">
              Back to Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl font-display">Admin Panel</span>
          </div>
          
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('list')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'list' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
            >
              <FileText className="w-5 h-5" /> My Posts
            </button>
            <button 
              onClick={() => setActiveTab('add')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'add' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
            >
              <Plus className="w-5 h-5" /> Add New
            </button>
          </nav>
        </div>

        <div className="space-y-2 pt-10">
          <button onClick={onBack} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
            <ArrowLeft className="w-5 h-5" /> View Site
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      {/* Admin Content Area */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
            {activeTab === 'list' ? 'Manage Blog Posts' : 'Create New Post'}
          </h2>
          <p className="text-gray-500">Easily manage your portfolio content from here.</p>
        </header>

        {activeTab === 'list' ? (
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>
            ) : posts.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 p-12 rounded-[2rem] text-center border-2 border-dashed border-gray-100 dark:border-slate-800">
                <p className="text-gray-500">No blog posts found.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {posts.map(post => (
                  <div key={post.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 flex items-center justify-between group hover:shadow-xl transition-all">
                    <div className="flex items-center gap-6">
                      <img src={post.image} className="w-20 h-20 rounded-2xl object-cover" alt={post.title} />
                      <div>
                        <h4 className="font-bold text-lg">{post.title}</h4>
                        <div className="flex gap-3 text-xs text-gray-500 mt-1">
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl">
            <form onSubmit={handlePublish} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Title</label>
                  <input 
                    required 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Category</label>
                  <input 
                    required 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g., Frontend"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Cover Image URL</label>
                <input 
                  value={formData.image} 
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Short Excerpt</label>
                <textarea 
                  required 
                  value={formData.excerpt} 
                  onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  rows={2}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Content (One paragraph per line)</label>
                <textarea 
                  required 
                  value={formData.content} 
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  rows={10}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 ring-blue-500"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                Publish Article
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
