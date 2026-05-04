import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '@/lib/gsap-setup'
import meryLogo from '@/assets/meryylogo.png'

import { useLanguage } from '@/context/LanguageContext'

type NavbarProps = {
  /** Shown if the logo image fails to load or for screen readers */
  logoAlt?: string
}

export function Navbar({ logoAlt = 'Studio logo' }: NavbarProps) {
  const { language, toggleLanguage, t } = useLanguage()

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.contact, href: '#contact' },
  ]
  const barRef = useRef<HTMLElement>(null)
  const [lightSurface, setLightSurface] = useState(false)

  const scrollToSection = (hash: string) => {
    const target = hash.startsWith('#') ? hash : `#${hash}`
    const el = document.querySelector<HTMLElement>(target)
    if (!el) return
    
    const offset = 76
    const elementPosition = el.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - offset
  
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }

  useGSAP(
    () => {
      const evaluateSurface = () => {
        const home = document.querySelector('#home')
        const bottom =
          home instanceof HTMLElement ? Math.round(home.getBoundingClientRect().bottom) : Number.POSITIVE_INFINITY
        setLightSurface(bottom <= 118)
      }

      evaluateSurface()
      window.addEventListener('scroll', evaluateSurface, { passive: true })
      window.addEventListener('resize', evaluateSurface)

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      let introTl: gsap.core.Timeline | null = null

      if (!prefersReducedMotion) {
        introTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        introTl.from('.brand-mark', {
          opacity: 0,
          scale: 0.82,
          duration: 1.05,
          ease: 'elastic.out(1,.55)',
        })
        introTl.from('.navbar-link', { y: -16, opacity: 0, stagger: 0.12, duration: 0.8 }, '-=0.55')
      }

      return () => {
        window.removeEventListener('scroll', evaluateSurface)
        window.removeEventListener('resize', evaluateSurface)
        introTl?.kill()
      }
    },
    { scope: barRef },
  )

  const headerTone = lightSurface
    ? `bg-black/95 backdrop-blur-md shadow-[0_12px_40px_-24px_rgba(0,0,0,0.5)]`
    : 'bg-transparent'

  return (
    <header ref={barRef} className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${headerTone}`}>
      <nav className="flex w-full max-w-none items-center justify-between gap-6 px-5 py-1.5 sm:px-7 sm:py-2 md:px-10 md:py-2 lg:px-14 xl:px-16">
        <button
          type="button"
          onClick={() => scrollToSection('#home')}
          className="group flex shrink-0 items-center text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          aria-label="Go to homepage"
        >
          <img
            src={meryLogo}
            alt={logoAlt}
            width={240}
            height={80}
            className={`brand-mark h-auto w-auto object-contain object-left transition-all duration-500 ${
              lightSurface ? 'max-h-[3.2rem] sm:max-h-[3.8rem]' : 'max-h-[5rem] sm:max-h-[6rem] md:max-h-[7rem]'
            }`}
            decoding="async"
          />
        </button>
        <div className="flex items-center gap-3 md:gap-7">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              className="navbar-link hidden text-[0.78rem] font-semibold tracking-[0.3em] transition-colors md:inline-block text-zinc-300 hover:text-white"
              onClick={() => scrollToSection(item.href)}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] shadow-sm transition border-white/40 bg-white/5 text-white hover:bg-white/20"
          >
            <span>🌍</span>
            <span>{language === 'tr' ? 'TR | EN' : 'EN | TR'}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
