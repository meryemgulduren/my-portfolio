import { type FormEvent, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import emailjs from '@emailjs/browser'

import { useLanguage } from '@/context/LanguageContext'
import { gsap } from '@/lib/gsap-setup'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import resumePdf from '@/assets/Meryem_Gulduren_EngCv.pdf'

const SocialIcon = ({ kind }: { kind: string }) => {
  const common = {
    viewBox: '0 0 24 24',
    width: 34,
    height: 34,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (kind) {
    case 'GitHub':
      return (
        <svg {...common} aria-hidden>
          <path d="M9 19c-4.5 1.5-4.5-2.5-6-3m12 5v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 18 4.77 5.07 5.07 0 0 0 17.91 1S16.73.65 14 2.48a13.38 13.38 0 0 0-4 0C7.27.65 6.09 1 6.09 1A5.07 5.07 0 0 0 6 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 10.5 18.13V20" />
        </svg>
      )
    case 'LinkedIn':
      return (
        <svg {...common} fill="currentColor" stroke="none" aria-hidden>
          <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003zM7.119 20.452H3.555V9h3.564v11.452zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm15.11 13.019h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
        </svg>
      )
    case 'Email':
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      )
    case 'Résumé':
      return (
        <svg {...common} fill="currentColor" stroke="none" aria-hidden>
          <path d="M4 2h9v5c0 1.1.9 2 2 2h5v3h-8c-2.2 0-4 1.8-4 4v6H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2z" />
          <path d="M15 2.5V7c0 .6.4 1 1 1h4.5L15 2.5z" />
          <text x="8" y="21.5" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="6.8px" letterSpacing="-0.2px">PDF</text>
        </svg>
      )
    default:
      return null
  }
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t, language } = useLanguage()
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({
    type: null,
    message: null,
  })

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!sectionRef.current) return

      gsap.delayedCall(0.12, () => ScrollTrigger.refresh())

      if (prefersReducedMotion) return

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          end: 'bottom 45%',
          toggleActions: 'play none none reverse',
        },
      })

      timeline
        .from('.contact-panel', {
          autoAlpha: 0,
          y: 60,
          duration: 0.95,
          stagger: 0.16,
          ease: 'power3.out',
        })
        .from('.contact-form-header', { y: -50, autoAlpha: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .from('.contact-form-left', { x: -60, autoAlpha: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.contact-form-right', { x: 60, autoAlpha: 0, duration: 0.8, ease: 'power3.out' }, '<')

      gsap.timeline({
        scrollTrigger: {
          trigger: '.collab-panel',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
        .from('.collab-title', { x: 60, autoAlpha: 0, duration: 0.85, ease: 'power3.out' })
        .from('.collab-text', { x: -60, autoAlpha: 0, duration: 0.85, ease: 'power3.out' }, '<0.15')
        .from('.collab-icon', { y: 30, autoAlpha: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.5)' }, '<0.2')

    },
    { scope: sectionRef },
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSending) return

    setIsSending(true)
    const form = event.currentTarget

    gsap.fromTo(
      '.contact-submit',
      { scale: 0.92 },
      {
        scale: 1,
        duration: 0.45,
        ease: 'elastic.out(1, .62)',
      },
    )

    // IMPORTANT: Replace these strings with your own EmailJS IDs from the dashboard
    const SERVICE_ID = 'service_njyawl8'
    const TEMPLATE_ID = 'template_3l26thn'
    const PUBLIC_KEY = 'Q2Cem17lCx9broImE'

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setStatus({
            type: 'success',
            message: language === 'tr' ? 'Mesajınız başarıyla gönderildi!' : 'Message sent successfully!',
          })
          form.reset()
        },
        (error) => {
          setStatus({
            type: 'error',
            message: (language === 'tr' ? 'Gönderim hatası: ' : 'Failed to send: ') + error.text,
          })
        },
      )
      .finally(() => {
        setIsSending(false)
        ;(document.activeElement instanceof HTMLElement ? document.activeElement : undefined)?.blur()
        
        // Auto-hide status after 5 seconds
        setTimeout(() => {
          setStatus({ type: null, message: null })
        }, 5000)
      })
  }

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden bg-black pt-12 pb-12 md:pt-16 md:pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-[12%_-8%_-6%_-8%] rounded-[420px_320px_180px_300px]/[55%_45%] bg-shell/42 blur-[120px]" />
      <div className="relative mx-auto flex w-full flex-col gap-4 px-4 md:px-8">

        <div className="collab-panel font-sans mx-auto w-full rounded-[2.45rem] border border-chocolate/10 bg-[#ffeaea] p-8 pb-10 shadow-[0_45px_120px_-72px_rgb(103,109,73)] md:p-12 lg:p-16 text-center">
          <h3 className="collab-title font-sans font-bold text-[1.8rem] text-black md:text-[2.2rem]">
            {t.contact.collabTitle}
          </h3>
          <p className="collab-text mx-auto mt-6 max-w-4xl text-[0.95rem] leading-relaxed text-black/75 md:text-[1.05rem]">
            {t.contact.collabText}
          </p>
          <div className="mt-10 flex items-center justify-center gap-10">
            <a href="https://github.com/meryemgulduren" target="_blank" rel="noopener noreferrer" className="collab-icon text-black/60 transition-colors hover:-translate-y-1 hover:text-black" aria-label="GitHub">
              <SocialIcon kind="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/meryem-gulduren/" target="_blank" rel="noopener noreferrer" className="collab-icon text-black/60 transition-colors hover:-translate-y-1 hover:text-black" aria-label="LinkedIn">
              <SocialIcon kind="LinkedIn" />
            </a>
            <a href="mailto:meryemguldurenss@gmail.com" className="collab-icon text-black/60 transition-colors hover:-translate-y-1 hover:text-black" aria-label="Email">
              <SocialIcon kind="Email" />
            </a>
            <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="collab-icon text-black/60 transition-colors hover:-translate-y-1 hover:text-black" aria-label="Résumé">
              <SocialIcon kind="Résumé" />
            </a>
          </div>
        </div>

        <div className="contact-panel font-sans mx-auto w-full rounded-[2.45rem] border border-chocolate/10 bg-[#ffeaea] p-8 pb-10 shadow-[0_45px_120px_-72px_rgb(103,109,73)] md:p-12 lg:p-16">
          <div className="contact-form-header text-center">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-black/60">{t.contact.formEyebrow}</p>
            <h3 className="mt-4 font-sans font-bold text-[2rem] text-black">{t.contact.formTitle}</h3>
          </div>
          <form className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" onSubmit={handleSubmit}>
            <div className="contact-form-left flex flex-col gap-6">
              <label className="contact-field block text-left text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-black/60">
                {t.contact.nameLabel}
                <input
                  className="mt-2 block w-full rounded-2xl border border-black/10 bg-white/60 px-4 py-3.5 text-[0.94rem] text-black outline-none transition focus-visible:border-black/30 focus-visible:ring-[2px] focus-visible:ring-black/10"
                  type="text"
                  name="name"
                  required
                />
              </label>
              <label className="contact-field block text-left text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-black/60">
                {t.contact.emailLabel}
                <input
                  className="mt-2 block w-full rounded-2xl border border-black/10 bg-white/60 px-4 py-3.5 text-[0.94rem] text-black outline-none transition focus-visible:border-black/30 focus-visible:ring-[2px] focus-visible:ring-black/10"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </label>
              {status.message && (
                <div 
                  className={`contact-field mb-2 rounded-xl border px-4 py-3 text-center text-[0.72rem] font-bold tracking-widest uppercase transition-all duration-500 ${
                    status.type === 'success' 
                      ? 'border-green-500/20 bg-green-500/10 text-green-700' 
                      : 'border-red-500/20 bg-red-500/10 text-red-700'
                  }`}
                >
                  {status.message}
                </div>
              )}
              <button
                type="submit"
                disabled={isSending}
                className="contact-submit contact-field mt-auto inline-flex w-full items-center justify-center gap-5 rounded-full border border-black/20 bg-black px-12 py-[0.85rem] text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white shadow-md transition hover:-translate-y-0.5 hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending 
                  ? (language === 'tr' ? 'GÖNDERİLİYOR...' : 'SENDING...') 
                  : t.contact.submitLabel}
              </button>
            </div>

            <div className="contact-form-right flex flex-col h-full">
              <label className="contact-field flex flex-col h-full text-left text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-black/60">
                {t.contact.messageLabel}
                <textarea
                  name="message"
                  required
                  className="mt-2 h-full min-h-[140px] w-full resize-none rounded-2xl border border-black/10 bg-white/60 px-4 py-3.5 text-[0.94rem] text-black outline-none transition focus-visible:border-black/30 focus-visible:ring-[2px] focus-visible:ring-black/10"
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
