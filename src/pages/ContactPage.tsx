import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, Calendar, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '', type: 'inquiry' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-forest-800 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-forest-300 text-sm font-accent font-semibold tracking-widest uppercase mb-2">Reach Out</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-forest-300 max-w-xl">Have a question, want to book a site visit, or just exploring? We're here to help — with no pressure.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            {/* Quick Actions */}
            <div className="card p-5">
              <h3 className="font-heading font-bold text-slate-900 mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <a
                  href="tel:+917752957897"
                  className="flex items-center gap-3 p-3 bg-forest-50 hover:bg-forest-100 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-accent">Call Us</p>
                    <p className="font-accent font-semibold text-slate-800 text-sm">+91 77529 57897</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/917752957897?text=Hi%20Devashri%20Builders%2C%20I%20have%20a%20query"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-accent">WhatsApp</p>
                    <p className="font-accent font-semibold text-slate-800 text-sm">Chat Instantly</p>
                  </div>
                </a>
                <a
                  href="mailto:info@bhoomiseva.com"
                  className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 bg-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-accent">Email</p>
                    <p className="font-accent font-semibold text-slate-800 text-sm">info@bhoomiseva.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="card p-5">
              <h3 className="font-heading font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock size={16} className="text-forest-600" />
                Office Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Monday – Saturday</span>
                  <span className="font-accent font-semibold text-slate-800">9 AM – 7 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sunday</span>
                  <span className="font-accent font-semibold text-slate-800">10 AM – 4 PM</span>
                </div>
                <div className="mt-3 bg-forest-50 rounded-lg p-3 text-xs text-forest-700">
                  Site visits available 7 days a week by appointment.
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="card p-5">
              <h3 className="font-heading font-bold text-slate-900 mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-forest-600" />
                Office Address
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Near Chopan Hospital,<br />
                Chopan-Sindhuriya Marg,<br />
                Varanasi, Uttar Pradesh 221001
              </p>
              <a
                href="https://maps.google.com/?q=Chopan+Sindhuriya+Marg+Varanasi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm mt-3"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-6 md:p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-forest-600" size={32} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">Message Received!</h3>
                  <p className="text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. Our team will get back to you within 2 business hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', subject: '', message: '', type: 'inquiry' }); }}
                    className="btn-primary mt-6"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Send us a Message</h2>
                  <p className="text-slate-500 text-sm mb-6">We respond to all inquiries within 2 business hours.</p>

                  {/* Type selector */}
                  <div className="flex gap-2 mb-6">
                    {[
                      { val: 'inquiry', label: 'General Inquiry', icon: MessageSquare },
                      { val: 'sitevisit', label: 'Book Site Visit', icon: Calendar },
                      { val: 'callback', label: 'Request Callback', icon: Phone },
                    ].map(({ val, label, icon: Icon }) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, type: val }))}
                        className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border font-accent font-medium text-xs sm:text-sm transition-all ${
                          form.type === val
                            ? 'bg-forest-600 border-forest-600 text-white'
                            : 'border-slate-200 text-slate-600 hover:border-forest-300'
                        }`}
                      >
                        <Icon size={14} />
                        {label}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-accent font-medium text-slate-700 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Ramesh Kumar"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-accent font-medium text-slate-700 mb-1.5">Mobile *</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">+91</span>
                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            placeholder="98765 43210"
                            className="input-field pl-12"
                            maxLength={10}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-accent font-medium text-slate-700 mb-1.5">Email (optional)</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-accent font-medium text-slate-700 mb-1.5">Subject</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                        placeholder="e.g. Interested in Kashi Puram Green City"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-accent font-medium text-slate-700 mb-1.5">Message</label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Tell us about your requirements — budget, preferred location, plot size..."
                        className="input-field resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center py-4 text-base"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-8 card overflow-hidden">
          <div className="h-64 bg-slate-100 flex items-center justify-center relative">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: 'url(https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=1600)' }}
            />
            <div className="relative text-center">
              <MapPin size={36} className="text-forest-500 mx-auto mb-2" />
              <p className="font-accent font-semibold text-slate-800">Devashri Builders Office</p>
              <p className="text-slate-500 text-sm">Near Chopan Hospital, Varanasi</p>
              <a
                href="https://maps.google.com/?q=Chopan+Sindhuriya+Marg+Varanasi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm mt-3"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
