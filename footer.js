class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #1a202c;
          color: white;
          padding: 2rem;
          text-align: center;
          margin-top: auto;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .footer-links {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .footer-links a {
          color: white;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .footer-links a:hover {
          opacity: 0.8;
        }
        .copyright {
          font-size: 0.875rem;
          opacity: 0.8;
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="footer-links">
            <a href="#"><i data-feather="info"></i> <span data-lang-key="about">Մեր մասին</span></a>
            <a href="#"><i data-feather="mail"></i> <span data-lang-key="contact">Կապ</span></a>
            <a href="#"><i data-feather="shield"></i> <span data-lang-key="privacy">Գաղտնիություն</span></a>
          </div>
          <div class="copyright" data-lang-key="copyright">
            &copy; 2024 EduSphere. Բոլոր իրավունքները պաշտպանված են:
          </div>
        </div>
      </footer>
    `;
    
    // Add translations for footer items
    this.translations = {
      hy: {
        about: "Մեր մասին",
        contact: "Կապ",
        privacy: "Գաղտնիություն",
        copyright: "&copy; 2024 EduSphere. Բոլոր իրավունքները պաշտպանված են:"
      },
      ka: {
        about: "ჩვენს შესახებ",
        contact: "კონტაქტი",
        privacy: "კონფიდენციალურობა",
        copyright: "&copy; 2024 EduSphere. ყველა უფლება დაცულია."
      },
      ru: {
        about: "О нас",
        contact: "Контакты",
        privacy: "Конфиденциальность",
        copyright: "&copy; 2024 EduSphere. Все права защищены."
      },
      en: {
        about: "About",
        contact: "Contact",
        privacy: "Privacy",
        copyright: "&copy; 2024 EduSphere. All rights reserved."
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
          element.innerHTML = this.translations[lang][key];
        }
      });
    }
  }
}

customElements.define('custom-footer', CustomFooter);