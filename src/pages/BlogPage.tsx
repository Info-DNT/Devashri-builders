import { useState } from 'react';
import { Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { blogPosts } from '../data/blog';

const categories = ['All', ...new Set(blogPosts.map(p => p.category))];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = blogPosts.filter(post => {
    const matchCat = category === 'All' || post.category === category;
    const matchSearch = !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts[0];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-forest-800 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-forest-300 text-sm font-accent font-semibold tracking-widest uppercase mb-2">Knowledge Centre</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">Land Investment Blog</h1>
          <p className="text-forest-300 max-w-xl">Legal guides, buyer tips, market analysis, and investment insights — everything you need before buying a plot.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured Post */}
        <div className="card overflow-hidden mb-10 md:flex">
          <div className="md:w-2/5 h-56 md:h-auto overflow-hidden">
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-forest-100 text-forest-700 text-xs font-accent font-semibold px-2.5 py-1 rounded-full">{featured.category}</span>
              <span className="text-slate-400 text-xs flex items-center gap-1"><Clock size={11} /> {featured.readTime} min read</span>
              <span className="text-slate-400 text-xs">· {featured.date}</span>
            </div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-snug">{featured.title}</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
            <button className="btn-ghost text-sm group/link self-start">
              Read Article
              <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-lg font-accent font-medium text-sm transition-all ${
                  category === c
                    ? 'bg-forest-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-forest-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Search size={32} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No articles found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <article key={post.id} className="card overflow-hidden group cursor-pointer">
                <div className="h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-forest-100 text-forest-700 text-xs font-accent font-semibold px-2.5 py-1 rounded-full">{post.category}</span>
                    <span className="text-slate-400 text-xs flex items-center gap-1"><Clock size={10} /> {post.readTime} min</span>
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-forest-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="text-xs text-slate-400">
                      <span className="font-medium text-slate-600">{post.author}</span> · {post.date}
                    </div>
                    <button className="btn-ghost text-xs group/link">
                      Read
                      <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-14 bg-forest-700 rounded-2xl p-8 text-center">
          <p className="text-forest-300 text-sm font-accent font-semibold tracking-widest uppercase mb-2">Free Resources</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">Get Our Free Plot Buyer's Checklist</h2>
          <p className="text-forest-200 max-w-md mx-auto mb-6 text-sm leading-relaxed">
            A practical PDF guide on 20 things to verify before buying any plot in UP. Used by 500+ buyers.
          </p>
          <form className="flex gap-2 max-w-sm mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-lg bg-forest-800/60 border border-forest-600 text-white placeholder-forest-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button type="submit" className="btn-secondary whitespace-nowrap text-sm py-3">
              Get Guide
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
