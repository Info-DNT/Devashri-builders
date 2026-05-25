import { useState } from 'react';
import { MapPin, Home, TrendingUp, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from '../router';
import { projects } from '../data/projects';
import type { ProjectStatus } from '../data/projects';
import LeadModal from '../components/LeadModal';

const statusBadge: Record<ProjectStatus, { label: string; cls: string }> = {
  ongoing: { label: 'Ongoing', cls: 'bg-forest-500 text-white' },
  upcoming: { label: 'New Launch', cls: 'bg-earth-500 text-white' },
  completed: { label: 'Completed', cls: 'bg-slate-500 text-white' },
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-forest-800 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-forest-300 text-sm font-accent font-semibold tracking-widest uppercase mb-2">All Developments</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">Our Projects</h1>
          <p className="text-forest-300 max-w-xl">
            From planned layouts to premium developments — explore all Devashri Builders plot projects across UP.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['all', 'ongoing', 'upcoming', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-full font-accent font-semibold text-sm transition-all ${
                filter === f
                  ? 'bg-forest-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-forest-300'
              }`}
            >
              {f === 'all' ? 'All Projects' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(proj => {
            const badge = statusBadge[proj.status];
            return (
              <div key={proj.id} className="card overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-accent font-semibold px-2.5 py-1 rounded-full ${badge.cls}`}>{badge.label}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-heading font-bold text-white text-base leading-snug">{proj.name}</h3>
                    <div className="flex items-center gap-1 text-white/70 text-xs mt-0.5">
                      <MapPin size={11} />
                      {proj.city}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">{proj.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-400 mb-0.5">Total Plots</p>
                      <p className="font-accent font-bold text-slate-800">{proj.totalPlots}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-400 mb-0.5">Available</p>
                      <p className={`font-accent font-bold ${proj.availablePlots > 0 ? 'text-forest-700' : 'text-slate-400'}`}>
                        {proj.availablePlots > 0 ? proj.availablePlots : 'Sold Out'}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-400 mb-0.5">Plot Sizes</p>
                      <p className="font-accent font-semibold text-slate-800 text-xs">{proj.plotSizes}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-400 mb-0.5">Price</p>
                      <p className="font-accent font-bold text-forest-700 text-xs">{proj.priceRange}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {proj.highlights.map(h => (
                      <span key={h} className="text-xs bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full">{h}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <Link to="/plots" className="btn-ghost text-sm group/link">
                      View Plots
                      <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="ml-auto btn-primary text-sm py-2"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-forest-700 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-forest-300 text-sm font-accent font-semibold tracking-widest uppercase mb-2">Pre-launch Offer</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Green Valley Enclave — Launching August 2025
          </h2>
          <p className="text-forest-200 max-w-lg mx-auto mb-6 leading-relaxed">
            Register your interest now for pre-launch pricing. 200 plots in a fully gated community on Mirzapur Road, Varanasi.
          </p>
          <button onClick={() => setModalOpen(true)} className="btn-secondary">
            <Calendar size={16} />
            Register Interest
          </button>
        </div>
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} title="Register Your Interest" />
    </div>
  );
}
