import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // varsa son seçimi hatırla
    const saved = localStorage.getItem('theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  /* === (Sadece bu buton için) stil tanımı === */
  const toggleStyles = `
  .theme-toggle {
    position: relative; width: 74px; height: 38px; border-radius: 999px;
    background: rgba(15, 31, 45, 0.95);
    border: 1px solid rgba(255,255,255,.08);
    box-shadow: inset 0 0 0 2px rgba(255,255,255,.03), 0 6px 18px rgba(0,0,0,.25);
    display: inline-flex; align-items: center; justify-content: center;
    padding: 0; cursor: pointer; outline: none; user-select: none;
  }
  .theme-toggle:focus-visible { box-shadow: 0 0 0 3px rgba(139,92,246,.35); }
  .tt-track {
    position:absolute; inset: 0; border-radius: inherit; overflow: hidden;
  }
  .tt-icons {
    position:absolute; inset: 0; display:flex; align-items:center; justify-content:space-between;
    padding: 0 12px; pointer-events:none; opacity:.9;
  }
  .tt-icon { display:grid; place-items:center; width:18px; height:18px; }
  .tt-icon svg { width:100%; height:100%; }
  .tt-moon svg { fill: #dde7f3; }
  .tt-sun  svg { fill: #ffd566; }
  .tt-knob {
    position:absolute; top: 4px; left: 4px; width: 30px; height: 30px; border-radius: 999px;
    background: linear-gradient(180deg, #c9c9c9, #a9a9a9);
    border: 1px solid rgba(0,0,0,.25);
    box-shadow: 0 3px 8px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.6);
    transition: transform .28s cubic-bezier(.4,0,.2,1);
    will-change: transform;
  }
  .theme-toggle.light .tt-knob { transform: translateX(36px); }
  .theme-toggle.dark  .tt-knob { transform: translateX(0px); }

  /* açık temada arka planı da biraz aç */
  body.light-theme .theme-toggle {
    background: rgba(235, 242, 248, 0.95);
    border-color: rgba(0,0,0,.06);
    box-shadow: inset 0 0 0 2px rgba(0,0,0,.03), 0 6px 18px rgba(0,0,0,.1);
  }
  `;

  // Body class + localStorage
  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme === 'light' ? 'light-theme' : 'dark-theme');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Scroll aktif section takibi
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const h = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + h) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Projeler
  const projects = [
    {
      title: "Kişisel Blog Sitesi",
      description: "React ve Node.js kullanarak geliştirdiğim responsive blog platformu. Modern tasarım ve kullanıcı dostu arayüz.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b1d6?w=600&h=400&fit=crop",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      github: "#", live: "#", status: "Tamamlandı"
    },
    {
      title: "Todo List Uygulaması",
      description: "Local storage kullanarak veri saklayan, drag & drop özellikli görev yönetimi uygulaması.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
      tech: ["JavaScript", "HTML5", "CSS3", "Local Storage"],
      github: "#", live: "#", status: "Tamamlandı"
    },
    {
      title: "Hava Durumu Uygulaması",
      description: "API entegrasyonu ile gerçek zamanlı hava durumu bilgilerini gösteren responsive web uygulaması.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      tech: ["Vue.js", "API Integration", "CSS Grid"],
      github: "#", live: "#", status: "Geliştiriliyor"
    }
  ];

  // Yetenekler
  const skills = [
    { name: "JavaScript", level: 85, icon: "💻", category: "Frontend" },
    { name: "React", level: 80, icon: "⚛️", category: "Frontend" },
    { name: "HTML/CSS", level: 90, icon: "🎨", category: "Frontend" },
    { name: "Node.js", level: 70, icon: "🟢", category: "Backend" },
    { name: "Python", level: 75, icon: "🐍", category: "Programming" },
    { name: "Git/GitHub", level: 85, icon: "📁", category: "Tools" }
  ];

  return (
    <>
      {/* buton stili */}
      <style>{toggleStyles}</style>

      {/* === Dinamik Arka Plan === */}
      <div className="dynamic-bg" aria-hidden>
        <div className="particle-field">
          <span className="particle particle-0" />
          <span className="particle particle-1" />
          <span className="particle particle-2" />
          <span className="particle particle-3" />
          <span className="particle particle-4" />
        </div>
        <div className="gradient-orbs">
          <span className="orb orb-1" />
          <span className="orb orb-2" />
          <span className="orb orb-3" />
        </div>
      </div>

      {/* === Navbar === */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-gradient">Doğa Ata Demir</span>
          </div>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {['home', 'about', 'education', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`nav-link ${activeSection === item ? 'active' : ''}`}
              >
                {item === 'home' ? 'Ana Sayfa'
                  : item === 'about' ? 'Hakkımda'
                  : item === 'education' ? 'Eğitim'
                  : item === 'skills' ? 'Yetenekler'
                  : item === 'projects' ? 'Projeler' : 'İletişim'}
              </button>
            ))}
          </div>

          {/* === Tema Geçiş Butonu (ikonlu & kayan knob) === */}
         <button
  className={`theme-toggle ${theme}`}
  onClick={toggleTheme}
  aria-label="Tema değiştir"
  title={theme === 'light' ? 'Koyu temaya geç' : 'Açık temaya geç'}
  style={{ marginLeft: '12px' }}
>
  {/* Sol tarafta güneş */}
  <span className="tt-emoji left">☀️</span>

  {/* Ortadaki knob */}
  <span className="tt-knob"></span>

  {/* Sağ tarafta ay */}
  <span className="tt-emoji right">🌙</span>
</button>



          {/* Mobil menü */}
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* === İçerik === */}
      <main>
        {/* Hero */}
        <section id="home" className="hero">
          <div className="hero-bg">
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
              <div className="shape shape-5"></div>
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="title-line">Ben</span>
                <span className="title-line hero-name">Doğa Ata Demir</span>
                <span className="title-line">Bilgisayar Mühendisi</span>
              </h1>
              <p className="hero-description">
                Yeni mezun bir bilgisayar mühendisi olarak, modern web teknolojileri ile
                yaratıcı projeler geliştirmeye tutkulu biriyim. Öğrenmeye açık, enerjik
                ve kod yazmayı seven biri olarak kariyerime yeni başlıyorum! 🚀
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                  Projelerimi İncele ✨
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                  Benimle İletişime Geç 📧
                </button>
              </div>
              <div className="hero-status"></div>
            </div>

            <div className="hero-image">
              <div className="image-container">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                  alt="Profile"
                  className="profile-img"
                />
                <div className="image-decoration"></div>
              </div>
            </div>
          </div>

          <button className="scroll-indicator" onClick={() => scrollToSection('about')}>
            <div className="scroll-icon">↓</div>
          </button>
        </section>

        {/* About */}
        <section id="about" className="about">
          <div className="container">
            <h2 className="section-title">Hakkımda 🙋‍♂️</h2>
            <div className="about-content">
              <div className="about-text">
                <p>
                  Merhabalar! Ben Ata, 2025 yılında bilgisayar mühendisliği bölümünden
                  mezun oldum. Üniversite yıllarımda web geliştirme konularına odaklandım
                  ve bu alanda kendimi geliştirmeye devam ediyorum.
                </p>
                <p>
                  Kod yazmayı, problem çözmeyi ve yeni teknolojiler öğrenmeyi seviyorum.
                  Özellikle frontend geliştirme ve kullanıcı deneyimi konularına ilgi duyuyorum.
                  Takım çalışmasına açık, öğrenmeye hevesli ve kariyerime heyecanla başlamak
                  istiyorum! 💪
                </p>
                <div className="personality-traits">
                  <div className="trait"><span className="trait-icon">🎯</span><span>Hedef odaklı</span></div>
                  <div className="trait"><span className="trait-icon">🤝</span><span>Takım oyuncusu</span></div>
                  <div className="trait"><span className="trait-icon">📚</span><span>Sürekli öğrenen</span></div>
                  <div className="trait"><span className="trait-icon">⚡</span><span>Hızlı adapte olan</span></div>
                </div>
              </div>
             
            </div>
          </div>
        </section>

        {/* Eğitim */}
        <section id="education" className="education section">
          <h2 className="section-title">Eğitim</h2>
          <div className="education-timeline">
            <div className="timeline-item">
              <div className="timeline-marker"><div className="marker-inner"></div></div>
              <div className="timeline-content">
                <div className="education-card">
                  <div className="card-header">
                    <div>
                      <h3 className="education-degree">Lisans | Bilgisayar Mühendisliği</h3>
                      <h4 className="education-school">TED Üniversitesi</h4>
                    </div>
                    <div className="education-meta">
                      <span className="education-year">2020 – 2025</span>
                    </div>
                  </div>
                  <p className="education-description">
                    Algoritmalar, yazılım geliştirme, yapay zeka ve modern mühendislik
                    yaklaşımları üzerine yoğunlaştım. Takım projeleri ve araştırmalarla
                    analitik düşünme ve problem çözme becerilerimi geliştirdim.
                  </p>
                  <div className="education-achievements">
                    <span className="achievement-tag">C++ &amp; Python</span>
                    <span className="achievement-tag">Yapay Zeka</span>
                    <span className="achievement-tag">Web Geliştirme</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"><div className="marker-inner"></div></div>
              <div className="timeline-content">
                <div className="education-card">
                  <div className="card-header">
                    <div>
                      <h3 className="education-degree">Ek Dal | İşletme</h3>
                      <h4 className="education-school">TED Üniversitesi</h4>
                    </div>
                    <div className="education-meta">
                      <span className="education-year">2023 – 2025</span>
                    </div>
                  </div>
                  <p className="education-description">
                    Yönetim, pazarlama ve finans temellerini bilgisayar mühendisliğiyle
                    birleştirerek teknik bilgiye iş perspektifi kazandırdım.
                  </p>
                  <div className="education-achievements">
                    <span className="achievement-tag">Yönetim</span>
                    <span className="achievement-tag">Finans</span>
                    <span className="achievement-tag">Pazarlama</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Yetenekler */}
        <section id="skills" className="skills">
          <div className="container">
            <h2 className="section-title">Yeteneklerim 💪</h2>
            <div className="skills-intro">
              <p>Öğrenci hayatımda edindiğim ve sürekli geliştirmeye devam ettiğim yeteneklerim:</p>
            </div>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-card">
                  <div className="skill-header">
                    <div className="skill-icon"><span>{skill.icon}</span></div>
                    <div className="skill-info">
                      <h3 className="skill-name">{skill.name}</h3>
                      <span className="skill-category">{skill.category}</span>
                    </div>
                  </div>
                  <div className="skill-progress">
                    <div className="skill-progress-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
              ))}
            </div>
            <div className="skills-note">
              <p>🚀 Sürekli öğrenmeye devam ediyorum ve yeni teknolojiler deniyorum!</p>
            </div>
          </div>
        </section>

        {/* Projeler */}
        <section id="projects" className="projects">
          <div className="container">
            <h2 className="section-title">Projelerim 🚀</h2>
            <div className="projects-intro">
              <p>Üniversite döneminde ve kendi başıma geliştirdiğim projeler:</p>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-status">
                    <span className={`status-badge ${project.status === 'Tamamlandı' ? 'completed' : 'in-progress'}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <div className="project-links">
                        <a href={project.github} className="project-link"><span>📁</span><span>GitHub</span></a>
                        <a href={project.live} className="project-link"><span>🔗</span><span>Canlı</span></a>
                      </div>
                    </div>
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* İletişim */}
        <section id="contact" className="contact">
          <div className="container">
            <h2 className="section-title">İletişim 📞</h2>
            <div className="contact-content">
              <div className="contact-info">
                <h3>Birlikte Çalışalım! 🤝</h3>
                <p>
                  Yeni mezun bir yazılımcı olarak, kariyerime başlamak için harika
                  fırsatlar arıyorum. Eğer ekibinize enerjik ve öğrenmeye açık
                  bir geliştirici arıyorsanız, benimle iletişime geçin!
                </p>
                <div className="contact-highlight">
                  <span>💡</span>
                  <p>Junior pozisyonlar, staj fırsatları veya freelance projeler için uygunum!</p>
                </div>
                <div className="contact-methods">
                  <a href="mailto:dogaatademir@gmail.com" className="contact-method">
                    <span>📧</span>
                    <div><strong>E-posta: </strong><span>dogaatademir@gmail.com</span></div>
                  </a>
                  <a href="https://linkedin.com/in/dogaatademir" className="contact-method">
                    <span>💼</span>
                    <div><strong>LinkedIn: </strong><span>/in/dogaatademir</span></div>
                  </a>
                  <a href="https://github.com/dogaatademir" className="contact-method">
                    <span>📁</span>
                    <div><strong>GitHub: </strong><span>/dogaatademir</span></div>
                  </a>
                </div>
              </div>

              <div className="contact-form">
                <div className="form-header">
                  <h4>Hızlı Mesaj Gönderin 💌</h4>
                  <p>Size 24 saat içinde dönüş yapacağım!</p>
                </div>
                <div className="form-group">
                  <label>Adınız</label>
                  <input type="text" placeholder="Adınızı yazın..." className="form-input" />
                </div>
                <div className="form-group">
                  <label>E-posta Adresiniz</label>
                  <input type="email" placeholder="ornek@email.com" className="form-input" />
                </div>
                <div className="form-group">
                  <label>Mesajınız</label>
                  <textarea placeholder="Merhaba Ata, seninle tanışmak isterim..." className="form-textarea" rows={4}></textarea>
                </div>
                <button className="btn btn-primary full-width">Mesajı Gönder 🚀</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2025 | Doğa Ata Demir </p>
            <p className="footer-motto">💻 Kodlayarak öğreniyorum, öğrenerek büyüyorum! 🌱</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
