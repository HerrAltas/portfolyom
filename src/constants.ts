import { SkillData, Translations, Language, BlogPost } from './types';

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      blog: 'Writings',
      cover_letter: 'Cover Letter',
      cv: 'Resume',
      contact: 'Contact'
    },
    hero: {
      greeting: "Hello, I'm Mustafa Altas",
      cta_primary: 'Get in Touch',
      cta_secondary: 'Read Articles',
    },
    about: {
      title: 'About Me',
      description: 'I am a highly motivated developer with a relentless passion for learning. While I have a strong foundation in web development, my true strength lies in my ability to adapt to new technologies and challenges instantly. I approach every project with enthusiasm, high energy, and a desire to grow beyond boundaries.',
      experience_title: 'Continuous Learner'
    },
    skills: {
      title: 'Technical Potential',
      subtitle: 'My current stack and ability to master new tools'
    },
    blog: {
        title: 'Latest Writings',
        subtitle: 'Thoughts on technology, coding patterns, and software architecture.',
        read_more: 'Read Article',
        maintenance_message: 'This page is currently under maintenance.',
        view_all: 'View all posts',
        back_to_home: 'Back to Home',
        back_to_blog: 'Back to Articles',
        all_posts_title: 'All Articles',
        all_posts_subtitle: 'Explore my complete library of thoughts, tutorials, and insights.',
        prev_page: 'Previous',
        next_page: 'Next',
        page: 'Page',
        of: 'of'
    },
    cover_letter: {
      title: 'Motivation & Purpose',
      subtitle: 'Why I am the right fit for your team',
      content: [
        "To Whom It May Concern,",
        "Software development is more than just writing code for me; it is a continuous journey of solving problems and creating value. Throughout my career, I have not only focused on technical excellence but also on adapting to the ever-changing landscape of technology. My greatest asset is not just what I know today, but how quickly I can master what comes tomorrow.",
        "I thrive in dynamic environments where curiosity is rewarded and challenges are seen as opportunities. Whether it's mastering a new framework overnight or optimizing a complex system, I bring a level of energy and dedication that pushes projects forward.",
        "I am eager to bring my adaptability, technical skills, and unwavering motivation to your team to build impactful solutions together."
      ]
    },
    cv: {
      title: 'Curriculum Vitae',
      description: 'Want to see my journey and potential? Download my resume to explore my background, education, and the drive I bring to every team.',
      download: 'Download Resume'
    },
    contact: {
      title: 'Let\'s Connect',
      name_placeholder: 'Your Name',
      email_placeholder: 'Your Email',
      message_placeholder: 'How can I help you?',
      send: 'Send Message'
    },
    seo: {
      title: 'Mustafa Altas | Motivated Tech Enthusiast',
      description: 'Portfolio of Mustafa Altas, a highly motivated developer passionate about continuous learning and innovation.'
    },
    ai: {
      chat_trigger: 'Chat with AI',
      intro: "Hi! I'm Mustafa's AI assistant. Ask me anything about his skills, experience, or projects!",
      placeholder: 'Type your message...',
      disclaimer: 'AI can make mistakes. Please verify important info.'
    }
  },
  tr: {
    nav: {
      home: 'Anasayfa',
      about: 'Hakkımda',
      skills: 'Yetenekler',
      blog: 'Yazılarım',
      cover_letter: 'Ön Yazı',
      cv: 'Özgeçmiş',
      contact: 'İletişim'
    },
    hero: {
      greeting: "Merhaba, Ben Mustafa Altas",
      cta_primary: 'İletişime Geç',
      cta_secondary: 'Yazıları Oku',
    },
    about: {
      title: 'Hakkımda',
      description: 'Ben, öğrenme tutkusu yüksek ve son derece motive bir geliştiriciyim. Web geliştirme konusunda güçlü bir temele sahip olmamın yanı sıra, asıl gücüm yeni teknolojilere ve zorluklara hızla uyum sağlayabilmemdir. Her projeye yüksek enerjiyle, öğrenme açlığıyla ve sınırları zorlama arzusuyla yaklaşıyorum.',
      experience_title: 'Sürekli Öğrenen'
    },
    skills: {
      title: 'Teknik Potansiyel',
      subtitle: 'Mevcut yetkinliklerim ve yeni araçları öğrenme hızım'
    },
    blog: {
        title: 'Blog & Notlar',
        subtitle: 'Teknoloji trendleri, yazılım mimarisi ve deneyimlerim üzerine düşünceler.',
        read_more: 'Makaleyi Oku',
        maintenance_message: 'Şu an sayfa bakım aşamasındadır.',
        view_all: 'Tüm yazıları gör',
        back_to_home: 'Anasayfaya Dön',
        back_to_blog: 'Yazılara Dön',
        all_posts_title: 'Tüm Yazılar',
        all_posts_subtitle: 'Teknoloji, yazılım ve deneyimlerim üzerine tüm notlarım.',
        prev_page: 'Önceki',
        next_page: 'Sonraki',
        page: 'Sayfa',
        of: '/'
    },
    cover_letter: {
      title: 'Motivasyon Mektubu',
      subtitle: 'Neden ekibiniz için doğru kişiyim',
      content: [
        "Sayın Yetkili,",
        "Yazılım geliştirme benim için sadece kod yazmaktan ibaret değil; sorunları çözmek ve değer yaratmak için sürekli bir yolculuktur. Kariyerim boyunca sadece teknik mükemmelliğe odaklanmakla kalmadım, aynı zamanda teknolojinin sürekli değişen doğasına uyum sağlamaya da büyük önem verdim. En büyük varlığım, bugün bildiklerimden ziyade, yarın gelecek olanları ne kadar hızlı öğrenebildiğimdir.",
        "Merakın ödüllendirildiği ve zorlukların fırsat olarak görüldüğü dinamik ortamlarda en iyi performansımı sergilerim. İster yeni bir framework'ü bir gecede öğrenmek olsun, ister karmaşık bir sistemi optimize etmek; projelere her zaman ileriye taşıyan bir enerji ve adanmışlık katarım.",
        "Uyumluluğumu, teknik becerilerimi ve sarsılmaz motivasyonumu ekibinize katarak birlikte etkileyici çözümler üretmek için sabırsızlanıyorum."
      ]
    },
    cv: {
      title: 'Özgeçmiş',
      description: 'Yolculuğumu ve potansiyelimi görmek ister misiniz? Geçmişimi, eğitimimi ve takımlara kattığım enerjiyi incelemek için CV\'mi indirin.',
      download: 'CV İndir'
    },
    contact: {
      title: 'İletişime Geç',
      name_placeholder: 'Adınız',
      email_placeholder: 'E-postanız',
      message_placeholder: 'Nasıl yardımcı olabilirim?',
      send: 'Mesaj Gönder'
    },
    seo: {
      title: 'Mustafa Altas | Motive Teknoloji Tutkunu',
      description: 'Sürekli öğrenmeye ve inovasyona tutkulu, motivasyonu yüksek geliştirici Mustafa Altas\'ın portföyü.'
    },
    ai: {
      chat_trigger: 'AI ile Sohbet',
      intro: "Merhaba! Ben Mustafa'nın AI asistanıyım. Yetenekleri, deneyimi veya projeleri hakkında bana her şeyi sorabilirsiniz!",
      placeholder: 'Mesajınızı yazın...',
      disclaimer: 'AI hatalar yapabilir. Lütfen önemli bilgileri doğrulayın.'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      about: 'Über mich',
      skills: 'Fähigkeiten',
      blog: 'Blog',
      cover_letter: 'Anschreiben',
      cv: 'Lebenslauf',
      contact: 'Kontakt'
    },
    hero: {
      greeting: "Hallo, ich bin Mustafa Altas",
      cta_primary: 'Kontaktieren',
      cta_secondary: 'Artikel lesen',
    },
    about: {
      title: 'Über mich',
      description: 'Ich bin ein hochmotivierter Entwickler mit einer unermüdlichen Leidenschaft für das Lernen. Während ich über ein starkes Fundament in der Webentwicklung verfüge, liegt meine wahre Stärke in meiner Fähigkeit, mich sofort an neue Technologien und Herausforderungen anzupassen. Ich gehe jedes Projekt mit Begeisterung, hoher Energie und dem Wunsch an, über Grenzen hinauszuwachsen.',
      experience_title: 'Lebenslanges Lernen'
    },
    skills: {
      title: 'Technisches Potenzial',
      subtitle: 'Mein aktueller Stack und meine Fähigkeit, Neues zu meistern'
    },
    blog: {
        title: 'Blog & Gedanken',
        subtitle: 'Gedanken zu Technologie, Coding-Patterns und Softwarearchitektur.',
        read_more: 'Artikel lesen',
        maintenance_message: 'Diese Seite befindet sich derzeit im Aufbau.',
        view_all: 'Alle Beiträge ansehen',
        back_to_home: 'Zurück zur Startseite',
        back_to_blog: 'Zurück zum Blog',
        all_posts_title: 'Alle Artikel',
        all_posts_subtitle: 'Entdecken Sie meine komplette Bibliothek an Gedanken und Tutorials.',
        prev_page: 'Zurück',
        next_page: 'Weiter',
        page: 'Seite',
        of: 'von'
    },
    cover_letter: {
      title: 'Anschreiben',
      subtitle: 'Warum ich die richtige Wahl für Ihr Team bin',
      content: [
        "Sehr geehrte Damen und Herren,",
        "Softwareentwicklung ist für mich mehr als nur das Schreiben von Code; es ist eine ständige Reise der Problemlösung und Wertschöpfung. Während meiner gesamten Laufbahn habe ich mich nicht nur auf technische Exzellenz konzentriert, sondern auch darauf, mich an die sich ständig verändernde Technologielandschaft anzupassen. Mein größtes Kapital ist nicht nur das, was ich heute weiß, sondern wie schnell ich das meistern kann, was morgen kommt.",
        "Ich blühe in dynamischen Umgebungen auf, in denen Neugier belohnt wird und Herausforderungen als Chancen gesehen werden. Ob es darum geht, ein neues Framework über Nacht zu lernen oder ein komplexes System zu optimieren – ich bringe ein Maß an Energie und Engagement mit, das Projekte voranbringt.",
        "Ich freue mich darauf, meine Anpassungsfähigkeit, meine technischen Fähigkeiten und meine unerschütterliche Motivation in Ihr Team einzubringen, um gemeinsam wirkungsvolle Lösungen zu entwickeln."
      ]
    },
    cv: {
      title: 'Lebenslauf',
      description: 'Möchten Sie meinen Werdegang und mein Potenzial sehen? Laden Sie meinen Lebenslauf herunter, um meinen Hintergrund und meine Motivation zu entdecken.',
      download: 'Lebenslauf Herunterladen'
    },
    contact: {
      title: 'Kontakt',
      name_placeholder: 'Ihr Name',
      email_placeholder: 'Ihre E-Mail',
      message_placeholder: 'Wie kann ich helfen?',
      send: 'Nachricht Senden'
    },
    seo: {
      title: 'Mustafa Altas | Motivierter Technologie-Enthusiast',
      description: 'Portfolio von Mustafa Altas, einem hochmotivierten Entwickler mit Leidenschaft für kontinuierliches Lernen.'
    },
    ai: {
      chat_trigger: 'Chat mit KI',
      intro: "Hallo! Ich bin Mustafas KI-Assistent. Fragen Sie mich alles über seine Fähigkeiten, Erfahrungen oder Projekte!",
      placeholder: 'Nachricht eingeben...',
      disclaimer: 'KI kann Fehler machen. Bitte überprüfen Sie wichtige Infos.'
    }
  }
};

export const SKILLS_DATA: SkillData[] = [
  { subject: 'React/Next.js', A: 120, fullMark: 150 },
  { subject: 'Quick Learning', A: 150, fullMark: 150 },
  { subject: 'Adaptability', A: 140, fullMark: 150 },
  { subject: 'Problem Solving', A: 130, fullMark: 150 },
  { subject: 'Teamwork', A: 135, fullMark: 150 },
  { subject: 'Motivation', A: 150, fullMark: 150 },
];

const dummyContent = [
    "In the rapidly evolving landscape of web development, staying ahead of the curve is not just an advantage; it's a necessity. This article explores the fundamental shifts in how we build and deploy applications today.",
    "One of the most significant changes has been the move towards component-based architectures. React, Vue, and Angular have revolutionized the way we think about user interfaces. But it's not just about the libraries; it's about the mindset.",
    "Performance optimization is another critical area. With Core Web Vitals becoming a ranking factor, developers must prioritize loading speeds, interactivity, and visual stability. We'll discuss techniques like code splitting, lazy loading, and server-side rendering.",
    "Finally, we cannot ignore the importance of accessibility. Building inclusive web experiences ensures that everyone, regardless of their abilities, can interact with your content. This is not just a moral obligation but often a legal one as well."
];

export const BLOG_DATA: BlogPost[] = [
    {
        id: '1',
        title: "Understanding React Server Components",
        excerpt: "A deep dive into how Server Components change the data fetching paradigm and improve performance.",
        content: dummyContent,
        date: "March 15, 2024",
        readTime: "5 min read",
        category: "Frontend",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: '2',
        title: "The Art of Clean Code",
        excerpt: "Why readability matters more than cleverness. Best practices for scalable codebases.",
        content: dummyContent,
        date: "February 28, 2024",
        readTime: "7 min read",
        category: "Engineering",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: '3',
        title: "Microservices vs Monolith",
        excerpt: "Analyzing trade-offs between architectural styles. When to switch to microservices?",
        content: dummyContent,
        date: "January 10, 2024",
        readTime: "6 min read",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: '4',
        title: "Next.js 14 Features You Should Know",
        excerpt: "Exploring the latest updates in Next.js 14 including Turbopack and improved routing.",
        content: dummyContent,
        date: "December 05, 2023",
        readTime: "4 min read",
        category: "Frontend",
        image: "https://images.unsplash.com/photo-1618477247222-ac5913054c90?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: '5',
        title: "Mastering TypeScript Generics",
        excerpt: "A practical guide to using Generics in TypeScript to create reusable components.",
        content: dummyContent,
        date: "November 20, 2023",
        readTime: "8 min read",
        category: "Development",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: '6',
        title: "CSS Grid vs Flexbox",
        excerpt: "When to use Grid and when to use Flexbox. A comprehensive comparison.",
        content: dummyContent,
        date: "November 10, 2023",
        readTime: "5 min read",
        category: "Design",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: '7',
        title: "State Management in 2024",
        excerpt: "Redux, Zustand, Recoil, or Context? Choosing the right state manager.",
        content: dummyContent,
        date: "October 25, 2023",
        readTime: "6 min read",
        category: "React",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: '8',
        title: "Optimizing Web Performance",
        excerpt: "Techniques to improve your Core Web Vitals and user experience.",
        content: dummyContent,
        date: "October 05, 2023",
        readTime: "7 min read",
        category: "Performance",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: '9',
        title: "Introduction to Docker",
        excerpt: "Containerization basics for frontend developers.",
        content: dummyContent,
        date: "September 15, 2023",
        readTime: "5 min read",
        category: "DevOps",
        image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: '10',
        title: "The Future of AI in Coding",
        excerpt: "How tools like Copilot and Gemini are changing the developer workflow.",
        content: dummyContent,
        date: "September 01, 2023",
        readTime: "6 min read",
        category: "AI",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: '11',
        title: "Building Accessible Web Apps",
        excerpt: "Why a11y matters and how to implement it in React.",
        content: dummyContent,
        date: "August 20, 2023",
        readTime: "5 min read",
        category: "Accessibility",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: '12',
        title: "Effective Git Workflows",
        excerpt: "Branching strategies and best practices for team collaboration.",
        content: dummyContent,
        date: "August 10, 2023",
        readTime: "4 min read",
        category: "Workflow",
        image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&q=80&w=800",
    }
];