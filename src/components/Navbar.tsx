import { useState, useEffect } from 'react';
import { Link, useLocation } from '../router';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Plots', href: '/plots' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.path === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.path]);

  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-forest-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-forest-700 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <span className={`font-heading font-bold text-lg leading-none block transition-colors ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
                Devashri Builders
              </span>
              <span className={`font-accent text-xs font-medium tracking-wide transition-colors ${isTransparent ? 'text-forest-200' : 'text-forest-600'}`}>
                Plots & Land
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link relative px-4 py-2 font-accent font-medium text-sm rounded-md transition-colors duration-200 ${
                  location.path === link.href
                    ? isTransparent
                      ? 'text-white'
                      : 'text-forest-600'
                    : isTransparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-slate-600 hover:text-forest-600'
                } ${location.path === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+917752957897"
              className={`hidden md:flex items-center gap-1.5 font-accent text-sm font-semibold transition-colors ${
                isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-forest-600'
              }`}
            >
              <Phone size={14} />
              <span>77529 57897</span>
            </a>
            <Link
              to="/plots"
              className="hidden md:inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-white font-accent font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
            >
              View Plots
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden p-2 rounded-md transition-colors ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-slate-100 px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`block px-4 py-3 font-accent font-medium text-sm rounded-lg transition-colors ${
                location.path === link.href
                  ? 'bg-forest-50 text-forest-700'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-forest-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 pb-1 flex items-center gap-3 border-t border-slate-100">
            <a
              href="tel:+917752957897"
              className="flex items-center gap-2 text-slate-700 font-accent font-medium text-sm"
            >
              <Phone size={14} className="text-forest-600" />
              77529 57897
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
