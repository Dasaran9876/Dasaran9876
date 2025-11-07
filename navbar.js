class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 6px -1px rgba(8, 231, 157, 1);
          padding;:6px;
        }
          .app_name{
          font-family:fantasy;
          }
        .logo {
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
        }
        .logo i {
          margin-right: 0.5rem;
        }
        ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        a {
          color: white;
          text-decoration: none;
          transition: opacity 0.2s;
          font-weight: 500;
          display: flex;
          align-items: center;
        }
        a:hover {
          opacity: 0.8;
        }
        a i {
          margin-right: 0.25rem;
          width: 18px;
          height: 18px;
        }
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            padding: 1rem;
          }
          ul {
            margin-top: 1rem;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      </style>
      <nav>
        <div class="logo">
          <i data-feather="book-open"></i>
          <span data-lang-key="app_name"><b>NeXusSpArK</b></span>
        </div>
        <ul>
          <li><a href="/"><i data-feather="home"></i> <span data-lang-key="home">Գլխավոր</span></a></li>
          <li><a href="#schedule"><i data-feather="calendar"></i> <span data-lang-key="schedule">Ai</span></a></li>
          <li><a href="#tests"><i data-feather="clipboard"></i> <span data-lang-key="tests">Դասեր</span></a></li>
          <li><a href="#games"><i data-feather="gamepad"></i> <span data-lang-key="games">Gaming</span></a></li>
          <li><a href="#ai"><i data-feather="cpu"></i> <span data-lang-key="Tests"></span></a></li>
        </ul>
      </nav>
    `;
    
    // Add translations for navbar items
    this.translations = {
      hy: {
        app_name: "NeXusSpArK",
        home: "Գլխավոր",
        ai: "Ai",
        schedule: "Դասեր",
        games: "Gaming",
        tests: "Tests"
      },
      ka: {
        app_name: "NeXusSpArK",
        home: "მთავარი",
        ai: "Ai",
        schedule: "განრიგი",
        games: "თამაშები",
        tests: "ტესტები"
      },
      ru: {
        app_name: "NeXusSpArK",
        home: "Главная",
        ai: "Ai",
        schedule: "Расписание",
        games: "Игры",
       tests: "Тесты"
      },
      en: {
        app_name: "NeXusSpArK",
        home: "Home",
        ai: "Ai",
        schedule: "Schedule",
        games: "Games",
        tests: "Tests"
      }
    };
    
    // Watch for language changes
    document.addEventListener('languageChanged', (e) => {
      this.updateLanguage(e.detail.lang);
    });
  }
  
  updateLanguage(lang) {
    const shadow = this.shadowRoot;
    if (shadow) {
      shadow.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (this.translations[lang] && this.translations[lang][key]) {
          element.textContent = this.translations[lang][key];
        }
      });
    }
  }
}

customElements.define('custom-navbar', CustomNavbar);