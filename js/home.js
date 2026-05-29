// ── Devashri Builders — HomePage Logic ──

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProjects();
  renderOngoingProjectsTeaser();
  renderLatestBlogsTeaser();
  setupHeroSearchForm();
});

// Helper: Generate Project Card HTML
function renderProjectCardHtml(proj) {
  const isHi = window.currentLang === 'hi';
  const name = isHi ? proj.name_hi || proj.name : proj.name;
  const location = isHi ? proj.location_hi || proj.location : proj.location;
  
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

  const featuredBadge = proj.featured ? `<span class="badge-featured">${isHi ? 'विशेष' : 'Featured'}</span>` : '';

  const plotSizesText = isHi ? proj.plotSizes_hi || proj.plotSizes : proj.plotSizes;
  const areaText = isHi ? proj.area_hi || proj.area : proj.area;

  return `
    <div class="project-card card overflow-hidden group">
      <!-- Image -->
      <div class="relative h-48 overflow-hidden bg-slate-100">
        <img src="${proj.image || proj.images[0]}" alt="${name}" class="project-card-img w-full h-full object-cover transition-transform duration-500" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div class="absolute top-3 left-3 flex gap-2 flex-wrap items-center">
          <span class="${proj.status === 'upcoming' ? statusClass : 'text-xs font-accent font-semibold px-2.5 py-1 rounded-full ' + statusClass}">${statusLabel}</span>
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
          <div class="bg-slate-50 rounded-lg p-2 px-2.5">
            <p class="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wider">${isHi ? 'प्लॉट के आकार' : 'Plot Sizes'}</p>
            <p class="font-accent font-semibold text-xs text-slate-800 truncate">${plotSizesText}</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-2 px-2.5">
            <p class="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wider">${isHi ? 'कुल क्षेत्रफल' : 'Total Area'}</p>
            <p class="font-accent font-semibold text-xs text-slate-800 truncate">${areaText}</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <a href="projects.html?id=${proj.id}" class="btn-ghost text-sm group/link">
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

// 1. Render Featured Projects
function renderFeaturedProjects() {
  const container = document.getElementById('featured-projects-grid');
  if (!container || !window.projectsData) return;

  const featured = window.projectsData.filter(proj => proj.featured);
  container.innerHTML = featured.map(proj => renderProjectCardHtml(proj)).join('');
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
      window.location.href = `projects.html?q=${encodeURIComponent(query)}`;
    } else {
      window.location.href = `projects.html`;
    }
  });
}
