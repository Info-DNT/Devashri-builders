// ── Devashri Builders — Projects Page Controller ──

let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProjectsList();
  setupProjectsFilterButtons();
});

const getStatusBadge = (status) => {
  const isHi = window.currentLang === 'hi';
  return {
    ongoing: { label: isHi ? 'चल रही है' : 'Ongoing', cls: 'bg-forest-500 text-white' },
    upcoming: { label: isHi ? 'नया लॉन्च' : 'New Launch', cls: 'bg-earth-500 text-white' },
    completed: { label: isHi ? 'पूर्ण' : 'Completed', cls: 'bg-slate-500 text-white' },
  }[status];
};

function renderProjectsList() {
  const container = document.getElementById('projects-grid');
  if (!container || !window.projectsData) return;

  const filtered = activeFilter === 'all' 
    ? window.projectsData 
    : window.projectsData.filter(p => p.status === activeFilter);

  const isHi = window.currentLang === 'hi';

  container.innerHTML = filtered.map(proj => {
    const badge = getStatusBadge(proj.status);
    const projName = isHi ? proj.name_hi || proj.name : proj.name;
    const projCity = isHi ? proj.city_hi || proj.city : proj.city;
    const projDesc = isHi ? proj.description_hi || proj.description : proj.description;
    const projSizes = isHi ? proj.plotSizes_hi || proj.plotSizes : proj.plotSizes;
    
    const availableText = proj.availablePlots > 0 
      ? (isHi ? `${proj.availablePlots} उपलब्ध` : `${proj.availablePlots} plots available`) 
      : (isHi ? 'बिक चुका है' : 'Sold Out');
      
    const availableColorClass = proj.availablePlots > 0 ? 'text-forest-700' : 'text-slate-400';

    const highlights = isHi && proj.highlights_hi ? proj.highlights_hi : proj.highlights;
    const highlightsHtml = highlights.map(h => {
      return `<span class="text-xs bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full">${h}</span>`;
    }).join('');

    return `
      <div class="card overflow-hidden group text-left">
        <div class="relative h-52 overflow-hidden">
          <img src="${proj.image}" alt="${projName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute top-3 left-3">
            <span class="text-xs font-accent font-semibold px-2.5 py-1 rounded-full ${badge.cls}">${badge.label}</span>
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
            <a href="plots.html" class="btn-ghost text-sm group/link">
              ${isHi ? 'प्लॉट्स देखें' : 'View Plots'}
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
}

function setupProjectsFilterButtons() {
  const container = document.getElementById('projects-filter-container');
  if (!container) return;

  const filters = ['all', 'ongoing', 'upcoming', 'completed'];
  const isHi = window.currentLang === 'hi';

  const getFilterLabel = (f) => {
    if (f === 'all') return isHi ? 'सभी परियोजनाएं' : 'All Projects';
    return {
      ongoing: isHi ? 'चल रही है' : 'Ongoing',
      upcoming: isHi ? 'नया लॉन्च' : 'New Launch',
      completed: isHi ? 'पूर्ण' : 'Completed',
    }[f];
  };

  container.innerHTML = filters.map(f => {
    const isActive = activeFilter === f;
    const label = getFilterLabel(f);
    const activeClass = isActive 
      ? 'bg-forest-600 text-white shadow-sm' 
      : 'bg-white text-slate-600 border border-slate-200 hover:border-forest-300';
    return `<button class="filter-btn px-5 py-2.5 rounded-full font-accent font-semibold text-sm transition-all ${activeClass}" data-filter="${f}">${label}</button>`;
  }).join('');

  // Bind click listeners
  const buttons = container.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeFilter = e.target.getAttribute('data-filter');
      
      // Update button visual states
      buttons.forEach(b => {
        const isCurrent = b.getAttribute('data-filter') === activeFilter;
        if (isCurrent) {
          b.className = 'filter-btn px-5 py-2.5 rounded-full font-accent font-semibold text-sm transition-all bg-forest-600 text-white shadow-sm';
        } else {
          b.className = 'filter-btn px-5 py-2.5 rounded-full font-accent font-semibold text-sm transition-all bg-white text-slate-600 border border-slate-200 hover:border-forest-300';
        }
      });

      renderProjectsList();
    });
  });
}
