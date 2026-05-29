// ── Devashri Builders — Plots Page Controller ──

let currentViewMode = 'grid';
let activeImageIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const plotId = urlParams.get('id');

  if (plotId) {
    // 1. Show Plot Detail View
    showPlotDetailView(plotId);
  } else {
    // 2. Show Search & Listings View
    showPlotsListingView();
  }
});

/* ==========================================================================
   PLOT DETAILS VIEW LOGIC
   ========================================================================== */

function showPlotDetailView(id) {
  const listingView = document.getElementById('plots-listing-view');
  const detailsView = document.getElementById('plot-details-view');
  
  if (listingView) listingView.classList.add('hidden');
  if (detailsView) detailsView.classList.remove('hidden');

  const plot = window.plotsData.find(p => p.id === id);
  if (!plot) {
    // Redirect to listings if plot not found
    window.location.href = 'plots.html';
    return;
  }

  // Update Breadcrumb & Document title
  const isHi = window.currentLang === 'hi';
  const name = isHi ? plot.name_hi || plot.name : plot.name;
  
  const breadcrumbName = document.getElementById('breadcrumb-plot-name');
  if (breadcrumbName) breadcrumbName.innerText = name;
  document.title = `${name} | Devashri Builders`;

  // Render detail view layout
  renderPlotDetails(plot);
  setupDetailImageCarousel(plot);
  setupDetailContactForm(plot);
}

function renderPlotDetails(plot) {
  const container = document.getElementById('plot-details-content');
  if (!container) return;

  const isHi = window.currentLang === 'hi';
  const name = isHi ? plot.name_hi || plot.name : plot.name;
  const location = isHi ? plot.location_hi || plot.location : plot.location;
  const desc = isHi ? plot.description_hi || plot.description : plot.description;
  const facing = isHi ? plot.facing_hi || plot.facing : plot.facing;
  const category = isHi ? plot.category_hi || plot.category : plot.category;

  const statusLabel = {
    available: isHi ? 'उपलब्ध' : 'Available',
    sold: isHi ? 'बिक गया' : 'Sold Out',
    reserved: isHi ? 'आरक्षित' : 'Reserved',
  }[plot.status];

  const statusClass = {
    available: 'bg-forest-100 text-forest-700',
    sold: 'bg-red-100 text-red-700',
    reserved: 'bg-amber-100 text-amber-700',
  }[plot.status];

  const featuredBadge = plot.featured ? `<div class="badge-featured absolute top-4 right-4 z-10">${isHi ? 'विशेष' : 'Featured'}</div>` : '';

  const highlights = isHi && plot.highlights_hi ? plot.highlights_hi : plot.highlights;
  const amenities = isHi && plot.amenities_hi ? plot.amenities_hi : plot.amenities;

  // Render Left Column (Gallery + Details) and Right Column (Sidebar Summary & Forms)
  container.innerHTML = `
    <div class="lg:col-span-2 space-y-6">
      <!-- Gallery Container -->
      <div class="card overflow-hidden">
        <div class="relative aspect-[16/9] bg-slate-100">
          <img id="carousel-main-img" src="${plot.images[0]}" alt="${name}" class="w-full h-full object-cover" />
          
          <!-- Prev/Next Arrows -->
          ${plot.images.length > 1 ? `
            <button id="carousel-prev" class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button id="carousel-next" class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          ` : ''}

          <!-- Pagination dots -->
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" id="carousel-dots-container">
            ${plot.images.map((_, i) => `
              <button class="carousel-dot-btn w-2 h-2 rounded-full transition-all ${i === 0 ? 'bg-white w-5' : 'bg-white/50'}" data-index="${i}"></button>
            `).join('')}
          </div>

          <div class="absolute top-4 left-4 text-xs font-accent font-semibold px-3 py-1.5 rounded-full ${statusClass} z-10">
            ${statusLabel}
          </div>
          ${featuredBadge}
        </div>

        <!-- Thumbnails -->
        ${plot.images.length > 1 ? `
          <div class="flex gap-2 p-4 overflow-x-auto" id="carousel-thumbnails">
            ${plot.images.map((img, i) => `
              <button class="carousel-thumb-btn flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === 0 ? 'border-forest-500' : 'border-transparent opacity-60 hover:opacity-100'}" data-index="${i}">
                <img src="${img}" alt="" class="w-full h-full object-cover" />
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Title + Stats -->
      <div class="card p-6 text-left">
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <h1 class="font-heading text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-1">${name}</h1>
            <div class="flex items-center gap-1.5 text-slate-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-forest-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span class="text-sm">${location}</span>
            </div>
          </div>
        </div>

        <!-- Quick Stats Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div class="bg-slate-50 rounded-xl p-3">
            <div class="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
              ${isHi ? 'आयाम' : 'Dimensions'}
            </div>
            <p class="font-accent font-semibold text-slate-800 text-sm">${plot.dimensions} ${isHi ? 'फिट' : 'ft'}</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-3">
            <div class="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              ${isHi ? 'कुल क्षेत्रफल' : 'Total Area'}
            </div>
            <p class="font-accent font-semibold text-slate-800 text-sm">${plot.area} ${isHi ? 'वर्ग फुट' : 'sqft'}</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-3">
            <div class="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
              ${isHi ? 'दिशा (Facing)' : 'Facing'}
            </div>
            <p class="font-accent font-semibold text-slate-800 text-sm">${facing}</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-3">
            <div class="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              ${isHi ? 'श्रेणी' : 'Category'}
            </div>
            <p class="font-accent font-semibold text-slate-800 text-sm">${category}</p>
          </div>
        </div>

        <p class="text-slate-600 text-sm leading-relaxed">${desc}</p>
      </div>

      <!-- Highlights -->
      <div class="card p-6 text-left">
        <h2 class="font-heading font-bold text-slate-900 text-lg mb-4">${window.getTranslation('plots_detail_highlights')}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${highlights.map(h => `
            <div class="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-forest-500 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span class="text-slate-700 text-sm font-medium">${h}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Legal Status -->
      <div class="card p-6 border-l-4 border-forest-500 text-left">
        <div class="flex items-start gap-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-forest-600 flex-shrink-0 mt-0.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <div>
            <h2 class="font-heading font-bold text-slate-900 text-lg mb-1">${window.getTranslation('plots_detail_legal')}</h2>
            <p class="text-sm text-slate-600">${window.getTranslation('plots_detail_legal_desc')}</p>
          </div>
        </div>
      </div>

      <!-- Amenities -->
      <div class="card p-6 text-left">
        <h2 class="font-heading font-bold text-slate-900 text-lg mb-4">${window.getTranslation('plots_detail_amenities')}</h2>
        <div class="flex flex-wrap gap-2">
          ${amenities.map(a => `
            <span class="bg-forest-50 text-forest-700 text-sm font-accent font-medium px-3 py-1.5 rounded-lg border border-forest-100">${a}</span>
          `).join('')}
        </div>
      </div>

      <!-- Nearby Infrastructure -->
      ${plot.nearby && plot.nearby.length > 0 ? `
        <div class="card p-6 text-left">
          <h2 class="font-heading font-bold text-slate-900 text-lg mb-4">${window.getTranslation('plots_detail_nearby')}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${plot.nearby.map(n => `
              <div class="flex items-center justify-between py-2.5 px-3 bg-slate-50 rounded-xl">
                <span class="text-sm text-slate-700 font-medium">${isHi && n.label_hi ? n.label_hi : n.label}</span>
                <span class="text-xs font-accent font-semibold text-forest-600 bg-forest-100 px-2.5 py-1 rounded-full">${n.distance}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Payment Plans -->
      ${plot.paymentPlans && plot.paymentPlans.length > 0 ? `
        <div class="card p-6 text-left">
          <h2 class="font-heading font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-forest-600"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            ${window.getTranslation('plots_detail_payment')}
          </h2>
          <div class="space-y-3">
            ${plot.paymentPlans.map(plan => `
              <div class="border border-slate-200 rounded-xl p-4 hover:border-forest-300 transition-colors">
                <p class="font-accent font-semibold text-slate-800 text-sm mb-1">${isHi ? plan.name_hi || plan.name : plan.name}</p>
                <p class="text-slate-600 text-sm">${isHi ? plan.description_hi || plan.description : plan.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Location Map -->
      <div class="card overflow-hidden text-left">
        <div class="p-4 border-b border-slate-100">
          <h2 class="font-heading font-bold text-slate-900 text-lg">${window.getTranslation('plots_detail_map')}</h2>
        </div>
        <div class="h-64 bg-slate-100 flex items-center justify-center relative">
          <div class="absolute inset-0 bg-cover bg-center opacity-25" style="background-image: url('https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800')"></div>
          <div class="relative text-center z-10 p-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-forest-500 mx-auto mb-2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <p class="text-slate-700 text-sm font-semibold mb-1">${location}</p>
            <a href="https://maps.google.com/?q=${encodeURIComponent(location)}" target="_blank" rel="noopener noreferrer" class="btn-ghost text-sm mt-2 inline-flex items-center gap-1">${window.getTranslation('plots_detail_btn_maps')}</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar Column -->
    <div class="lg:col-span-1 text-left">
      <div class="lg:sticky lg:top-24 space-y-4">
        <!-- Quick Inquiry Widget -->
        <div class="card p-5">
          <h3 class="font-heading font-bold text-slate-900 text-lg mb-1">${window.getTranslation('plots_detail_interest')}</h3>
          <p class="text-slate-500 text-sm mb-4">${window.getTranslation('plots_detail_callback_sub')}</p>

          <form id="detail-sidebar-form" class="space-y-3">
            <input type="text" required id="sidebar-name-input" placeholder="${window.getTranslation('plots_detail_placeholder_name')}" class="input-field text-sm" />
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">+91</span>
              <input type="tel" required id="sidebar-phone-input" placeholder="${window.getTranslation('plots_detail_placeholder_phone')}" class="input-field pl-12 text-sm" maxlength="10" />
            </div>
            <button type="submit" class="btn-primary w-full justify-center text-sm py-3" id="sidebar-submit-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>${window.getTranslation('plots_detail_btn_callback')}</span>
            </button>
          </form>

          <div id="detail-success-state" class="bg-forest-50 border border-forest-200 rounded-xl p-4 text-center hidden">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-forest-600 mx-auto mb-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <p class="text-forest-800 font-accent font-semibold text-sm">${window.getTranslation('plots_detail_success_title')}</p>
            <p class="text-forest-600 text-xs mt-1">${window.getTranslation('plots_detail_success_desc')}</p>
          </div>

          <div class="flex gap-2 mt-3">
            <button class="flex-1 flex items-center justify-center gap-1.5 border border-forest-300 text-forest-700 font-accent font-semibold text-xs py-2.5 rounded-lg hover:bg-forest-50 transition-colors" onclick="window.openLeadModal('${isHi ? 'साइट विज़िट बुक करें' : 'Book Site Visit'}', '${name}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ${window.getTranslation('plots_detail_btn_sitevisit')}
            </button>
            <a href="https://wa.me/917752957897?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(name)}%20at%20${encodeURIComponent(location)}" target="_blank" rel="noopener noreferrer" class="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bc5a] text-white font-accent font-semibold text-xs py-2.5 rounded-lg transition-colors">
              ${window.getTranslation('plots_detail_btn_wa')}
            </a>
          </div>
        </div>

        <!-- Brochure Download -->
        <button class="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-forest-400 text-slate-600 hover:text-forest-700 font-accent font-medium text-sm py-3.5 rounded-xl transition-all" onclick="alert('${isHi ? 'ब्रोशर डाउनलोड शुरू हुआ!' : 'Brochure download started!'}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          ${window.getTranslation('plots_detail_btn_brochure')}
        </button>

        <!-- Share Widget -->
        <button class="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-forest-600 font-accent text-sm py-2 transition-colors" onclick="if(navigator.share) { navigator.share({title: '${name}', url: window.location.href}); } else { alert('${isHi ? 'लिंक कॉपी किया गया' : 'Copied link'}: ' + window.location.href); }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          ${window.getTranslation('plots_detail_btn_share')}
        </button>
      </div>
    </div>
  `;
}

// Set up image carousel clicks
function setupDetailImageCarousel(plot) {
  activeImageIndex = 0;
  
  const mainImg = document.getElementById('carousel-main-img');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotBtns = document.querySelectorAll('.carousel-dot-btn');
  const thumbBtns = document.querySelectorAll('.carousel-thumb-btn');

  const updateCarouselState = () => {
    if (!mainImg) return;
    
    // Set main image source
    mainImg.src = plot.images[activeImageIndex];

    // Update Pagination Dots
    dotBtns.forEach((btn, i) => {
      if (i === activeImageIndex) {
        btn.classList.add('bg-white', 'w-5');
        btn.classList.remove('bg-white/50');
      } else {
        btn.classList.remove('bg-white', 'w-5');
        btn.classList.add('bg-white/50');
      }
    });

    // Update Thumbnail Borders
    thumbBtns.forEach((btn, i) => {
      if (i === activeImageIndex) {
        btn.classList.add('border-forest-500');
        btn.classList.remove('border-transparent');
        btn.classList.remove('opacity-60');
      } else {
        btn.classList.remove('border-forest-500');
        btn.classList.add('border-transparent');
        btn.classList.add('opacity-60');
      }
    });
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      activeImageIndex = (activeImageIndex - 1 + plot.images.length) % plot.images.length;
      updateCarouselState();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      activeImageIndex = (activeImageIndex + 1) % plot.images.length;
      updateCarouselState();
    });
  }

  // Bind Dot click triggers
  dotBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeImageIndex = parseInt(e.target.getAttribute('data-index'));
      updateCarouselState();
    });
  });

  // Bind Thumbnail click triggers
  thumbBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.currentTarget.getAttribute('data-index');
      activeImageIndex = parseInt(idx);
      updateCarouselState();
    });
  });
}

function setupDetailContactForm(plot) {
  const form = document.getElementById('detail-sidebar-form');
  const successState = document.getElementById('detail-success-state');
  const submitBtn = document.getElementById('sidebar-submit-btn');

  if (form && successState && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerText = window.currentLang === 'hi' ? 'भेजा जा रहा है...' : 'Sending...';

      setTimeout(() => {
        form.classList.add('hidden');
        successState.classList.remove('hidden');
      }, 1000);
    });
  }
}

/* ==========================================================================
   PLOTS DIRECTORY / LISTINGS VIEW LOGIC
   ========================================================================== */

let filters = {
  phase: 1,
  city: '',
  project: '',
  status: '',
  maxPrice: Infinity,
};

function showPlotsListingView() {
  const listingView = document.getElementById('plots-listing-view');
  const detailsView = document.getElementById('plot-details-view');

  if (listingView) listingView.classList.remove('hidden');
  if (detailsView) detailsView.classList.add('hidden');

  // Render Pick & Drop USP Banner
  renderUspBanner();

  // Populate dynamic select dropdowns
  populateFilterOptions();
  setupListingsEvents();
  renderPlotsList();
}

function renderUspBanner() {
  const container = document.getElementById('usp-banner-container');
  if (!container) return;

  const isHi = window.currentLang === 'hi';
  const title = window.getTranslation('plots_usp_title');
  const desc = window.getTranslation('plots_usp_desc');
  const btnText = window.getTranslation('plots_usp_btn');

  container.innerHTML = `
    <div class="bg-gradient-to-r from-forest-800 to-forest-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4 text-left">
        <div class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-earth-400 flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h1M14 17H8M10 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
        </div>
        <div>
          <h4 class="font-accent font-bold text-base text-white" data-i18n="plots_usp_title">${title}</h4>
          <p class="text-forest-200 text-sm mt-0.5" data-i18n="plots_usp_desc">${desc}</p>
        </div>
      </div>
      <button data-toggle="modal" data-title-key="modal_title" class="bg-earth-500 hover:bg-earth-600 text-white font-accent font-semibold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap" data-i18n="plots_usp_btn">${btnText}</button>
    </div>
  `;
}

function populateFilterOptions() {
  const citySelect = document.getElementById('city-select');
  const projectSelect = document.getElementById('project-select');
  const isHi = window.currentLang === 'hi';

  // Only consider plots in the active phase for filter dropdowns
  const phasePlots = window.plotsData.filter(p => p.phase === filters.phase);

  if (citySelect) {
    const cities = [...new Set(phasePlots.map(p => p.city))];
    const getCityLabel = (c) => {
      const plot = phasePlots.find(p => p.city === c);
      return isHi && plot && plot.city_hi ? plot.city_hi : c;
    };
    citySelect.innerHTML = `<option value="">${isHi ? 'सभी शहर' : 'All Cities'}</option>` +
      cities.map(c => `<option value="${c}">${getCityLabel(c)}</option>`).join('');
  }

  if (projectSelect) {
    const projects = [...new Set(phasePlots.map(p => p.project))];
    const getProjectLabel = (pr) => {
      const plot = phasePlots.find(p => p.project === pr);
      return isHi && plot && plot.project_hi ? plot.project_hi : pr;
    };
    projectSelect.innerHTML = `<option value="">${isHi ? 'सभी परियोजनाएं' : 'All Projects'}</option>` +
      projects.map(p => `<option value="${p}">${getProjectLabel(p)}</option>`).join('');
  }
}

function setupListingsEvents() {
  const citySelect = document.getElementById('city-select');
  const projectSelect = document.getElementById('project-select');
  const statusSelect = document.getElementById('status-select');
  const priceRange = document.getElementById('price-range');
  const priceDisplay = document.getElementById('price-range-display');
  const sortBySelect = document.getElementById('sort-by-select');
  
  const filterToggleBtn = document.getElementById('filter-toggle-btn');
  const expandedFilters = document.getElementById('expanded-filters');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');
  const gridViewBtn = document.getElementById('view-grid-btn');
  const listViewBtn = document.getElementById('view-list-btn');
  const isHi = window.currentLang === 'hi';

  const phase1Btn = document.getElementById('phase1-btn');
  const phase2Btn = document.getElementById('phase2-btn');

  const updatePhaseButtons = () => {
    if (!phase1Btn || !phase2Btn) return;
    if (filters.phase === 1) {
      phase1Btn.className = "flex-1 py-2.5 px-4 rounded-xl font-accent font-bold text-xs sm:text-sm transition-all border border-forest-600 bg-forest-600 text-white shadow-sm focus:outline-none";
      phase2Btn.className = "flex-1 py-2.5 px-4 rounded-xl font-accent font-bold text-xs sm:text-sm transition-all border border-slate-200 bg-white text-slate-700 hover:border-forest-600 hover:text-forest-600 shadow-sm focus:outline-none";
    } else {
      phase2Btn.className = "flex-1 py-2.5 px-4 rounded-xl font-accent font-bold text-xs sm:text-sm transition-all border border-forest-600 bg-forest-600 text-white shadow-sm focus:outline-none";
      phase1Btn.className = "flex-1 py-2.5 px-4 rounded-xl font-accent font-bold text-xs sm:text-sm transition-all border border-slate-200 bg-white text-slate-700 hover:border-forest-600 hover:text-forest-600 shadow-sm focus:outline-none";
    }

    // Update Phase description
    const phaseDesc = document.getElementById('phase-desc');
    if (phaseDesc) {
      if (filters.phase === 1) {
        phaseDesc.setAttribute('data-i18n', 'plots_phase_1_desc');
      } else {
        phaseDesc.setAttribute('data-i18n', 'plots_phase_2_desc');
      }
      if (typeof window.translateStaticHtml === 'function') {
        window.translateStaticHtml(window.currentLang);
      }
    }
  };

  // Phase bindings
  if (phase1Btn) {
    phase1Btn.addEventListener('click', () => {
      if (filters.phase !== 1) {
        filters.phase = 1;
        filters.city = '';
        filters.project = '';
        if (citySelect) citySelect.value = '';
        if (projectSelect) projectSelect.value = '';
        updatePhaseButtons();
        populateFilterOptions();
        renderPlotsList();
      }
    });
  }

  if (phase2Btn) {
    phase2Btn.addEventListener('click', () => {
      if (filters.phase !== 2) {
        filters.phase = 2;
        filters.city = '';
        filters.project = '';
        if (citySelect) citySelect.value = '';
        if (projectSelect) projectSelect.value = '';
        updatePhaseButtons();
        populateFilterOptions();
        renderPlotsList();
      }
    });
  }

  // Value binds
  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      filters.city = e.target.value;
      renderPlotsList();
    });
  }

  if (projectSelect) {
    projectSelect.addEventListener('change', (e) => {
      filters.project = e.target.value;
      renderPlotsList();
    });
  }

  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      filters.status = e.target.value;
      renderPlotsList();
    });
  }

  if (priceRange && priceDisplay) {
    priceRange.addEventListener('input', (e) => {
      filters.maxPrice = parseInt(e.target.value);
      priceDisplay.innerText = isHi 
        ? `कीमत: ₹0 लाख – ₹${filters.maxPrice} लाख` 
        : `Price: ₹0L – ₹${filters.maxPrice}L`;
      renderPlotsList();
    });
  }

  if (sortBySelect) {
    sortBySelect.addEventListener('change', () => {
      renderPlotsList();
    });
  }

  // Toggle Filters Panel
  if (filterToggleBtn && expandedFilters) {
    filterToggleBtn.addEventListener('click', () => {
      expandedFilters.classList.toggle('hidden');
      filterToggleBtn.classList.toggle('bg-forest-600');
      filterToggleBtn.classList.toggle('border-forest-600');
      filterToggleBtn.classList.toggle('text-white');
    });
  }

  // Clear Filters
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      filters = { phase: filters.phase, city: '', project: '', status: '', maxPrice: Infinity };
      
      if (citySelect) citySelect.value = '';
      if (projectSelect) projectSelect.value = '';
      if (statusSelect) statusSelect.value = '';
      if (priceRange) priceRange.value = 50;
      if (priceDisplay) {
        priceDisplay.innerText = isHi ? `कीमत: ₹0 लाख – ₹50 लाख` : `Price: ₹0L – ₹50L`;
      }
      if (sortBySelect) sortBySelect.value = 'default';

      renderPlotsList();
    });
  }

  // Layout Grid/List Toggle
  if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener('click', () => {
      currentViewMode = 'grid';
      gridViewBtn.classList.add('bg-forest-100', 'text-forest-600');
      listViewBtn.classList.remove('bg-forest-100', 'text-forest-600');
      renderPlotsList();
    });

    listViewBtn.addEventListener('click', () => {
      currentViewMode = 'list';
      listViewBtn.classList.add('bg-forest-100', 'text-forest-600');
      gridViewBtn.classList.remove('bg-forest-100', 'text-forest-600');
      renderPlotsList();
    });
  }

  // Bind clear filters in empty state
  const emptyClearBtn = document.getElementById('plots-empty-clear-btn');
  if (emptyClearBtn) {
    emptyClearBtn.addEventListener('click', () => {
      if (clearFiltersBtn) clearFiltersBtn.click();
    });
  }

  // Set initial Phase button states
  updatePhaseButtons();
}

function renderPlotsList() {
  const gridContainer = document.getElementById('plots-grid-container');
  const listContainer = document.getElementById('plots-list-container');
  const countEl = document.getElementById('plots-result-count');
  const emptyEl = document.getElementById('plots-empty-state');

  if (!gridContainer || !listContainer || !window.plotsData) return;

  // Filter listings data
  let filtered = window.plotsData.filter(plot => {
    if (plot.phase !== filters.phase) return false;
    if (filters.city && plot.city !== filters.city) return false;
    if (filters.project && plot.project !== filters.project) return false;
    if (filters.status && plot.status !== filters.status) return false;
    
    const priceLakhs = plot.totalPrice / 100000;
    if (priceLakhs > filters.maxPrice) return false;

    return true;
  });

  // Sort listings data
  const sortBySelect = document.getElementById('sort-by-select');
  const sortBy = sortBySelect ? sortBySelect.value : 'default';

  switch (sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.totalPrice - b.totalPrice);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.totalPrice - a.totalPrice);
      break;
    case 'area-asc':
      filtered.sort((a, b) => a.area - b.area);
      break;
    case 'area-desc':
      filtered.sort((a, b) => b.area - a.area);
      break;
  }

  // Update counts
  if (countEl) countEl.innerText = filtered.length;

  // Render empty state or layout
  if (filtered.length === 0) {
    if (emptyEl) emptyEl.classList.remove('hidden');
    gridContainer.classList.add('hidden');
    listContainer.classList.add('hidden');
  } else {
    if (emptyEl) emptyEl.classList.add('hidden');

    if (currentViewMode === 'grid') {
      gridContainer.classList.remove('hidden');
      listContainer.classList.add('hidden');
      gridContainer.innerHTML = filtered.map(plot => renderPlotCardHtml(plot)).join('');
    } else {
      listContainer.classList.remove('hidden');
      gridContainer.classList.add('hidden');
      listContainer.innerHTML = filtered.map(plot => renderPlotListCardHtml(plot)).join('');
    }
  }
}

// Generate List layout card
function renderPlotListCardHtml(plot) {
  const isHi = window.currentLang === 'hi';
  const name = isHi ? plot.name_hi || plot.name : plot.name;
  const location = isHi ? plot.location_hi || plot.location : plot.location;

  const statusLabel = {
    available: isHi ? 'उपलब्ध' : 'Available',
    sold: isHi ? 'बिक गया' : 'Sold Out',
    reserved: isHi ? 'आरक्षित' : 'Reserved',
  }[plot.status];

  const statusClass = {
    available: 'badge-available',
    sold: 'badge-sold',
    reserved: 'badge-reserved',
  }[plot.status];

  const featuredBadge = plot.featured ? `<span class="badge-featured">${isHi ? 'विशेष' : 'Featured'}</span>` : '';

  return `
    <div class="card overflow-hidden flex flex-col sm:flex-row text-left">
      <div class="sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden bg-slate-100">
        <img src="${plot.images[0]}" alt="${name}" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between mb-2 gap-2">
            <h3 class="font-heading font-bold text-slate-900 text-lg leading-snug">${name}</h3>
            <div class="flex gap-2 flex-shrink-0">
              <span class="${statusClass}">${statusLabel}</span>
              ${featuredBadge}
            </div>
          </div>
          <div class="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5 text-forest-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${location}
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-sm mt-4 sm:mt-0">
          <div>
            <span class="text-slate-400 text-xs block">${isHi ? 'प्लॉट का आकार' : 'Plot Size'}</span>
            <span class="font-accent font-semibold text-slate-800">${plot.dimensions} ${isHi ? 'फिट' : 'ft'}</span>
          </div>
          <div class="ml-auto flex gap-2">
            <a href="plots.html?id=${plot.id}" class="btn-outline text-sm py-2">${isHi ? 'विवरण' : 'Details'}</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Generate Grid layout card
function renderPlotCardHtml(plot) {
  const isHi = window.currentLang === 'hi';
  const name = isHi ? plot.name_hi || plot.name : plot.name;
  const location = isHi ? plot.location_hi || plot.location : plot.location;

  const statusLabel = {
    available: isHi ? 'उपलब्ध' : 'Available',
    sold: isHi ? 'बिक गया' : 'Sold Out',
    reserved: isHi ? 'आरक्षित' : 'Reserved',
  }[plot.status];

  const statusClass = {
    available: 'badge-available',
    sold: 'badge-sold',
    reserved: 'badge-reserved',
  }[plot.status];

  const featuredBadge = plot.featured ? `<span class="badge-featured">${isHi ? 'विशेष' : 'Featured'}</span>` : '';

  return `
    <div class="plot-card card overflow-hidden group">
      <!-- Image -->
      <div class="relative h-48 overflow-hidden bg-slate-100">
        <img src="${plot.images[0]}" alt="${name}" class="plot-card-img w-full h-full object-cover transition-transform duration-500" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div class="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span class="${statusClass}">${statusLabel}</span>
          ${featuredBadge}
        </div>
      </div>

      <!-- Content -->
      <div class="p-4 text-left">
        <h3 class="font-heading font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-1">${name}</h3>
        <div class="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5 text-forest-500 flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span class="truncate">${location}</span>
        </div>

        <div class="grid grid-cols-2 gap-2 mb-4">
          <div class="bg-slate-50 rounded-lg p-2.5 col-span-2">
            <p class="text-xs text-slate-400 mb-0.5">${isHi ? 'प्लॉट का आकार' : 'Plot Size'}</p>
            <p class="font-accent font-semibold text-sm text-slate-800">${plot.dimensions} ${isHi ? 'फिट' : 'ft'}</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <a href="plots.html?id=${plot.id}" class="btn-ghost text-sm group/link">
            ${isHi ? 'विवरण देखें' : 'View Details'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 transition-transform group-hover/link:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <a href="https://wa.me/917752957897?text=${encodeURIComponent(isHi ? `नमस्ते, मैं ${name} में रुचि रखता हूँ` : `Hi, I'm interested in ${name}`)}" target="_blank" rel="noopener noreferrer" class="text-xs font-accent font-semibold text-[#25D366] hover:text-[#20bc5a] transition-colors">
            ${isHi ? 'व्हाट्सएप' : 'WhatsApp'}
          </a>
        </div>
      </div>
    </div>
  `;
}
