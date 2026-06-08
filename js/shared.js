// ── Devashri Builders — Shared UI & Logic ──

// Initialize language state
window.currentLang = localStorage.getItem('preferredLang') || 'en';

document.addEventListener('DOMContentLoaded', () => {
  // Translate static page elements first
  if (typeof window.translateStaticHtml === 'function') {
    window.translateStaticHtml(window.currentLang);
  }

  renderNavbar();
  renderFooter();
  renderWhatsAppButton();
  renderLeadModal();
  setupGlobalModalTriggers();
  setupScrollAnimations();
});

// Function to switch languages globally
window.switchLanguage = function(lang) {
  window.currentLang = lang;
  localStorage.setItem('preferredLang', lang);

  // Translate static page elements
  if (typeof window.translateStaticHtml === 'function') {
    window.translateStaticHtml(lang);
  }

  // Re-render shared components
  renderNavbar();
  renderFooter();
  renderWhatsAppButton();
  renderLeadModal();

  // Re-render dynamic components on specific pages if their controllers exist
  if (typeof renderFeaturedPlots === 'function') renderFeaturedPlots();
  if (typeof renderOngoingProjectsTeaser === 'function') renderOngoingProjectsTeaser();
  if (typeof renderLatestBlogsTeaser === 'function') renderLatestBlogsTeaser();
  
  if (typeof renderPlotsList === 'function') renderPlotsList();
  if (typeof populateFilterOptions === 'function') populateFilterOptions();
  
  if (typeof renderProjectsList === 'function') renderProjectsList();
  if (typeof setupProjectsFilterButtons === 'function') setupProjectsFilterButtons();
  
  if (typeof renderFeaturedPost === 'function') renderFeaturedPost();
  if (typeof renderBlogCategories === 'function') renderBlogCategories();
  if (typeof renderBlogList === 'function') renderBlogList();
};

// 1. Render Navbar
function renderNavbar() {
  const navbarContainer = document.getElementById('navbar');
  if (!navbarContainer) return;

  const currentPath = window.location.pathname;
  const isHomeName = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';
  
  // Navigation Links configuration
  const navLinks = [
    { label: window.getTranslation('nav_home'), href: 'index.html', key: 'index.html' },
    { label: window.getTranslation('nav_projects'), href: 'projects.html', key: 'projects.html' },
    { label: window.getTranslation('nav_about'), href: 'about.html', key: 'about.html' },
    { label: window.getTranslation('nav_contact'), href: 'contact.html', key: 'contact.html' },
  ];

  // Check which page is currently active
  const activeLink = navLinks.find(link => {
    if (link.key === 'index.html' && isHomeName) return true;
    return currentPath.includes(link.key);
  });

  const activeHref = activeLink ? activeLink.href : '';

  const buildNavbar = (isTransparent) => {
    const textThemeClass = isTransparent ? 'text-white' : 'text-slate-900';
    const subThemeClass = isTransparent ? 'text-forest-200' : 'text-forest-600';
    const bgThemeClass = isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100';
    
    // Logo SVG & text
    const logoHtml = `
      <a href="index.html" class="flex items-center gap-3 group">
        <svg viewBox="0 0 100 100" class="w-11 h-11 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logo-top" x1="15" y1="20" x2="50" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#F1E3D3" />
              <stop offset="100%" stop-color="#C7A384" />
            </linearGradient>
            <linearGradient id="logo-left" x1="15" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#C69C7E" />
              <stop offset="100%" stop-color="#A27A5C" />
            </linearGradient>
            <linearGradient id="logo-right" x1="85" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#966A4D" />
              <stop offset="100%" stop-color="#67442D" />
            </linearGradient>
          </defs>
          <polygon points="15,20 85,20 50,45" fill="url(#logo-top)" />
          <polygon points="15,20 50,45 50,80" fill="url(#logo-left)" />
          <polygon points="85,20 50,45 50,80" fill="url(#logo-right)" />
        </svg>
        <div class="flex flex-col leading-none">
          <span class="font-accent font-bold text-[19px] tracking-wide uppercase transition-colors duration-200 ${isTransparent ? 'text-white' : 'text-slate-900'}">Devashri</span>
          <span class="font-accent text-[14px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 mt-1 ${isTransparent ? 'text-white/90' : 'text-forest-600'}">Builders</span>
        </div>
      </a>
    `;

    // Nav Items HTML
    const navItemsHtml = navLinks.map(link => {
      const isActive = activeHref === link.href;
      let activeTextClass = '';
      if (isActive) {
        activeTextClass = isTransparent ? 'text-white active' : 'text-forest-600 active';
      } else {
        activeTextClass = isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-forest-600';
      }
      return `<a href="${link.href}" class="nav-link relative px-4 py-2 font-accent font-medium text-sm rounded-md transition-colors duration-200 ${activeTextClass}">${link.label}</a>`;
    }).join('');

    const phoneClass = isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-forest-600';

    // Language Toggle Switch
    const toggleBgClass = isTransparent ? 'bg-white/15 border-white/20' : 'bg-slate-100 border-slate-200';
    const activeTextClassEN = window.currentLang === 'en' 
      ? (isTransparent ? 'bg-white text-slate-900 font-semibold' : 'bg-forest-600 text-white font-semibold')
      : (isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-500 hover:text-slate-900');
    const activeTextClassHI = window.currentLang === 'hi' 
      ? (isTransparent ? 'bg-white text-slate-900 font-semibold' : 'bg-forest-600 text-white font-semibold')
      : (isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-500 hover:text-slate-900');

    const langToggleHtml = `
      <div class="flex items-center border rounded-full p-0.5 text-[11px] font-accent ${toggleBgClass} select-none">
        <button onclick="window.switchLanguage('en')" class="px-2 py-0.5 rounded-full transition-all duration-200 focus:outline-none ${activeTextClassEN}">EN</button>
        <button onclick="window.switchLanguage('hi')" class="px-2 py-0.5 rounded-full transition-all duration-200 focus:outline-none ${activeTextClassHI}">हिन्दी</button>
      </div>
    `;

    return `
      <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgThemeClass}">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 md:h-20">
            <!-- Logo -->
            ${logoHtml}

            <!-- Desktop Nav -->
            <nav class="hidden md:flex items-center gap-1">
              ${navItemsHtml}
            </nav>

            <!-- CTA + Language Toggle + Mobile Toggle -->
            <div class="flex items-center gap-3">
              ${langToggleHtml}
              <a href="tel:+917752957897" class="hidden lg:flex items-center gap-1.5 font-accent text-sm font-semibold transition-colors ${phoneClass}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>77529 57897</span>
              </a>
              <a href="projects.html" class="hidden md:inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-white font-accent font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow">
                ${window.getTranslation('nav_view_projects')}
              </a>
              <button id="mobile-nav-toggle" class="md:hidden p-2 rounded-md transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'}" aria-label="Toggle menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 nav-menu-icon"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Container -->
        <div id="mobile-menu" class="hidden md:hidden transition-all duration-300 overflow-hidden max-h-0 opacity-0">
          <div class="bg-white border-t border-slate-100 px-4 py-3 space-y-1 shadow-lg">
            ${navLinks.map(link => {
              const isActive = activeHref === link.href;
              const activeMobileClass = isActive ? 'bg-forest-50 text-forest-700' : 'text-slate-700 hover:bg-slate-50 hover:text-forest-600';
              return `<a href="${link.href}" class="block px-4 py-3 font-accent font-medium text-sm rounded-lg transition-colors ${activeMobileClass}">${link.label}</a>`;
            }).join('')}
            <div class="pt-2 pb-1 flex items-center gap-3 border-t border-slate-100">
              <a href="tel:+917752957897" class="flex items-center gap-2 text-slate-700 font-accent font-medium text-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5 text-forest-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                77529 57897
              </a>
            </div>
          </div>
        </div>
      </header>
    `;
  };

  // Initial render (transparent if home page, white otherwise)
  let isTransparent = isHomeName;
  navbarContainer.innerHTML = buildNavbar(isTransparent);

  // Handle Home page scroll event to switch transparency
  if (isHomeName) {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled === isTransparent) {
        isTransparent = !scrolled;
        navbarContainer.innerHTML = buildNavbar(isTransparent);
        bindMenuToggle(); // Rebind toggle listeners after HTML change
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Bind menu toggling logic
  function bindMenuToggle() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!toggleBtn || !mobileMenu) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        // Close menu
        mobileMenu.style.maxHeight = '0px';
        mobileMenu.style.opacity = '0';
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 300);
        toggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 nav-menu-icon"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        `;
      } else {
        // Open menu
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.maxHeight = '500px';
        mobileMenu.style.opacity = '1';
        toggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 nav-menu-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        `;
      }
    });
  }

  bindMenuToggle();
}

// 2. Render Footer
function renderFooter() {
  const footerContainer = document.getElementById('footer');
  if (!footerContainer) return;

  const currentPath = window.location.pathname;
  const isHi = window.currentLang === 'hi';
  const alertSuccessMsg = isHi ? 'सफलतापूर्वक सब्सक्राइब किया गया!' : 'Subscribed successfully!';

  footerContainer.innerHTML = `
    <footer class="bg-slate-900 text-slate-300">
      <!-- Newsletter Bar -->
      <div class="bg-forest-700 py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p class="text-xs font-accent font-semibold tracking-widest uppercase text-forest-200 mb-1">${window.getTranslation('footer_stay_informed')}</p>
              <h3 class="font-heading text-2xl font-bold text-white">${window.getTranslation('footer_alert_sub')}</h3>
            </div>
            <form class="flex gap-2 w-full md:w-auto min-w-[320px]" onsubmit="event.preventDefault(); alert('${alertSuccessMsg}'); this.reset();">
              <input type="email" placeholder="${window.getTranslation('footer_email_placeholder')}" required class="flex-1 px-4 py-3 rounded-lg bg-forest-800/60 border border-forest-600 text-white placeholder-forest-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/40" />
              <button type="submit" class="px-5 py-3 bg-earth-500 hover:bg-earth-600 text-white font-accent font-semibold text-sm rounded-lg transition-colors whitespace-nowrap">${window.getTranslation('footer_subscribe')}</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Main Footer -->
      <div class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <!-- Brand -->
            <div class="lg:col-span-1">
              <a href="index.html" class="flex items-center gap-3 mb-4">
                <svg viewBox="0 0 100 100" class="w-11 h-11 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logo-top" x1="15" y1="20" x2="50" y2="45" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stop-color="#F1E3D3" />
                      <stop offset="100%" stop-color="#C7A384" />
                    </linearGradient>
                    <linearGradient id="logo-left" x1="15" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stop-color="#C69C7E" />
                      <stop offset="100%" stop-color="#A27A5C" />
                    </linearGradient>
                    <linearGradient id="logo-right" x1="85" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stop-color="#966A4D" />
                      <stop offset="100%" stop-color="#67442D" />
                    </linearGradient>
                  </defs>
                  <polygon points="15,20 85,20 50,45" fill="url(#logo-top)" />
                  <polygon points="15,20 50,45 50,80" fill="url(#logo-left)" />
                  <polygon points="85,20 50,45 50,80" fill="url(#logo-right)" />
                </svg>
                <div class="flex flex-col leading-none">
                  <span class="font-heading font-bold text-xl text-white block">Devashri</span>
                  <span class="font-accent text-sm font-medium text-forest-400 mt-1">Builders</span>
                </div>
              </a>
              <p class="text-sm text-slate-400 leading-relaxed mb-5">
                ${window.getTranslation('footer_brand_desc')}
              </p>
              <div class="flex items-center gap-3">
                <a href="#" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-forest-600 flex items-center justify-center transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-forest-600 flex items-center justify-center transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-forest-600 flex items-center justify-center transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="lg:col-span-1">
              <h4 class="font-accent font-semibold text-white text-sm tracking-wide mb-4">${window.getTranslation('footer_quick_links')}</h4>
              <ul class="space-y-2.5">
                <li><a href="projects.html" class="text-sm text-slate-400 hover:text-forest-400 transition-colors">${window.getTranslation('nav_projects')}</a></li>
                <li><a href="about.html" class="text-sm text-slate-400 hover:text-forest-400 transition-colors">${window.getTranslation('nav_about')}</a></li>
                <li><a href="contact.html" class="text-sm text-slate-400 hover:text-forest-400 transition-colors">${window.getTranslation('nav_contact')}</a></li>
                <li><a href="#" data-toggle="modal" class="text-sm text-slate-400 hover:text-forest-400 transition-colors">${window.getTranslation('hero_cta_visit')}</a></li>
              </ul>
            </div>

            <!-- Our Projects -->
            <div>
              <h4 class="font-accent font-semibold text-white text-sm tracking-wide mb-4">${window.getTranslation('footer_our_projects')}</h4>
              <ul class="space-y-2.5">
                <li><a href="projects.html?id=kashi-puram" class="text-sm text-slate-400 hover:text-forest-400 transition-colors">${isHi ? 'काशी पुरम ग्रीन सिटी' : 'Kashi Puram Green City'}</a></li>
                <li><a href="projects.html?id=vinayak-puram" class="text-sm text-slate-400 hover:text-forest-400 transition-colors">${isHi ? 'विनायक पुरम सोसाइटी' : 'Vinayak Puram Society'}</a></li>
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h4 class="font-accent font-semibold text-white text-sm tracking-wide mb-4">${window.getTranslation('footer_get_in_touch')}</h4>
              <ul class="space-y-4">
                <li class="flex gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-forest-400 flex-shrink-0 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span class="text-sm text-slate-400">${window.getTranslation('footer_address')}</span>
                </li>
                <li>
                  <a href="tel:+917752957897" class="flex gap-3 text-slate-400 hover:text-forest-400 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-forest-400 flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span class="text-sm">+91 77529 57897</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@bhoomiseva.com" class="flex gap-3 text-slate-400 hover:text-forest-400 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-forest-400 flex-shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <span class="text-sm">info@bhoomiseva.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-slate-800 py-5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-slate-500">&copy; ${new Date().getFullYear()} Devashri Builders Plots & Land. ${isHi ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</p>
          <div class="flex items-center gap-4 text-xs text-slate-500">
            <a href="about.html" class="hover:text-slate-400 transition-colors">${window.getTranslation('footer_privacy')}</a>
            <span>·</span>
            <a href="about.html" class="hover:text-slate-400 transition-colors">${window.getTranslation('footer_terms')}</a>
            <span>·</span>
            <span>${window.getTranslation('footer_legal_docs')}</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// 3. Render WhatsApp Button
function renderWhatsAppButton() {
  const waContainer = document.getElementById('whatsapp-btn');
  if (!waContainer) return;

  const isHi = window.currentLang === 'hi';
  const waText = isHi 
    ? "नमस्ते देवश्री बिल्डर्स, मैं आपके प्लॉट्स में रुचि रखता हूँ। कृपया विवरण साझा करें।" 
    : "Hi Devashri Builders, I'm interested in your plots. Please share details.";

  waContainer.innerHTML = `
    <a href="https://wa.me/917752957897?text=${encodeURIComponent(waText)}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20bc5a] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 text-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  `;
}

// 4. Render Lead Modal
function renderLeadModal() {
  const modalContainer = document.getElementById('lead-modal');
  if (!modalContainer) return;

  const isHi = window.currentLang === 'hi';
  const submitText = isHi ? 'सबमिट किया जा रहा है...' : 'Submitting...';

  modalContainer.innerHTML = `
    <div id="modal-overlay" class="fixed inset-0 z-[100] flex items-center justify-center p-4 hidden">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm modal-close-trigger"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform scale-95 opacity-0 transition-all duration-300" id="modal-content">
        <!-- Header -->
        <div class="bg-forest-700 px-6 py-5">
          <button class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors modal-close-trigger">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <p class="text-forest-200 text-xs font-accent font-semibold tracking-widest uppercase mb-1">${window.getTranslation('modal_free_consult')}</p>
          <h2 class="font-heading text-xl font-bold text-white" id="modal-title">${window.getTranslation('modal_title')}</h2>
          <p class="text-forest-300 text-sm mt-1 hidden" id="modal-subtitle"></p>
        </div>

        <div class="p-6">
          <!-- Form State -->
          <form id="modal-lead-form" class="space-y-4">
            <div>
              <label class="block text-sm font-accent font-medium text-slate-700 mb-1.5">${window.getTranslation('modal_label_name')}</label>
              <input type="text" required placeholder="${window.getTranslation('modal_placeholder_name')}" class="input-field" id="modal-name-input" />
            </div>
            <div>
              <label class="block text-sm font-accent font-medium text-slate-700 mb-1.5">${window.getTranslation('modal_label_phone')}</label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">+91</span>
                <input type="tel" required placeholder="${window.getTranslation('modal_placeholder_phone')}" class="input-field pl-12" maxlength="10" id="modal-phone-input" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-accent font-medium text-slate-700 mb-1.5">${window.getTranslation('modal_label_date')}</label>
              <input type="date" class="input-field" id="modal-date-input" />
            </div>
            <div>
              <label class="block text-sm font-accent font-medium text-slate-700 mb-1.5">${window.getTranslation('modal_label_msg')}</label>
              <textarea rows="2" placeholder="${window.getTranslation('modal_placeholder_msg')}" class="input-field resize-none" id="modal-msg-input"></textarea>
            </div>
            <button type="submit" class="btn-primary w-full justify-center py-3.5 text-base" id="modal-submit-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span id="modal-submit-text">${window.getTranslation('modal_submit')}</span>
            </button>
            <p class="text-center text-xs text-slate-400">${window.getTranslation('modal_privacy')}</p>
          </form>

          <!-- Success State -->
          <div id="modal-success-state" class="text-center py-6 hidden animate-fadeIn">
            <div class="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-forest-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3 class="font-heading text-xl font-bold text-slate-900 mb-2">${window.getTranslation('modal_success_title')}</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              ${window.getTranslation('modal_success_desc')}
            </p>
            <div class="flex gap-3 justify-center">
              <a href="https://wa.me/917752957897" target="_blank" class="btn-primary text-sm py-2.5">${window.getTranslation('modal_success_wa')}</a>
              <button class="btn-outline text-sm py-2.5 modal-close-trigger">${window.getTranslation('modal_success_close')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Prevent date inputs from selecting past dates
  const dateInput = document.getElementById('modal-date-input');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  // Handle Form Submission
  const form = document.getElementById('modal-lead-form');
  const successState = document.getElementById('modal-success-state');
  const submitBtn = document.getElementById('modal-submit-btn');

  if (form && successState && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        ${submitText}
      `;

      setTimeout(() => {
        form.classList.add('hidden');
        successState.classList.remove('hidden');
      }, 1000);
    });
  }

  // Bind Close triggers
  const closeTriggers = modalContainer.querySelectorAll('.modal-close-trigger');
  closeTriggers.forEach(t => t.addEventListener('click', closeLeadModal));
}

// Open Lead Modal with Custom Meta
window.openLeadModal = function(title = 'Book a Free Site Visit', subtitle = '') {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  const titleEl = document.getElementById('modal-title');
  const subtitleEl = document.getElementById('modal-subtitle');
  const form = document.getElementById('modal-lead-form');
  const successState = document.getElementById('modal-success-state');
  const submitBtn = document.getElementById('modal-submit-btn');

  if (!overlay || !content) return;

  // Set titles
  if (titleEl) titleEl.innerText = title;
  if (subtitleEl) {
    if (subtitle) {
      subtitleEl.innerText = subtitle;
      subtitleEl.classList.remove('hidden');
    } else {
      subtitleEl.classList.add('hidden');
    }
  }

  // Reset form state
  if (form) form.classList.remove('hidden');
  if (successState) successState.classList.add('hidden');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      <span>${window.getTranslation('modal_submit')}</span>
    `;
    if (form) form.reset();
  }

  // Animate in
  overlay.classList.remove('hidden');
  setTimeout(() => {
    content.classList.remove('scale-95', 'opacity-0');
    content.classList.add('scale-100', 'opacity-100');
  }, 10);
};

// Close Lead Modal
function closeLeadModal() {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  if (!overlay || !content) return;

  // Animate out
  content.classList.remove('scale-100', 'opacity-100');
  content.classList.add('scale-95', 'opacity-0');
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 300);
}

// 5. Setup global click modal triggers
function setupGlobalModalTriggers() {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-toggle="modal"]');
    if (trigger) {
      e.preventDefault();
      const titleKey = trigger.getAttribute('data-title-key') || '';
      const title = titleKey ? window.getTranslation(titleKey) : (trigger.getAttribute('data-title') || 'Book a Free Site Visit');
      const subtitle = trigger.getAttribute('data-subtitle') || '';
      window.openLeadModal(title, subtitle);
    }
  });
}

// 6. Setup scroll-triggered fade up/in animations
function setupScrollAnimations() {
  const animElements = document.querySelectorAll('.animate-on-scroll');
  if (animElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animElements.forEach(el => observer.observe(el));
}
