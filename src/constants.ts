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
        maintenance_message: 'This page is currently under maintenance.'
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
        maintenance_message: 'Şu an sayfa bakım aşamasındadır.'
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
        maintenance_message: 'Diese Seite befindet sich derzeit im Aufbau.'
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

export const BLOG_DATA: BlogPost[] = [
    {
        title: "Understanding React Server Components",
        excerpt: "A deep dive into how Server Components change the data fetching paradigm and improve performance in modern Next.js applications.",
        date: "March 15, 2024",
        readTime: "5 min read",
        category: "Frontend",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
        link: "#"
    },
    {
        title: "The Art of Clean Code",
        excerpt: "Why readability matters more than cleverness. Exploring best practices for maintaining scalable codebases in large teams.",
        date: "February 28, 2024",
        readTime: "7 min read",
        category: "Engineering",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        link: "#"
    },
    {
        title: "Microservices vs Monolith",
        excerpt: "Analyzing the trade-offs between architectural styles. When should you actually switch to microservices?",
        date: "January 10, 2024",
        readTime: "6 min read",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        link: "#"
    }
];