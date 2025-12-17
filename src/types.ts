export type Language = 'tr' | 'en' | 'de';
export type Theme = 'light' | 'dark';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface SkillData {
  subject: string;
  A: number; // Proficiency
  fullMark: number;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string[]; // Array of paragraphs for the full article
    date: string;
    readTime: string;
    category: string;
    image: string;
}

export interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    blog: string;
    cover_letter: string;
    cv: string;
    contact: string;
  };
  hero: {
    greeting: string;
    cta_primary: string;
    cta_secondary: string;
  };
  about: {
    title: string;
    description: string;
    experience_title: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  blog: {
    title: string;
    subtitle: string;
    read_more: string;
    maintenance_message: string;
    view_all: string;
    back_to_home: string;
    back_to_blog: string;
    all_posts_title: string;
    all_posts_subtitle: string;
    prev_page: string;
    next_page: string;
    page: string;
    of: string;
  };
  cover_letter: {
    title: string;
    subtitle: string;
    content: string[];
  };
  cv: {
    title: string;
    description: string;
    download: string;
  };
  contact: {
    title: string;
    name_placeholder: string;
    email_placeholder: string;
    message_placeholder: string;
    send: string;
  };
  seo: {
    title: string;
    description: string;
  };
  ai: {
    chat_trigger: string;
    intro: string;
    placeholder: string;
    disclaimer: string;
  };
}