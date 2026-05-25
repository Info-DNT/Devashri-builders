import { Shield, Users, Award, TrendingUp, CheckCircle, Heart } from 'lucide-react';
import { Link } from '../router';

const team = [
  {
    name: 'Ramesh Kumar Verma',
    role: 'Founder & Director',
    bio: '20+ years in land development across Eastern UP. Pioneer in RERA-compliant residential layouts.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Priya Singh',
    role: 'Head of Legal & Compliance',
    bio: 'LLB from BHU. Expert in land law, RERA compliance, and title verification across Varanasi & Sonbhadra.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Amit Tiwari',
    role: 'Sales & Customer Relations',
    bio: 'Your point of contact from first inquiry to final registry. 8 years guiding families through their plot journey.',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const milestones = [
  { year: '2016', title: 'Founded Devashri Builders', desc: 'Started with one layout in Varanasi with a simple belief — every family deserves land they can trust.' },
  { year: '2018', title: 'First 100 Plots Sold', desc: 'Completed Surya Nagar Colony, Mirzapur — 60 plots, all registered on time.' },
  { year: '2020', title: 'RERA Compliance', desc: 'First plot company in the region to proactively register all projects under UP-RERA.' },
  { year: '2022', title: '500 Families Served', desc: 'Crossed the milestone of 500 families who now own land through Devashri Builders.' },
  { year: '2024', title: '3 Active Projects', desc: 'Simultaneously developing Kashi Puram Green City, Vinayak Puram Society, and Bichchhi Layout.' },
  { year: '2025', title: 'Green Valley Launch', desc: 'Our largest project yet — 200 plots in a fully gated enclave on Mirzapur Road.' },
];

const values = [
  { icon: Shield, title: 'Integrity First', desc: 'We only sell what we can legally and morally stand behind. No false claims, no hidden costs.' },
  { icon: Heart, title: 'Customer for Life', desc: 'Our relationship doesn\'t end at registry. We support buyers for years after the purchase.' },
  { icon: TrendingUp, title: 'Long-term Thinking', desc: 'We choose locations for their 10-year potential, not just immediate profitability.' },
  { icon: Users, title: 'Community Building', desc: 'Our layouts are designed as communities — not just collections of plots.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-forest-900 pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <p className="text-forest-300 text-sm font-accent font-semibold tracking-widest uppercase mb-3">Our Story</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Built on Trust. <br />
              <span className="text-earth-400 italic">Rooted in Land.</span>
            </h1>
            <p className="text-forest-200 text-lg leading-relaxed max-w-2xl">
              Devashri Builders started with a simple conviction — that buying a plot of land should be as straightforward and trustworthy as any other honest transaction. Since 2016, we've helped over 1,200 families find, own, and love their land in Eastern Uttar Pradesh.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-2">Who We Are</p>
              <h2 className="section-title mb-5">Not Just a Plot Company</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Devashri Builders is an exclusive plots and land company based in Varanasi, operating across Eastern UP. We do not construct buildings. We do not market apartments. We do one thing: help families and investors find, verify, and own clean, legal residential plots.
                </p>
                <p>
                  Every layout we develop goes through months of legal due diligence — title search, NA conversion, RERA registration, and government road access — before a single plot is offered for sale. We believe the paperwork is as important as the land itself.
                </p>
                <p>
                  Our team of legal experts, land acquisition specialists, and customer relationship managers ensures that from your first enquiry to the day you receive registry papers, you are guided at every step.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: 'Years in Business', val: '8+' },
                  { label: 'Plots Delivered', val: '500+' },
                  { label: 'Happy Families', val: '1,200+' },
                  { label: 'Active Projects', val: '5' },
                ].map(s => (
                  <div key={s.label} className="bg-forest-50 rounded-xl p-4">
                    <p className="font-heading text-3xl font-bold text-forest-700">{s.val}</p>
                    <p className="text-slate-500 text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Land overview"
                className="rounded-2xl w-full aspect-[4/3] object-cover shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <Award className="text-earth-500" size={24} />
                  <div>
                    <p className="font-accent font-bold text-slate-900 text-sm">RERA Compliant</p>
                    <p className="text-slate-500 text-xs">All projects registered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label mb-2">Our Principles</p>
            <h2 className="section-title mb-3">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(v => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card p-6 text-center">
                  <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-forest-600" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="section-label mb-2">Our Journey</p>
            <h2 className="section-title">8 Years of Growth</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-forest-100" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="card p-5 inline-block text-left">
                      <p className="font-accent font-bold text-earth-500 text-sm mb-1">{m.year}</p>
                      <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">{m.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-8 flex-shrink-0 z-10">
                    <div className="w-8 h-8 bg-forest-600 rounded-full flex items-center justify-center">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label mb-2">The People</p>
            <h2 className="section-title mb-3">Meet Our Team</h2>
            <p className="section-subtitle mx-auto text-center">Experienced professionals dedicated to making your land purchase seamless.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map(member => (
              <div key={member.name} className="card overflow-hidden text-center">
                <div className="h-48 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-slate-900 text-base">{member.name}</h3>
                  <p className="text-forest-600 text-xs font-accent font-semibold mt-0.5 mb-2">{member.role}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-800 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">Ready to own your land?</h2>
          <p className="text-forest-300 mb-6">Talk to our team today. No pressure, just honest advice.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/plots" className="btn-secondary">Browse Plots</Link>
            <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-forest-800">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
