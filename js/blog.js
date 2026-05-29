// ── Devashri Builders — Blog Page Controller ──

let currentCategory = 'All';
let blogSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedPost();
  renderBlogCategories();
  renderBlogList();
  setupBlogSearch();
});

// Helper to get translated category label
function getCategoryLabel(cat) {
  const isHi = window.currentLang === 'hi';
  if (cat === 'All') return isHi ? 'सभी' : 'All';
  const post = window.blogPostsData.find(p => p.category === cat);
  return isHi && post && post.category_hi ? post.category_hi : cat;
}

// 1. Render Top Featured Post
function renderFeaturedPost() {
  const container = document.getElementById('featured-blog-container');
  if (!container || !window.blogPostsData || window.blogPostsData.length === 0) return;

  const featured = window.blogPostsData[0];
  const isHi = window.currentLang === 'hi';
  const title = isHi ? featured.title_hi || featured.title : featured.title;
  const excerpt = isHi ? featured.excerpt_hi || featured.excerpt : featured.excerpt;
  const category = isHi ? featured.category_hi || featured.category : featured.category;
  const date = isHi ? featured.date_hi || featured.date : featured.date;
  const author = isHi ? featured.author_hi || featured.author : featured.author;

  container.innerHTML = `
    <div class="card overflow-hidden mb-10 md:flex text-left">
      <div class="md:w-2/5 h-56 md:h-auto overflow-hidden">
        <img src="${featured.image}" alt="${title}" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 p-6 md:p-8 flex flex-col justify-center">
        <div class="flex items-center gap-2 mb-3">
          <span class="bg-forest-100 text-forest-700 text-xs font-accent font-semibold px-2.5 py-1 rounded-full">${category}</span>
          <span class="text-slate-400 text-xs flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${featured.readTime} ${isHi ? 'मिनट' : 'min read'}
          </span>
          <span class="text-slate-400 text-xs">· ${date}</span>
        </div>
        <h2 class="font-heading text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-snug">${title}</h2>
        <p class="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">${excerpt}</p>
        <button class="btn-ghost text-sm group/link self-start" onclick="alert('${isHi ? 'खोल रहा है' : 'Opening'}: ${title}')">
          ${window.getTranslation('blog_btn_read_featured')}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 transition-transform group-hover/link:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    </div>
  `;
}

// 2. Render Categories filter buttons
function renderBlogCategories() {
  const container = document.getElementById('blog-category-container');
  if (!container || !window.blogPostsData) return;

  const categories = ['All', ...new Set(window.blogPostsData.map(p => p.category))];

  container.innerHTML = categories.map(cat => {
    const isActive = currentCategory === cat;
    const activeClass = isActive 
      ? 'bg-forest-600 text-white' 
      : 'bg-white border border-slate-200 text-slate-600 hover:border-forest-300';
    const label = getCategoryLabel(cat);
    return `<button class="category-btn flex-shrink-0 px-4 py-2.5 rounded-lg font-accent font-medium text-sm transition-all ${activeClass}" data-category="${cat}">${label}</button>`;
  }).join('');

  // Bind click triggers
  const buttons = container.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentCategory = e.target.getAttribute('data-category');
      
      // Update visual active states
      buttons.forEach(b => {
        const isCurrent = b.getAttribute('data-category') === currentCategory;
        if (isCurrent) {
          b.className = 'category-btn flex-shrink-0 px-4 py-2.5 rounded-lg font-accent font-medium text-sm transition-all bg-forest-600 text-white';
        } else {
          b.className = 'category-btn flex-shrink-0 px-4 py-2.5 rounded-lg font-accent font-medium text-sm transition-all bg-white border border-slate-200 text-slate-600 hover:border-forest-300';
        }
      });

      renderBlogList();
    });
  });
}

// 3. Render Blog Post cards grid
function renderBlogList() {
  const container = document.getElementById('blog-grid');
  const emptyEl = document.getElementById('blog-empty-state');
  const searchDisplay = document.getElementById('blog-search-query-display');

  if (!container || !window.blogPostsData) return;
  const isHi = window.currentLang === 'hi';

  // Filter listings
  const filtered = window.blogPostsData.filter(post => {
    const matchCat = currentCategory === 'All' || post.category === currentCategory;
    const matchSearch = !blogSearchQuery ||
      post.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      (post.title_hi && post.title_hi.toLowerCase().includes(blogSearchQuery.toLowerCase())) ||
      post.excerpt.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      (post.excerpt_hi && post.excerpt_hi.toLowerCase().includes(blogSearchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  // Display empty state or items
  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    if (searchDisplay) searchDisplay.innerText = blogSearchQuery;
  } else {
    if (emptyEl) emptyEl.classList.add('hidden');

    container.innerHTML = filtered.map(post => {
      const title = isHi ? post.title_hi || post.title : post.title;
      const excerpt = isHi ? post.excerpt_hi || post.excerpt : post.excerpt;
      const category = isHi ? post.category_hi || post.category : post.category;
      const date = isHi ? post.date_hi || post.date : post.date;
      const author = isHi ? post.author_hi || post.author : post.author;

      return `
        <article class="card overflow-hidden group cursor-pointer text-left" onclick="alert('${isHi ? 'खोल रहा है' : 'Opening'}: ${title}')">
          <div class="h-44 overflow-hidden">
            <img src="${post.image}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div class="p-5">
            <div class="flex items-center gap-2 mb-3">
              <span class="bg-forest-100 text-forest-700 text-xs font-accent font-semibold px-2.5 py-1 rounded-full">${category}</span>
              <span class="text-slate-400 text-xs flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${post.readTime} ${isHi ? 'मिनट' : 'min'}
              </span>
            </div>
            <h3 class="font-heading font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-forest-700 transition-colors line-clamp-2">${title}</h3>
            <p class="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">${excerpt}</p>
            
            <div class="flex items-center justify-between pt-3 border-t border-slate-100">
              <div class="text-xs text-slate-400">
                <span class="font-medium text-slate-600">${author}</span> · ${date}
              </div>
              <button class="btn-ghost text-xs group/link">
                ${window.getTranslation('blog_btn_read')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3 transition-transform group-hover/link:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }
}

// 4. Setup blog search inputs
function setupBlogSearch() {
  const searchInput = document.getElementById('blog-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    blogSearchQuery = e.target.value.trim();
    renderBlogList();
  });
}
