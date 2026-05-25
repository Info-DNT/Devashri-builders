import { Link } from '../router';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Bar */}
      <div className="bg-forest-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-accent font-semibold tracking-widest uppercase text-forest-200 mb-1">Stay Informed</p>
              <h3 className="font-heading text-2xl font-bold text-white">Get new plot alerts & investment tips</h3>
            </div>
            <form
              className="flex gap-2 w-full md:w-auto min-w-[320px]"
              onSubmit={e => { e.preventDefault(); }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-forest-800/60 border border-forest-600 text-white placeholder-forest-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-earth-500 hover:bg-earth-600 text-white font-accent font-semibold text-sm rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-forest-600 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div>
                  <span className="font-heading font-bold text-lg text-white block">Devashri Builders</span>
                  <span className="font-accent text-xs font-medium text-forest-400">Plots & Land</span>
                </div>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">
                Your trusted partner for residential plots in Uttar Pradesh. We believe every family deserves a piece of earth to call their own.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-forest-600 flex items-center justify-center transition-colors">
                  <Facebook size={14} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-forest-600 flex items-center justify-center transition-colors">
                  <Instagram size={14} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-forest-600 flex items-center justify-center transition-colors">
                  <Youtube size={14} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-accent font-semibold text-white text-sm tracking-wide mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'View All Plots', href: '/plots' },
                  { label: 'Our Projects', href: '/projects' },
                  { label: 'About Devashri Builders', href: '/about' },
                  { label: 'Blog & Resources', href: '/blog' },
                  { label: 'Contact Us', href: '/contact' },
                  { label: 'Book Site Visit', href: '/contact' },
                ].map(link => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-forest-400 transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div>
              <h4 className="font-accent font-semibold text-white text-sm tracking-wide mb-4">Our Projects</h4>
              <ul className="space-y-2.5">
                {[
                  'Kashi Puram Green City',
                  'Vinayak Puram Society',
                  'Bichchhi Residential Layout',
                  'Green Valley Enclave',
                  'Surya Nagar Colony',
                ].map(name => (
                  <li key={name}>
                    <Link to="/projects" className="text-sm text-slate-400 hover:text-forest-400 transition-colors">{name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-accent font-semibold text-white text-sm tracking-wide mb-4">Get in Touch</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin size={16} className="text-forest-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-400">
                    Near Chopan Hospital, Chopan-Sindhuriya Marg, Varanasi, UP 221001
                  </span>
                </li>
                <li>
                  <a href="tel:+917752957897" className="flex gap-3 text-slate-400 hover:text-forest-400 transition-colors">
                    <Phone size={16} className="text-forest-400 flex-shrink-0" />
                    <span className="text-sm">+91 77529 57897</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+918887890595" className="flex gap-3 text-slate-400 hover:text-forest-400 transition-colors">
                    <Phone size={16} className="text-forest-400 flex-shrink-0" />
                    <span className="text-sm">+91 88878 90595</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@bhoomiseva.com" className="flex gap-3 text-slate-400 hover:text-forest-400 transition-colors">
                    <Mail size={16} className="text-forest-400 flex-shrink-0" />
                    <span className="text-sm">info@bhoomiseva.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Devashri Builders Plots & Land. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link to="/about" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/about" className="hover:text-slate-400 transition-colors">Terms of Use</Link>
            <span>·</span>
            <span>RERA Registrations Available on Request</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
