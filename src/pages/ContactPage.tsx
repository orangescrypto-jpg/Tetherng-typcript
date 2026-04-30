import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="section-heading text-4xl md:text-5xl">Contact Us</h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
            Have a question, dispute, or partnership inquiry? Our support team typically responds within 2 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10">
                  <Mail className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Email Us</h3>
                  <p className="text-sm text-muted mt-1">support@tetherng.com</p>
                  <p className="text-xs text-muted">Typical reply within 2 hours</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10">
                  <Phone className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Call Us</h3>
                  <p className="text-sm text-muted mt-1">+234 (0) 812 345 6789</p>
                  <p className="text-xs text-muted">Mon-Fri, 9am to 6pm WAT</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10">
                  <MapPin className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Office</h3>
                  <p className="text-sm text-muted mt-1">45 Admiralty Way, Victoria Island,<br />Lagos, Nigeria.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="card p-8 h-full">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 dark:bg-success/10 border-2 border-green-200 dark:border-success/20 mb-6">
                    <Mail className="h-10 w-10 text-green-600 dark:text-success" />
                  </div>
                  <h2 className="Message Sent!</h2>
                  <p className="text-muted mt-2">We will get back to you as soon as possible.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline mt-6 text-sm px-6">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input type="text" placeholder="Chidi Okonkwo" required className="input-field" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                        <input type="email" placeholder="you@example.com" required className="input-field" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                      <input type="text" placeholder="What is this regarding?" required className="input-field" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Message</label>
                      <textarea rows={6} placeholder="Tell us how we can help you..." required className="input-field resize-none" />
                    </div>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                      Send Message <Send className="h-4 w-4" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
