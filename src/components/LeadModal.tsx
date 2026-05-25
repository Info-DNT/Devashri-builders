import { useState } from 'react';
import { X, Phone, Calendar, MessageSquare, CheckCircle } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  plotName?: string;
}

export default function LeadModal({ open, onClose, title = 'Book a Free Site Visit', plotName }: Props) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [form, setForm] = useState({ name: '', phone: '', date: '', message: '' });
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1000);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep('form'); setForm({ name: '', phone: '', date: '', message: '' }); }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="bg-forest-700 px-6 py-5">
          <button onClick={handleClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
            <X size={20} />
          </button>
          <p className="text-forest-200 text-xs font-accent font-semibold tracking-widest uppercase mb-1">Free Consultation</p>
          <h2 className="font-heading text-xl font-bold text-white">{title}</h2>
          {plotName && <p className="text-forest-300 text-sm mt-1">{plotName}</p>}
        </div>

        <div className="p-6">
          {step === 'success' ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-forest-600" size={32} />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Request Submitted!</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Our team will call you within 2 hours to confirm your site visit. You can also WhatsApp us for faster response.
              </p>
              <div className="flex gap-3 justify-center">
                <a
                  href="https://wa.me/917752957897"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm py-2.5"
                >
                  Open WhatsApp
                </a>
                <button onClick={handleClose} className="btn-outline text-sm py-2.5">Close</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-accent font-medium text-slate-700 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Ramesh Gupta"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-accent font-medium text-slate-700 mb-1.5">Mobile Number *</label>
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
              <div>
                <label className="block text-sm font-accent font-medium text-slate-700 mb-1.5">Preferred Visit Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="input-field"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-accent font-medium text-slate-700 mb-1.5">Message (optional)</label>
                <textarea
                  rows={2}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Any specific queries or requirements?"
                  className="input-field resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3.5 text-base"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>
                    <Calendar size={16} />
                    Book Site Visit
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-400">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
