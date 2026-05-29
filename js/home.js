// ── Devashri Builders — HomePage Logic ──

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedPlots();
  renderOngoingProjectsTeaser();
  renderLatestBlogsTeaser();
  setupHeroSearchForm();
});

// Helper: Generate Plot Card HTML
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

// 1. Render Featured Plots
function renderFeaturedPlots() {
  const container = document.getElementById('featured-plots-grid');
  if (!container || !window.plotsData) return;

  const featured = window.plotsData.filter(plot => plot.featured);
  container.innerHTML = featured.map(plot => renderPlotCardHtml(plot)).join('');
}

// 2. Render Ongoing Projects
function renderOngoingProjectsTeaser() {
  const container = document.getElementById('ongoing-projects-grid');
  if (!container || !window.projectsData) return;

  const ongoing = window.projectsData.filter(p => p.status === 'ongoing' || p.status === 'upcoming').slice(0, 3);
  const isHi = window.currentLang === 'hi';
  
  container.innerHTML = ongoing.map(proj => {
    const projName = isHi ? proj.name_hi || proj.name : proj.name;
    const projLocation = isHi ? proj.location_hi || proj.location : proj.location;
    
    const badgeLabel = proj.status === 'upcoming' 
      ? (isHi ? 'नया लॉन्च' : 'New Launch') 
      : (isHi ? 'चल रही है' : 'Ongoing');
      
    const badgeClass = proj.status === 'upcoming' ? 'bg-earth-500 text-white' : 'bg-forest-500 text-white';

    const highlights = isHi && proj.highlights_hi ? proj.highlights_hi : proj.highlights;
    const highlightsHtml = highlights.slice(0, 3).map(h => {
      return `<span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">${h}</span>`;
    }).join('');

    const availableText = proj.availablePlots > 0 
      ? (isHi ? `${proj.availablePlots} प्लॉट्स उपलब्ध` : `${proj.availablePlots} plots available`)
      : (isHi ? 'बिक चुका है' : 'Sold Out');

    return `
      <div class="card overflow-hidden group">
        <div class="relative h-52 overflow-hidden">
          <img src="${proj.image}" alt="${projName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute top-3 left-3">
            <span class="text-xs font-accent font-semibold px-2.5 py-1 rounded-full ${badgeClass}">${badgeLabel}</span>
          </div>
          <div class="absolute bottom-3 left-3 right-3 text-left">
            <h3 class="font-heading font-bold text-white text-base">${projName}</h3>
            <div class="flex items-center gap-1 text-white/70 text-xs mt-0.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${projLocation}
            </div>
          </div>
        </div>
        <div class="p-4 text-left">
          <div class="flex items-center justify-between mb-3 text-sm">
            <span class="text-slate-500">${availableText}</span>
          </div>
          <div class="flex flex-wrap gap-1 mb-4">
            ${highlightsHtml}
          </div>
          <a href="projects.html" class="btn-ghost text-sm group/link">
            ${isHi ? 'परियोजना देखें' : 'View Project'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 transition-transform group-hover/link:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// 3. Render Latest Blogs
function renderLatestBlogsTeaser() {
  const container = document.getElementById('latest-blogs-grid');
  if (!container || !window.blogPostsData) return;

  const latest = window.blogPostsData.slice(0, 3);
  const isHi = window.currentLang === 'hi';
  
  container.innerHTML = latest.map(post => {
    const postTitle = isHi ? post.title_hi || post.title : post.title;
    const postExcerpt = isHi ? post.excerpt_hi || post.excerpt : post.excerpt;
    const postCategory = isHi ? post.category_hi || post.category : post.category;

    return `
      <a href="blog.html" class="card overflow-hidden group block">
        <div class="h-44 overflow-hidden">
          <img src="${post.image}" alt="${postTitle}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="p-5 text-left">
          <div class="flex items-center gap-2 mb-3">
            <span class="bg-forest-100 text-forest-700 text-xs font-accent font-semibold px-2.5 py-1 rounded-full">${postCategory}</span>
            <span class="text-slate-400 text-xs flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              ${post.readTime} ${isHi ? 'मिनट' : 'min read'}
            </span>
          </div>
          <h3 class="font-heading font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-2 group-hover:text-forest-700 transition-colors">${postTitle}</h3>
          <p class="text-slate-500 text-sm line-clamp-2 leading-relaxed">${postExcerpt}</p>
        </div>
      </a>
    `;
  }).join('');
}

// 4. Setup Hero Search Form Redirection
function setupHeroSearchForm() {
  const form = document.getElementById('hero-search-form');
  const input = document.getElementById('hero-search-input');
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      window.location.href = `plots.html?q=${encodeURIComponent(query)}`;
    } else {
      window.location.href = `plots.html`;
    }
  });
}
