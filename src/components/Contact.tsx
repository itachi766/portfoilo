import React, { useState } from 'react';
import { Send, Mail, MapPin, CheckCircle, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      // Direct integration with Web3Forms (Free, secure form mailing API)
      // Get your free access key at https://web3forms.com and replace the placeholder below
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY_HERE", // Read from secure .env file
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Message from ${formData.name}`,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      console.error("Transmission error:", err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" style={{ position: 'relative' }}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '3.5rem', alignItems: 'start', marginTop: '1.5rem' }}>
          
          {/* Left Column Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                Let's Build <Sparkles size={22} style={{ color: 'var(--accent-cyan)' }} />
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.7' }}>
                Have an exciting opportunity in VLSI design, embedded systems, AI hardware, or tech innovation? Or simply want to connect and collaborate? Drop your details in the grid, and I’ll get back to you within 24 hours.
              </p>
            </div>

            {/* Quick Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Mail Card */}
              <div 
                className="glass"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(6, 182, 212, 0.08)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
                  <Mail size={18} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</span>
                  <a href="mailto:singhrishik59@gmail.com" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>singhrishik59@gmail.com</a>
                </div>
              </div>

              {/* Location Card */}
              <div 
                className="glass"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(244, 63, 94, 0.08)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(244, 63, 94, 0.15)' }}>
                  <MapPin size={18} style={{ color: 'var(--accent-pink)' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Bhubaneswar, Odisha, India</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column Form */}
          <div className="glass" style={{ padding: '2rem', border: '1px solid var(--border-color)' }}>
            
            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 0', gap: '1rem' }}>
                <CheckCircle size={60} style={{ color: 'var(--accent-green)', filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Message Transmitted!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '350px' }}>
                  Thank you! Your transmission was successfully beamed into my terminal database. Talk to you very soon!
                </p>
                <div 
                  className="glass"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    padding: '0.5rem 1rem',
                    color: 'var(--accent-green)',
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '6px',
                    marginTop: '1rem'
                  }}
                >
                  system: transmission_secure [200 OK]
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Name / Email Row */}
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  
                  <div className="input-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Uzumaki Naruto"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. hokage@konoha.com"
                    />
                  </div>

                </div>

                {/* Subject */}
                <div className="input-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What project are we collaborating on?"
                  />
                </div>

                {/* Message */}
                <div className="input-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your transmission details..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="glass-cyan"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--accent-cyan)',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    padding: '0.9rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.1)',
                    transition: 'var(--transition-smooth)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'sending') {
                      e.currentTarget.style.backgroundColor = 'var(--accent-cyan)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (status !== 'sending') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(6, 182, 212, 0.1)';
                    }
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <div className="spinner" /> Beaming...
                    </>
                  ) : (
                    <>
                      Transmit Message <Send size={16} />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }

        .input-group label {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .input-group input, 
        .input-group textarea {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          color: var(--text-primary);
          outline: none;
          transition: var(--transition-smooth);
          width: 100%;
        }

        .input-group input::placeholder, 
        .input-group textarea::placeholder {
          color: var(--text-muted);
          opacity: 0.7;
        }

        .input-group input:focus, 
        .input-group textarea:focus {
          border-color: var(--accent-cyan);
          background-color: rgba(6, 182, 212, 0.03);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.15);
        }

        .input-group input:focus + label, 
        .input-group textarea:focus + label {
          color: var(--accent-cyan);
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-top-color: var(--text-primary);
          border-radius: 50%;
          animation: rotate-slow 1s linear infinite;
        }
      `}</style>
    </section>
  );
}
