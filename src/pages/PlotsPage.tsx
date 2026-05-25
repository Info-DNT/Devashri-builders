import { useState, useMemo } from 'react';
import { useSearchParams } from '../router';
import { Search, MapPin, SlidersHorizontal, X, Grid3x3 as Grid3X3, List, Map as MapIcon, ArrowUpDown } from 'lucide-react';
import PlotCard from '../components/PlotCard';
import LeadModal from '../components/LeadModal';
import { plots, cities, projectNames } from '../data/plots';
import type { PlotStatus } from '../data/plots';

type ViewMode = 'grid' | 'list';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc';

export default function PlotsPage() {
  const [searchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<PlotStatus | ''>('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [minArea, setMinArea] = useState(0);
  const [maxArea, setMaxArea] = useState(3000);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const filtered = useMemo(() => {
    let result = plots.filter(p => {
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) &&
            !p.location.toLowerCase().includes(q) &&
            !p.city.toLowerCase().includes(q) &&
            !p.project.toLowerCase().includes(q)) return false;
      }
      if (selectedCity && p.city !== selectedCity) return false;
      if (selectedProject && p.project !== selectedProject) return false;
      if (selectedStatus && p.status !== selectedStatus) return false;
      const priceLakhs = p.totalPrice / 100000;
      if (maxPrice > 0 && priceLakhs < minPrice) return false;
      if (maxPrice > 0 && priceLakhs > maxPrice) return false;
      if (p.area < minArea || p.area > maxArea) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-asc': result = [...result].sort((a, b) => a.totalPrice - b.totalPrice); break;
      case 'price-desc': result = [...result].sort((a, b) => b.totalPrice - a.totalPrice); break;
      case 'area-asc': result = [...result].sort((a, b) => a.area - b.area); break;
      case 'area-desc': result = [...result].sort((a, b) => b.area - a.area); break;
    }
    return result;
  }, [search, selectedCity, selectedProject, selectedStatus, minPrice, maxPrice, minArea, maxArea, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCity('');
    setSelectedProject('');
    setSelectedStatus('');
    setMinPrice(0);
    setMaxPrice(50);
    setMinArea(0);
    setMaxArea(3000);
    setSortBy('default');
  };

  const hasFilters = search || selectedCity || selectedProject || selectedStatus ||
    minPrice > 0 || maxPrice < 50 || minArea > 0 || maxArea < 3000;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-forest-800 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-forest-300 text-sm font-accent font-semibold tracking-widest uppercase mb-2">Browse & Buy</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">Available Plots</h1>
          <p className="text-forest-300 max-w-xl">
            RERA-approved residential plots across Varanasi, Sonbhadra, and Mirzapur. Filter by your requirements.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Controls */}
        <div className="bg-white rounded-2xl shadow-card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search plots, location, project..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="input-field w-auto text-sm"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-asc">Area: Small to Large</option>
                <option value="area-desc">Area: Large to Small</option>
              </select>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-accent font-medium text-sm transition-colors ${
                  filterOpen || hasFilters
                    ? 'bg-forest-600 border-forest-600 text-white'
                    : 'border-slate-200 text-slate-700 hover:border-forest-400'
                }`}
              >
                <SlidersHorizontal size={15} />
                Filters
                {hasFilters && <span className="w-2 h-2 bg-earth-400 rounded-full" />}
              </button>
              <div className="hidden sm:flex items-center gap-1 border border-slate-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-forest-100 text-forest-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Grid3X3 size={15} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-forest-100 text-forest-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {filterOpen && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-accent font-semibold text-slate-500 uppercase tracking-wide mb-2">City</label>
                  <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="input-field text-sm">
                    <option value="">All Cities</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-accent font-semibold text-slate-500 uppercase tracking-wide mb-2">Project</label>
                  <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} className="input-field text-sm">
                    <option value="">All Projects</option>
                    {projectNames.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-accent font-semibold text-slate-500 uppercase tracking-wide mb-2">Availability</label>
                  <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value as PlotStatus | '')} className="input-field text-sm">
                    <option value="">All Status</option>
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-accent font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Price: ₹{minPrice}L – ₹{maxPrice}L
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button onClick={clearFilters} className="text-sm text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors">
                  <X size={14} /> Clear all filters
                </button>
                <button onClick={() => setFilterOpen(false)} className="text-sm font-accent font-semibold text-forest-600">Done</button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-slate-600 text-sm">
            Showing <strong className="text-slate-900">{filtered.length}</strong> plots
            {hasFilters && <button onClick={clearFilters} className="ml-2 text-xs text-forest-600 hover:underline">Clear filters</button>}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary text-sm py-2"
          >
            Get Callback
          </button>
        </div>

        {/* Grid/List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-slate-400" />
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-700 mb-2">No plots found</h3>
            <p className="text-slate-500 mb-4">Try adjusting your search or filters.</p>
            <button onClick={clearFilters} className="btn-primary text-sm">Clear Filters</button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(plot => <PlotCard key={plot.id} plot={plot} />)}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(plot => (
              <div key={plot.id} className="card overflow-hidden flex flex-col sm:flex-row">
                <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src={plot.images[0]}
                    alt={plot.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h3 className="font-heading font-bold text-slate-900 text-lg leading-snug">{plot.name}</h3>
                      <div className="flex gap-2 flex-shrink-0">
                        <span className={plot.status === 'available' ? 'badge-available' : plot.status === 'sold' ? 'badge-sold' : 'badge-reserved'}>
                          {plot.status.charAt(0).toUpperCase() + plot.status.slice(1)}
                        </span>
                        {plot.featured && <span className="badge-featured">Featured</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
                      <MapPin size={13} className="text-forest-500" />
                      {plot.location}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div>
                      <span className="text-slate-400 text-xs block">Plot Size</span>
                      <span className="font-accent font-semibold text-slate-800">{plot.dimensions} ft</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs block">Rate</span>
                      <span className="font-accent font-semibold text-slate-800">₹{plot.pricePerSqft}/sqft</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs block">Total Price</span>
                      <span className="font-accent font-bold text-forest-700 text-base">₹{(plot.totalPrice / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <a
                        href={`/plots/${plot.id}`}
                        className="btn-outline text-sm py-2"
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
