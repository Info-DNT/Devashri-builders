import { useState } from 'react';
import { useParams, Link } from '../router';
import {
  MapPin, Maximize2, Tag, Shield, CheckCircle, Phone,
  Calendar, Download, ArrowLeft, ChevronLeft, ChevronRight,
  Star, Ruler, Compass, Building2, CreditCard, Share2
} from 'lucide-react';
import { getPlotById } from '../data/plots';
import LeadModal from '../components/LeadModal';

export default function PlotDetailPage() {
  const { id } = useParams();
  const plot = getPlotById(id!);
  const [imgIdx, setImgIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [stickyForm, setStickyForm] = useState({ name: '', phone: '' });
  const [formSent, setFormSent] = useState(false);

  if (!plot) {
    window.location.hash = '/plots';
    return null;
  }

  const statusColor = plot.status === 'available'
    ? 'bg-forest-100 text-forest-700'
    : plot.status === 'sold'
    ? 'bg-red-100 text-red-700'
    : 'bg-amber-100 text-amber-700';

  const handleStickySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-forest-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/plots" className="hover:text-forest-600 transition-colors">Plots</Link>
            <ChevronRight size={14} />
            <span className="text-slate-800 font-medium truncate">{plot.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main Content ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="card overflow-hidden">
              <div className="relative aspect-[16/9] bg-slate-100">
                <img
                  src={plot.images[imgIdx]}
                  alt={`${plot.name} - image ${imgIdx + 1}`}
                  className="w-full h-full object-cover"
                />
                {plot.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIdx(i => (i - 1 + plot.images.length) % plot.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setImgIdx(i => (i + 1) % plot.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {plot.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white w-5' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
                <div className={`absolute top-4 left-4 text-xs font-accent font-semibold px-3 py-1.5 rounded-full ${statusColor}`}>
                  {plot.status.charAt(0).toUpperCase() + plot.status.slice(1)}
                </div>
                {plot.featured && (
                  <div className="absolute top-4 right-4 badge-featured">Featured</div>
                )}
              </div>
              {plot.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {plot.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === imgIdx ? 'border-forest-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title + Key Info */}
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-1">{plot.name}</h1>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin size={15} className="text-forest-500" />
                    <span className="text-sm">{plot.location}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-heading text-3xl font-bold text-forest-700">
                    ₹{(plot.totalPrice / 100000).toFixed(2)}L
                  </p>
                  <p className="text-slate-500 text-sm">₹{plot.pricePerSqft}/sqft</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { icon: Ruler, label: 'Dimensions', val: `${plot.dimensions} ft` },
                  { icon: Maximize2, label: 'Total Area', val: `${plot.area} sqft` },
                  { icon: Compass, label: 'Facing', val: plot.facing },
                  { icon: Building2, label: 'Category', val: plot.category.charAt(0).toUpperCase() + plot.category.slice(1) },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                      <Icon size={12} />
                      {label}
                    </div>
                    <p className="font-accent font-semibold text-slate-800 text-sm">{val}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">{plot.description}</p>
            </div>

            {/* Highlights */}
            <div className="card p-6">
              <h2 className="font-heading font-bold text-slate-900 text-lg mb-4">Plot Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {plot.highlights.map(h => (
                  <div key={h} className="flex items-center gap-2.5">
                    <CheckCircle size={16} className="text-forest-500 flex-shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Status */}
            <div className="card p-6 border-l-4 border-forest-500">
              <div className="flex items-start gap-3">
                <Shield size={22} className="text-forest-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-heading font-bold text-slate-900 text-lg mb-1">Legal Status</h2>
                  <p className="text-sm text-slate-600 mb-3">RERA Registered Layout with clear title and government approvals.</p>
                  <div className="bg-forest-50 rounded-lg px-4 py-3 inline-block">
                    <p className="text-xs text-forest-600 font-accent font-medium">RERA Registration</p>
                    <p className="text-forest-800 font-accent font-bold text-sm">{plot.rera}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="card p-6">
              <h2 className="font-heading font-bold text-slate-900 text-lg mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {plot.amenities.map(a => (
                  <span key={a} className="bg-forest-50 text-forest-700 text-sm font-accent font-medium px-3 py-1.5 rounded-lg border border-forest-100">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Nearby */}
            {plot.nearby.length > 0 && (
              <div className="card p-6">
                <h2 className="font-heading font-bold text-slate-900 text-lg mb-4">Nearby Infrastructure</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {plot.nearby.map(n => (
                    <div key={n.label} className="flex items-center justify-between py-2.5 px-3 bg-slate-50 rounded-xl">
                      <span className="text-sm text-slate-700 font-medium">{n.label}</span>
                      <span className="text-xs font-accent font-semibold text-forest-600 bg-forest-100 px-2.5 py-1 rounded-full">{n.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Plans */}
            {plot.paymentPlans.length > 0 && (
              <div className="card p-6">
                <h2 className="font-heading font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-forest-600" />
                  Payment Plans
                </h2>
                <div className="space-y-3">
                  {plot.paymentPlans.map((plan, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl p-4 hover:border-forest-300 transition-colors">
                      <p className="font-accent font-semibold text-slate-800 text-sm mb-1">{plan.name}</p>
                      <p className="text-slate-600 text-sm">{plan.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map placeholder */}
            <div className="card overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <h2 className="font-heading font-bold text-slate-900 text-lg">Location Map</h2>
              </div>
              <div className="h-64 bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-forest-400 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">{plot.location}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(plot.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-sm mt-2"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sticky Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Quick Inquiry */}
              <div className="card p-5">
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">Interested in this plot?</h3>
                <p className="text-slate-500 text-sm mb-4">Leave your number. We'll call you within 2 hours.</p>

                {formSent ? (
                  <div className="bg-forest-50 border border-forest-200 rounded-xl p-4 text-center">
                    <CheckCircle className="text-forest-600 mx-auto mb-2" size={24} />
                    <p className="text-forest-800 font-accent font-semibold text-sm">Request received!</p>
                    <p className="text-forest-600 text-xs mt-1">Our team will call you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleStickySubmit} className="space-y-3">
                    <input
                      type="text"
                      required
                      value={stickyForm.name}
                      onChange={e => setStickyForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your Name"
                      className="input-field text-sm"
                    />
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">+91</span>
                      <input
                        type="tel"
                        required
                        value={stickyForm.phone}
                        onChange={e => setStickyForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="Mobile Number"
                        className="input-field pl-12 text-sm"
                        maxLength={10}
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center text-sm py-3">
                      <Phone size={15} />
                      Request Callback
                    </button>
                  </form>
                )}

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-forest-300 text-forest-700 font-accent font-semibold text-xs py-2.5 rounded-lg hover:bg-forest-50 transition-colors"
                  >
                    <Calendar size={13} />
                    Site Visit
                  </button>
                  <a
                    href={`https://wa.me/917752957897?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(plot.name)}%20at%20${encodeURIComponent(plot.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bc5a] text-white font-accent font-semibold text-xs py-2.5 rounded-lg transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Price Summary */}
              <div className="card p-5">
                <h3 className="font-accent font-semibold text-slate-700 text-sm mb-3">Price Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Plot Area</span>
                    <span className="font-medium text-slate-800">{plot.area} sqft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rate per sqft</span>
                    <span className="font-medium text-slate-800">₹{plot.pricePerSqft}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-2 mt-2 flex justify-between">
                    <span className="font-accent font-semibold text-slate-800">Total Price</span>
                    <span className="font-heading font-bold text-forest-700 text-lg">
                      ₹{(plot.totalPrice / 100000).toFixed(2)}L
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3">* Registration & stamp duty extra. EMI plans available.</p>
              </div>

              {/* Download Brochure */}
              <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-forest-400 text-slate-600 hover:text-forest-700 font-accent font-medium text-sm py-3.5 rounded-xl transition-all">
                <Download size={16} />
                Download Brochure
              </button>

              {/* Share */}
              <button
                onClick={() => navigator.share?.({ title: plot.name, url: window.location.href })}
                className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-forest-600 font-accent text-sm py-2 transition-colors"
              >
                <Share2 size={14} />
                Share this plot
              </button>
            </div>
          </div>
        </div>
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} plotName={plot.name} />
    </div>
  );
}
