// ── Devashri Builders — Projects Page Controller ──

let currentProjectId = null;
let activePhase = 1;

document.addEventListener('DOMContentLoaded', () => {
  handleRouting();

  // Bind back to listings click
  const backBtn = document.getElementById('back-to-listings-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', 'projects.html');
      handleRouting();
    });
  }
});

// Intercept browser back/forward buttons
window.addEventListener('popstate', handleRouting);

function handleRouting() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');
  const searchVal = params.get('q');
  
  const listingView = document.getElementById('projects-listing-view');
  const detailsView = document.getElementById('project-details-view');
  
  if (projectId) {
    currentProjectId = projectId;
    if (listingView) listingView.classList.add('hidden');
    if (detailsView) detailsView.classList.remove('hidden');
    
    const proj = window.projectsData.find(p => p.id === projectId);
    if (proj) {
      renderProjectDetails(proj);
    } else {
      // Fallback if ID is invalid
      history.replaceState(null, '', 'projects.html');
      currentProjectId = null;
      if (listingView) listingView.classList.remove('hidden');
      if (detailsView) detailsView.classList.add('hidden');
      initListingView(searchVal);
    }
  } else {
    currentProjectId = null;
    if (listingView) listingView.classList.remove('hidden');
    if (detailsView) detailsView.classList.add('hidden');
    initListingView(searchVal);
  }
}

function initListingView(searchVal) {
  const phase1Btn = document.getElementById('phase1-btn');
  const phase2Btn = document.getElementById('phase2-btn');

  if (phase1Btn && phase2Btn) {
    updatePhaseButtonsUI();
    
    phase1Btn.onclick = () => {
      if (activePhase === 1) return;
      activePhase = 1;
      updatePhaseButtonsUI();
      if (window.location.search.includes('q=')) {
        history.pushState(null, '', 'projects.html');
      }
      renderProjectsGrid();
    };

    phase2Btn.onclick = () => {
      if (activePhase === 2) return;
      activePhase = 2;
      updatePhaseButtonsUI();
      if (window.location.search.includes('q=')) {
        history.pushState(null, '', 'projects.html');
      }
      renderProjectsGrid();
    };
  }

  renderUspBanner();
  renderProjectsGrid(searchVal);
}

function updatePhaseButtonsUI() {
  const phase1Btn = document.getElementById('phase1-btn');
  const phase2Btn = document.getElementById('phase2-btn');
  const phaseDesc = document.getElementById('phase-desc');

  if (!phase1Btn || !phase2Btn) return;

  if (activePhase === 1) {
    phase1Btn.className = 'flex-1 py-2.5 px-4 rounded-xl font-accent font-bold text-xs sm:text-sm transition-all border border-forest-600 bg-forest-600 text-white shadow-sm focus:outline-none';
    phase2Btn.className = 'flex-1 py-2.5 px-4 rounded-xl font-accent font-bold text-xs sm:text-sm transition-all border border-slate-200 bg-white text-slate-700 hover:border-forest-600 hover:text-forest-600 shadow-sm focus:outline-none';
    if (phaseDesc) {
      phaseDesc.innerHTML = window.getTranslation('proj_phase_1_desc');
    }
  } else {
    phase2Btn.className = 'flex-1 py-2.5 px-4 rounded-xl font-accent font-bold text-xs sm:text-sm transition-all border border-forest-600 bg-forest-600 text-white shadow-sm focus:outline-none';
    phase1Btn.className = 'flex-1 py-2.5 px-4 rounded-xl font-accent font-bold text-xs sm:text-sm transition-all border border-slate-200 bg-white text-slate-700 hover:border-forest-600 hover:text-forest-600 shadow-sm focus:outline-none';
    if (phaseDesc) {
      phaseDesc.innerHTML = window.getTranslation('proj_phase_2_desc');
    }
  }
}

function renderUspBanner() {
  const container = document.getElementById('usp-banner-container');
  if (!container) return;

  container.innerHTML = `
    <div class="bg-gradient-to-r from-forest-800 to-forest-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4 text-left">
        <div class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-earth-400 flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h1M14 17H8M10 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
        </div>
        <div>
          <h4 class="font-accent font-bold text-base text-white" data-i18n="plots_usp_title">${window.getTranslation('plots_usp_title')}</h4>
          <p class="text-forest-200 text-sm mt-0.5" data-i18n="plots_usp_desc">${window.getTranslation('plots_usp_desc')}</p>
        </div>
      </div>
      <button data-toggle="modal" data-title-key="modal_title" class="bg-earth-500 hover:bg-earth-600 text-white font-accent font-semibold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap" data-i18n="plots_usp_btn">${window.getTranslation('plots_usp_btn')}</button>
    </div>
  `;
}

function renderProjectsGrid(searchVal) {
  const container = document.getElementById('projects-grid');
  if (!container || !window.projectsData) return;

  let filtered = window.projectsData;
  const isHi = window.currentLang === 'hi';
  
  if (searchVal) {
    const q = searchVal.toLowerCase();
    filtered = filtered.filter(p => {
      const name = (p.name || '').toLowerCase();
      const nameHi = (p.name_hi || '').toLowerCase();
      const loc = (p.location || '').toLowerCase();
      const locHi = (p.location_hi || '').toLowerCase();
      const city = (p.city || '').toLowerCase();
      const cityHi = (p.city_hi || '').toLowerCase();
      return name.includes(q) || nameHi.includes(q) || loc.includes(q) || locHi.includes(q) || city.includes(q) || cityHi.includes(q);
    });
    
    const phaseDesc = document.getElementById('phase-desc');
    if (phaseDesc) {
      phaseDesc.innerHTML = isHi 
        ? `"${searchVal}" के लिए खोज परिणाम` 
        : `Search results for "${searchVal}"`;
    }
  } else {
    filtered = filtered.filter(p => p.phase === activePhase);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-10 bg-white rounded-2xl border border-slate-100 p-8">
        <p class="text-slate-500">${isHi ? 'कोई परियोजना नहीं मिली।' : 'No projects found.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(proj => {
    const statusLabel = {
      ongoing: isHi ? 'चल रही है' : 'Ongoing',
      upcoming: isHi ? 'नया लॉन्च' : 'New Launch',
      completed: isHi ? 'पूर्ण' : 'Completed',
    }[proj.status];

    const statusClass = {
      ongoing: 'badge-available',
      upcoming: 'bg-earth-500 text-white text-[11px] px-2.5 py-1 rounded-full font-accent font-semibold',
      completed: 'badge-sold',
    }[proj.status] || 'badge-available';

    const projName = isHi ? proj.name_hi || proj.name : proj.name;
    const projCity = isHi ? proj.city_hi || proj.city : proj.city;
    const projDesc = isHi ? proj.description_hi || proj.description : proj.description;
    const projSizes = isHi ? proj.plotSizes_hi || proj.plotSizes : proj.plotSizes;
    
    const availableText = proj.availablePlots > 0 
      ? (isHi ? `${proj.availablePlots} उपलब्ध` : `${proj.availablePlots} plots available`) 
      : (isHi ? 'बिक चुका है' : 'Sold Out');
      
    const availableColorClass = proj.availablePlots > 0 ? 'text-forest-700' : 'text-slate-400';

    const highlights = isHi && proj.highlights_hi ? proj.highlights_hi : proj.highlights;
    const highlightsHtml = highlights.slice(0, 3).map(h => {
      return `<span class="text-xs bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full">${h}</span>`;
    }).join('');

    return `
      <div class="card overflow-hidden group text-left">
        <div class="relative h-52 overflow-hidden">
          <img src="${proj.image}" alt="${projName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute top-3 left-3">
            <span class="text-xs font-accent font-semibold px-2.5 py-1 rounded-full ${proj.status === 'upcoming' ? statusClass : 'text-xs font-accent font-semibold px-2.5 py-1 rounded-full ' + statusClass}">${statusLabel}</span>
          </div>
          <div class="absolute bottom-3 left-3 right-3">
            <h3 class="font-heading font-bold text-white text-base leading-snug">${projName}</h3>
            <div class="flex items-center gap-1 text-white/70 text-xs mt-0.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${projCity}
            </div>
          </div>
        </div>

        <div class="p-5">
          <p class="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">${projDesc}</p>

          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="bg-slate-50 rounded-xl p-3">
              <p class="text-xs text-slate-400 mb-0.5">${isHi ? 'कुल प्लॉट्स' : 'Total Plots'}</p>
              <p class="font-accent font-bold text-slate-800">${proj.totalPlots}</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-3">
              <p class="text-xs text-slate-400 mb-0.5">${isHi ? 'उपलब्ध' : 'Available'}</p>
              <p class="font-accent font-bold ${availableColorClass}">${availableText}</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-3 col-span-2">
              <p class="text-xs text-slate-400 mb-0.5">${isHi ? 'प्लॉट के आकार' : 'Plot Sizes'}</p>
              <p class="font-accent font-semibold text-slate-800 text-xs">${projSizes}</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-1 mb-4">
            ${highlightsHtml}
          </div>

          <div class="flex items-center gap-3 pt-3 border-t border-slate-100">
            <a href="projects.html?id=${proj.id}" class="btn-ghost text-sm group/link project-details-link">
              ${isHi ? 'विवरण देखें' : 'View Details'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 transition-transform group-hover/link:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <button class="ml-auto btn-primary text-sm py-2" onclick="window.openLeadModal('${isHi ? 'पूछताछ करें' : 'Enquire'}', '${projName}')">
              ${isHi ? 'पूछताछ' : 'Enquire'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Bind click listeners on view details links
  container.querySelectorAll('.project-details-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      history.pushState(null, '', href);
      handleRouting();
    });
  });
}

function renderProjectDetails(proj) {
  const detailsContent = document.getElementById('project-details-content');
  if (!detailsContent) return;

  const isHi = window.currentLang === 'hi';
  const projName = isHi ? proj.name_hi || proj.name : proj.name;
  const projLocation = isHi ? proj.location_hi || proj.location : proj.location;
  const projDesc = isHi ? proj.description_hi || proj.description : proj.description;

  const breadcrumbName = document.getElementById('breadcrumb-project-name');
  if (breadcrumbName) {
    breadcrumbName.innerText = projName;
  }

  const images = proj.images || [proj.image];
  let carouselHtml = '';
  if (images && images.length > 0) {
    carouselHtml = `
      <div class="relative h-64 sm:h-96 rounded-2xl overflow-hidden shadow-sm bg-slate-100 mb-4">
        <img id="detail-main-img" src="${images[0]}" alt="${projName}" class="w-full h-full object-cover transition-all duration-300" />
      </div>
      ${images.length > 1 ? `
        <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          ${images.map((img, index) => `
            <button onclick="document.getElementById('detail-main-img').src='${img}'" class="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 border-transparent hover:border-forest-600 focus:outline-none transition-all">
              <img src="${img}" class="w-full h-full object-cover" />
            </button>
          `).join('')}
        </div>
      ` : ''}
    `;
  }

  const specList = [
    { label: window.getTranslation('proj_detail_total_plots'), value: proj.totalPlots },
    { label: window.getTranslation('proj_detail_available_plots'), value: proj.availablePlots > 0 ? proj.availablePlots : (isHi ? 'बिक चुका है' : 'Sold Out') },
    { label: window.getTranslation('proj_detail_plot_sizes'), value: isHi ? proj.plotSizes_hi || proj.plotSizes : proj.plotSizes },
    { label: window.getTranslation('proj_detail_area'), value: isHi ? proj.area_hi || proj.area : proj.area },
    { label: window.getTranslation('proj_detail_launch'), value: isHi ? proj.launchDate_hi || proj.launchDate : proj.launchDate },
    { label: window.getTranslation('proj_detail_price'), value: isHi ? proj.priceRange_hi || proj.priceRange : proj.priceRange },
    { label: window.getTranslation('proj_detail_rera'), value: isHi ? proj.rera_hi || proj.rera : proj.rera },
    { label: window.getTranslation('proj_detail_facing'), value: isHi ? proj.facing_hi || proj.facing : proj.facing },
  ];

  const specsHtml = `
    <div class="mt-8">
      <h3 class="font-heading font-bold text-slate-900 text-xl mb-4 border-b border-slate-100 pb-2">${window.getTranslation('proj_detail_specifications')}</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        ${specList.map(spec => `
          <div class="bg-slate-50 rounded-xl p-4 text-left border border-slate-100">
            <span class="text-[10px] text-slate-400 block mb-1 font-accent uppercase tracking-wider">${spec.label}</span>
            <strong class="text-slate-800 text-xs sm:text-sm font-semibold">${spec.value}</strong>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Filter plots matching the project name (e.g. plot.project === proj.name)
  const layoutPlots = window.plotsData ? window.plotsData.filter(plot => plot.project === proj.name) : [];
  let plotsInventoryHtml = '';
  if (layoutPlots.length > 0) {
    plotsInventoryHtml = `
      <div class="mt-8">
        <h3 class="font-heading font-bold text-slate-900 text-xl mb-4 border-b border-slate-100 pb-2">${window.getTranslation('proj_detail_plot_inventory')}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${layoutPlots.map(plot => {
            const plotName = isHi ? plot.name_hi || plot.name : plot.name;
            const plotFacing = isHi ? plot.facing_hi || plot.facing : plot.facing;
            const plotStatusLabel = {
              available: isHi ? 'उपलब्ध' : 'Available',
              sold: isHi ? 'बिक गया' : 'Sold Out',
              reserved: isHi ? 'आरक्षित' : 'Reserved',
            }[plot.status];
            const plotStatusClass = {
              available: 'badge-available',
              sold: 'badge-sold',
              reserved: 'badge-reserved',
            }[plot.status];
            
            return `
              <div class="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-sm transition-all text-left">
                <div>
                  <div class="flex justify-between items-start gap-2 mb-2">
                    <h4 class="font-heading font-bold text-slate-800 text-sm line-clamp-1">${plotName}</h4>
                    <span class="${plotStatusClass} text-[10px] px-2 py-0.5 rounded-full font-semibold">${plotStatusLabel}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-4">
                    <div>
                      <span class="text-slate-400 block">${isHi ? 'प्लॉट का आकार' : 'Plot Size'}</span>
                      <strong class="text-slate-700 font-accent">${plot.dimensions} ${isHi ? 'फिट' : 'ft'}</strong>
                    </div>
                    <div>
                      <span class="text-slate-400 block">${isHi ? 'दिशा (Facing)' : 'Facing'}</span>
                      <strong class="text-slate-700 font-accent">${plotFacing}</strong>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between border-t border-slate-100 pt-2.5">
                  <button onclick="window.openLeadModal('${isHi ? 'बुक विज़िट' : 'Book Visit'}', '${plotName}')" class="text-xs bg-forest-600 hover:bg-forest-700 text-white font-accent font-semibold px-3 py-1.5 rounded-lg transition-colors" ${plot.status !== 'available' ? 'disabled' : ''}>
                    ${isHi ? 'बुक विज़िट' : 'Book Visit'}
                  </button>
                  <a href="https://wa.me/917752957897?text=${encodeURIComponent(isHi ? `नमस्ते, मैं ${plotName} में रुचि रखता हूँ` : `Hi, I'm interested in ${plotName}`)}" target="_blank" rel="noopener noreferrer" class="text-xs text-[#25D366] hover:text-[#20bc5a] font-accent font-semibold transition-colors">
                    ${isHi ? 'व्हाट्सएप' : 'WhatsApp'}
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  } else {
    plotsInventoryHtml = `
      <div class="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-150 text-center">
        <p class="text-slate-500 text-sm">
          ${isHi ? 'इस लेआउट में वर्तमान में सभी प्लॉट्स बिक चुके हैं। नए प्लॉट्स के अपडेट के लिए हमसे संपर्क करें।' : 'All plots in this layout are currently sold or reserved. Contact us for upcoming inventory.'}
        </p>
      </div>
    `;
  }

  const amenities = isHi ? proj.amenities_hi || proj.amenities : proj.amenities;
  const amenitiesHtml = amenities && amenities.length > 0 ? `
    <div class="text-left">
      <h3 class="font-heading font-bold text-slate-900 text-lg mb-3">${window.getTranslation('plots_detail_amenities')}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${amenities.map(a => `
          <div class="flex items-center gap-2 text-slate-600 text-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="w-4 h-4 text-forest-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${a}</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const nearbyPoints = proj.nearby;
  const nearbyHtml = nearbyPoints && nearbyPoints.length > 0 ? `
    <div class="text-left">
      <h3 class="font-heading font-bold text-slate-900 text-lg mb-3">${window.getTranslation('plots_detail_nearby')}</h3>
      <div class="space-y-2">
        ${nearbyPoints.map(n => {
          const label = isHi ? n.label_hi || n.label : n.label;
          return `
            <div class="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2.5 text-sm">
              <span class="text-slate-700 font-medium">${label}</span>
              <span class="text-slate-400 font-accent font-semibold">${n.distance}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  ` : '';

  const mapHtml = proj.mapLink ? `
    <div class="bg-white border border-slate-100 rounded-2xl p-5 text-left shadow-sm">
      <h3 class="font-heading font-bold text-slate-900 text-lg mb-3">${window.getTranslation('plots_detail_map')}</h3>
      <div class="relative rounded-xl overflow-hidden h-48 border border-slate-100 mb-3 bg-slate-150">
        <iframe src="${proj.mapLink}" class="w-full h-full border-none" allowfullscreen="" loading="lazy"></iframe>
      </div>
      <a href="https://maps.google.com/?q=${encodeURIComponent(projLocation)}" target="_blank" rel="noopener noreferrer" class="w-full btn-outline text-xs py-2.5 justify-center flex items-center gap-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
        <span>${window.getTranslation('plots_detail_btn_maps')}</span>
      </a>
    </div>
  ` : '';

  detailsContent.innerHTML = `
    <!-- Left Column (main detail info) -->
    <div class="lg:col-span-2 space-y-6">
      <div class="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        ${carouselHtml}
        
        <div class="mt-6 text-left">
          <h2 class="font-heading font-bold text-slate-900 text-2xl mb-1">${projName}</h2>
          <div class="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-forest-600"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${projLocation}</span>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">${projDesc}</p>
        </div>

        ${specsHtml}
      </div>

      <!-- Inventory -->
      ${plotsInventoryHtml}

      <!-- Amenities & Nearby Grid -->
      <div class="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        ${amenitiesHtml}
        ${nearbyHtml}
      </div>
    </div>

    <!-- Right Column (enquiry card, payment, maps) -->
    <div class="space-y-6">
      <div class="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm text-left">
        <h3 class="font-heading font-bold text-slate-900 text-lg mb-1">${isHi ? 'क्या आप इस लेआउट में रुचि रखते हैं?' : 'Interested in this Layout?'}</h3>
        <p class="text-slate-500 text-xs mb-5">${window.getTranslation('plots_detail_callback_sub')}</p>
        
        <form id="project-detail-callback-form" class="space-y-4" onsubmit="event.preventDefault(); window.handleDetailCallbackSubmit(this, '${projName}');">
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">${isHi ? 'आपका नाम' : 'Your Name'}</label>
            <input type="text" required placeholder="${window.getTranslation('plots_detail_placeholder_name')}" class="w-full input-field text-sm" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">${isHi ? 'मोबाइल नंबर' : 'Mobile Number'}</label>
            <input type="tel" required pattern="[0-9]{10}" placeholder="${window.getTranslation('plots_detail_placeholder_phone')}" class="w-full input-field text-sm" />
          </div>
          <button type="submit" class="w-full btn-primary text-sm py-3 justify-center">
            ${window.getTranslation('plots_detail_btn_callback')}
          </button>
        </form>
        
        <div class="grid grid-cols-2 gap-2 mt-4">
          <button onclick="window.openLeadModal('${isHi ? 'साइट विज़िट' : 'Site Visit'}', '${projName}')" class="btn-outline text-xs py-2.5 justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            ${window.getTranslation('plots_detail_btn_sitevisit')}
          </button>
          <a href="https://wa.me/917752957897?text=${encodeURIComponent(isHi ? `नमस्ते, मैं ${projName} में रुचि रखता हूँ` : `Hi, I'm interested in ${projName}`)}" target="_blank" rel="noopener noreferrer" class="btn-outline text-xs py-2.5 justify-center border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.579 1.967 14.106.942 11.479.941c-5.43 0-9.854 4.37-9.858 9.798-.001 1.76.471 3.478 1.371 4.966L1.936 21.66l6.002-1.566z"/></svg>
            ${window.getTranslation('plots_detail_btn_wa')}
          </a>
        </div>
      </div>

      <!-- Payment Plans -->
      ${proj.paymentPlans && proj.paymentPlans.length > 0 ? `
        <div class="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm text-left">
           <h3 class="font-heading font-bold text-slate-900 text-lg mb-3">${window.getTranslation('plots_detail_payment')}</h3>
           <div class="space-y-4">
             ${proj.paymentPlans.map(plan => {
               const planName = isHi ? plan.name_hi || plan.name : plan.name;
               const planDesc = isHi ? plan.description_hi || plan.description : plan.description;
               return `
                 <div class="border-l-4 border-forest-600 pl-3 py-1">
                   <h4 class="font-heading font-bold text-slate-800 text-sm">${planName}</h4>
                   <p class="text-slate-500 text-xs mt-1 leading-relaxed">${planDesc}</p>
                 </div>
               `;
             }).join('')}
           </div>
        </div>
      ` : ''}

      <!-- Map -->
      ${mapHtml}
    </div>
  `;
}

window.handleDetailCallbackSubmit = function(form, projName) {
  const isHi = window.currentLang === 'hi';
  const nameInput = form.querySelector('input[type="text"]');
  
  const alertMsg = isHi 
    ? `धन्यवाद ${nameInput.value}! ${projName} के लिए आपका अनुरोध प्राप्त हुआ। हम आपसे जल्द ही संपर्क करेंगे।`
    : `Thank you ${nameInput.value}! Your callback request for ${projName} has been received. We will contact you shortly.`;
    
  alert(alertMsg);
  form.reset();
};

window.renderProjectsList = function() {
  if (currentProjectId) {
    const proj = window.projectsData.find(p => p.id === currentProjectId);
    if (proj) {
      renderProjectDetails(proj);
    }
  } else {
    const params = new URLSearchParams(window.location.search);
    const searchVal = params.get('q');
    updatePhaseButtonsUI();
    renderProjectsGrid(searchVal);
  }
};
