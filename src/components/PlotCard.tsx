import { Link } from '../router';
import { MapPin, Maximize2, Tag, ArrowRight } from 'lucide-react';
import type { Plot } from '../data/plots';

interface Props {
  plot: Plot;
}

const statusLabel: Record<Plot['status'], string> = {
  available: 'Available',
  sold: 'Sold Out',
  reserved: 'Reserved',
};

const statusClass: Record<Plot['status'], string> = {
  available: 'badge-available',
  sold: 'badge-sold',
  reserved: 'badge-reserved',
};

export default function PlotCard({ plot }: Props) {
  return (
    <div className="plot-card card overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={plot.images[0]}
          alt={plot.name}
          className="plot-card-img w-full h-full object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className={statusClass[plot.status]}>{statusLabel[plot.status]}</span>
          {plot.featured && <span className="badge-featured">Featured</span>}
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-white font-heading font-bold text-lg drop-shadow">
            ₹{(plot.totalPrice / 100000).toFixed(1)}L
          </span>
          <span className="text-white/80 text-xs ml-1">total</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-1">
          {plot.name}
        </h3>
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
          <MapPin size={13} className="text-forest-500 flex-shrink-0" />
          <span className="truncate">{plot.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-50 rounded-lg p-2.5">
            <p className="text-xs text-slate-400 mb-0.5">Plot Size</p>
            <p className="font-accent font-semibold text-sm text-slate-800">{plot.dimensions} ft</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-2.5">
            <p className="text-xs text-slate-400 mb-0.5">Rate</p>
            <p className="font-accent font-semibold text-sm text-slate-800">₹{plot.pricePerSqft}/sqft</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link
            to={`/plots/${plot.id}`}
            className="btn-ghost text-sm group/link"
          >
            View Details
            <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
          </Link>
          <a
            href={`https://wa.me/917752957897?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(plot.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-accent font-semibold text-[#25D366] hover:text-[#20bc5a] transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
