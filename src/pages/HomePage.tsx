import { useState, useEffect, useRef } from 'react';
import { Link } from '../router';
import {
  Search, MapPin, ArrowRight, CheckCircle, Star, Phone,
  Leaf, Shield, Map, Users, TrendingUp, Calendar,
  ChevronRight, Quote, Building2, Award, Clock
} from 'lucide-react';
import PlotCard from '../components/PlotCard';
import LeadModal from '../components/LeadModal';
import { getFeaturedPlots } from '../data/plots';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blog';

function useOnScreen(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function AnimSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`animate-on-scroll ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '500+', label: 'Plots Sold' },
  { value: '1,200+', label: 'Happy Families' },
  { value: '5', label: 'Active Projects' },
];

const whyUsItems = [
  {
    icon: Shield,
    title: 'Legal Clarity Guaranteed',
    desc: 'Every plot comes with verified title, RERA approval, NA order, and all government approvals. Zero legal ambiguity.',
  },
  {
    icon: Map,
    title: 'Prime Location Intelligence',
    desc: 'We only acquire land near highways, hospitals, and growth corridors. Every location is backed by infrastructure research.',
  },
  {
    icon: Leaf,
    title: 'Clean, Green Environments',
    desc: 'Our layouts prioritize green spaces, wide roads, and clean surroundings — not just plot count.',
  },
  {
    icon: Users,
    title: 'End-to-End Support',
    desc: 'From site visit to registry — our team handles documentation, loan assistance, and registration.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Appreciation',
    desc: 'Our past projects have delivered 40–80% appreciation in 3–5 years. We invest where growth is certain.',
  },
  {
    icon: Award,
    title: 'Transparent Pricing',
    desc: 'No hidden charges. What you see is what you pay. All taxes, registration costs disclosed upfront.',
  },
];

const howItWorks = [
  { step: '01', title: 'Browse & Select', desc: 'Explore our plots online — filter by location, size, and budget. Shortlist your favorites.' },
  { step: '02', title: 'Book a Site Visit', desc: 'Schedule a free site visit at your convenience. Our team will guide you personally.' },
  { step: '03', title: 'Choose Your Plot', desc: 'Select your preferred plot, finalize dimensions, facing, and payment plan.' },
  { step: '04', title: 'Register & Celebrate', desc: 'Complete documentation and registry with our full assistance. The land is yours.' },
];

const testimonials = [
  {
    name: 'Suresh Kumar Gupta',
    location: 'Varanasi',
    text: 'We were looking for a plot near Varanasi for 2 years. Devashri Builders made the process so transparent — no hidden costs, clear documents. Our plot in Kashi Puram Green City is everything we wanted.',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Priya Verma',
    location: 'NRI – Dubai',
    text: 'As an NRI I was skeptical about buying land remotely. The team handled everything — power of attorney, site visits on video call, documents couriered to Dubai. Absolutely hassle-free.',
    rating: 5,
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Rajendra Prasad',
    location: 'Sonbhadra',
    text: 'Bought a plot in Vinayak Puram Society for my son\'s future. The price was fair, the area is well-planned, and within 2 years it\'s already appreciated significantly. Highly recommend.',
    rating: 5,
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const featuredPlots = getFeaturedPlots();
  const ongoingProjects = projects.filter(p => p.status === 'ongoing' || p.status === 'upcoming').slice(0, 3);

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hero" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1600)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        {/* Decorative shapes */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-earth-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-sand-500/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-earth-500/20 border border-earth-400/30 text-earth-200 text-xs font-accent font-semibold px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            <Building2 size={12} />
            <span>Exclusive Plots & Residential Land — Uttar Pradesh</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 max-w-5xl mx-auto">
            Own a Piece of Earth.{' '}
            <span className="text-gradient-warm italic">Build Your Legacy.</span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Legally clear, RERA-approved residential plots in Varanasi, Sonbhadra & Mirzapur.
            Transparent pricing. Flexible payment. Complete peace of mind.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-hero p-2 flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-3">
                <MapPin size={18} className="text-forest-500 flex-shrink-0" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={e => setSearchLocation(e.target.value)}
                  placeholder="Search by city, project or location..."
                  className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm focus:outline-none py-2"
                />
              </div>
              <Link
                to={`/plots${searchLocation ? `?q=${encodeURIComponent(searchLocation)}` : ''}`}
                className="btn-primary rounded-lg px-5 py-2.5 text-sm whitespace-nowrap"
              >
                <Search size={15} />
                Search Plots
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-secondary"
            >
              <Calendar size={16} />
              Book Free Site Visit
            </button>
            <Link to="/plots" className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-accent font-semibold transition-colors">
              Explore All Plots
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-float">
            <span className="text-slate-400 text-xs font-accent">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border-2 border-slate-500/50 flex items-start justify-center pt-1">
              <div className="w-1 h-2 bg-earth-400 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Trust Bar ──────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-8 px-6 gap-1 text-center">
                <span className="font-heading text-3xl sm:text-4xl font-bold text-slate-800">{s.value}</span>
                <span className="text-slate-500 text-sm font-accent">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Plots ───────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="section-label mb-2">Handpicked for You</p>
              <h2 className="section-title">Featured Plots</h2>
              <p className="section-subtitle mt-3">
                Carefully selected plots with clear titles, prime locations, and the best value for your investment.
              </p>
            </div>
            <Link to="/plots" className="btn-outline whitespace-nowrap flex-shrink-0">
              View All Plots
              <ArrowRight size={16} />
            </Link>
          </AnimSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlots.map((plot, i) => (
              <AnimSection key={plot.id} className={`transition-delay-${i * 100}`}>
                <PlotCard plot={plot} />
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center max-w-3xl mx-auto mb-16">
            <p className="section-label mb-2">Our Promise</p>
            <h2 className="section-title mb-4">Why Families Trust Devashri Builders</h2>
            <p className="section-subtitle mx-auto text-center">
              We are not just plot sellers — we are partners in your land journey, with a focus on integrity, transparency, and long-term value.
            </p>
          </AnimSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUsItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimSection key={i}>
                  <div className="p-6 rounded-2xl border border-slate-100 hover:border-forest-200 hover:bg-forest-50/30 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-forest-100 group-hover:bg-forest-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
                      <Icon size={22} className="text-forest-600" />
                    </div>
                    <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </AnimSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="py-20 bg-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-earth-400 text-sm font-accent font-semibold tracking-widest uppercase mb-2">Simple Process</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">How to Buy Your Plot</h2>
            <p className="text-forest-300 leading-relaxed">From browsing to registry — our process is designed to be simple, transparent, and stress-free.</p>
          </AnimSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <AnimSection key={i}>
                <div className="relative">
                  {i < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-forest-700 z-0" style={{ width: '100%' }} />
                  )}
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-forest-700 border-2 border-forest-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="font-accent font-bold text-earth-400 text-lg">{step.step}</span>
                    </div>
                    <h3 className="font-heading font-bold text-white text-lg mb-2">{step.title}</h3>
                    <p className="text-forest-300 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>

          <AnimSection className="text-center mt-12">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-secondary"
            >
              <Calendar size={16} />
              Start with a Free Site Visit
            </button>
          </AnimSection>
        </div>
      </section>

      {/* ── Upcoming Projects ────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="section-label mb-2">Active & New Launches</p>
              <h2 className="section-title">Our Projects</h2>
              <p className="section-subtitle mt-3">Thoughtfully planned residential layouts with all amenities, legal clearances, and growth potential.</p>
            </div>
            <Link to="/projects" className="btn-outline whitespace-nowrap flex-shrink-0">
              All Projects
              <ArrowRight size={16} />
            </Link>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ongoingProjects.map((proj, i) => (
              <AnimSection key={proj.id}>
                <div className="card overflow-hidden group">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-accent font-semibold px-2.5 py-1 rounded-full ${
                        proj.status === 'upcoming'
                          ? 'bg-earth-500 text-white'
                          : 'bg-forest-500 text-white'
                      }`}>
                        {proj.status === 'upcoming' ? 'New Launch' : 'Ongoing'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-heading font-bold text-white text-base">{proj.name}</h3>
                      <div className="flex items-center gap-1 text-white/70 text-xs mt-0.5">
                        <MapPin size={11} />
                        {proj.location}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <span className="text-slate-500">{proj.availablePlots} plots available</span>
                      <span className="font-accent font-semibold text-forest-700">{proj.priceRange}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {proj.highlights.slice(0, 3).map(h => (
                        <span key={h} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{h}</span>
                      ))}
                    </div>
                    <Link to="/projects" className="btn-ghost text-sm group/link">
                      View Project
                      <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-earth-600">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-earth-700/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimSection>
            <p className="text-earth-200 text-sm font-accent font-semibold tracking-widest uppercase mb-3">Limited Availability</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to Find Your <br className="hidden sm:block" /> Perfect Plot?
            </h2>
            <p className="text-earth-100/80 text-lg max-w-xl mx-auto mb-8">
              Schedule a free site visit today and see your future land in person. No commitment required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-earth-700 font-accent font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 text-base"
              >
                <Calendar size={18} />
                Book Free Site Visit
              </button>
              <a
                href="tel:+917752957897"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white/60 hover:border-white text-white font-accent font-semibold px-8 py-4 rounded-xl transition-all text-base"
              >
                <Phone size={18} />
                Call Now
              </a>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label mb-2">Customer Stories</p>
            <h2 className="section-title mb-3">Families Who Found Their Ground</h2>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimSection key={i}>
                <div className="card p-6">
                  <Quote size={28} className="text-forest-200 mb-4" />
                  <p className="text-slate-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="text-earth-500 fill-earth-500" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-accent font-semibold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-slate-500 text-xs">{t.location}</p>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Preview ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="section-label mb-2">Knowledge Centre</p>
              <h2 className="section-title">Land Investment Insights</h2>
              <p className="section-subtitle mt-3">Guides, legal tips, and market analysis — everything you need before buying a plot.</p>
            </div>
            <Link to="/blog" className="btn-outline whitespace-nowrap flex-shrink-0">
              All Articles
              <ArrowRight size={16} />
            </Link>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map(post => (
              <AnimSection key={post.id}>
                <Link to="/blog" className="card overflow-hidden group block">
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
                      <span className="text-slate-400 text-xs flex items-center gap-1">
                        <Clock size={11} /> {post.readTime} min read
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-2 group-hover:text-forest-700 transition-colors">{post.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  </div>
                </Link>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
