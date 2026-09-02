import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';
import SectionHeading from './SectionHeading';

const services = [
  'Signature Glow Facial',
  'Couture Hair Styling',
  'Editorial Makeup',
  'Luxe Nail Atelier',
  'Ritual Body Spa',
  'Bridal Glow Ritual',
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: services[0],
    date: '',
    message: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', phone: '', service: services[0], date: '', message: '' });
    }, 3500);
  };

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-cream placeholder-cream/40 outline-none transition-colors focus:border-rose-300/60 focus:bg-white/10';

  return (
    <section id="contact" className="relative section-pad py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,142,114,0.06),transparent_50%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Reservation"
          title={<>Book your <span className="italic text-gradient-rose">moment</span></>}
          subtitle="Tell us a little about what you're dreaming of. We'll confirm availability within 4 hours."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-7 md:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-cream/50">
                  Full name
                </label>
                <input
                  required name="name" value={form.name} onChange={handleChange}
                  placeholder="Priya Malhotra" className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-cream/50">
                  Phone
                </label>
                <input
                  required name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+91 98765 43210" className={inputClass}
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-cream/50">
                Email
              </label>
              <input
                required type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="you@email.com" className={inputClass}
              />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-cream/50">
                  Service
                </label>
                <select
                  name="service" value={form.service} onChange={handleChange}
                  className={`${inputClass} appearance-none`}
                >
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-inksoft">{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-cream/50">
                  Preferred date
                </label>
                <input
                  type="date" name="date" value={form.date} onChange={handleChange}
                  className={`${inputClass} [color-scheme:dark]`}
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-cream/50">
                Notes (optional)
              </label>
              <textarea
                name="message" value={form.message} onChange={handleChange} rows="3"
                placeholder="Tell us about your occasion, inspiration, or any skin concerns..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={sent}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-rose-gold py-4 font-medium text-ink shadow-glow transition-shadow hover:shadow-[0_0_50px_-8px_rgba(255,77,141,0.6)] disabled:opacity-70"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={18} /> Request received
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <Send size={16} /> Request appointment
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>

          {/* Contact info + map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: MapPin, label: 'Visit', value: '12 Marine Drive, Mumbai 400020' },
                { icon: Phone, label: 'Call', value: '+91 98765 43210' },
                { icon: Mail, label: 'Email', value: 'hello@luxeglow.studio' },
                { icon: Clock, label: 'Hours', value: 'Mon–Sun · 10am–8pm' },
              ].map((c) => (
                <div key={c.label} className="glass rounded-2xl p-5">
                  <c.icon size={18} className="text-rose-300" />
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-cream/50">
                    {c.label}
                  </p>
                  <p className="mt-1 text-sm text-cream/80">{c.value}</p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-3xl glass">
              <iframe
                title="LUXE GLOW location"
                src="https://www.google.com/maps?q=Marine+Drive+Mumbai&output=embed"
                width="100%"
                height="280"
                style={{ border: 0, filter: 'grayscale(0.4) invert(0.9) contrast(1.1)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
