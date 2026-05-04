import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { HeroSideImageFloat } from '@/components/HeroSideImageFloat'
import { useLanguage } from '@/context/LanguageContext'
import meryPortrait from '@/assets/mery.png'
import { gsap } from '@/lib/gsap-setup'

/** Visible headline comes from mock `terminalIntro.lines` (two-row typewriter). */
const PINK_HEX = '#ff62b3'
const PINK_GLOW_STYLE = `0 0 12px rgba(255, 98, 179, 0.45), 0 0 36px rgba(255, 98, 179, 0.2)`

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t, language } = useLanguage()
  const [lineFirst, lineSecond] = t.hero.lines
  const glyphsLine1 = [...lineFirst]
  const glyphsLine2 = [...lineSecond]

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        gsap.set(['.hero-type-l1', '.hero-type-l2'], { opacity: 1 })
        gsap.set('.hero-type-caret', { opacity: 1 })
        return
      }

      gsap.set('.hero-type-l1', { opacity: 0 })
      gsap.set('.hero-type-l2', { opacity: 0 })
      gsap.set('.hero-type-caret', { opacity: 0 })

      const tl = gsap.timeline()

      tl.to('.hero-type-l1', {
        opacity: 1,
        duration: 0.034,
        ease: 'none',
        stagger: { each: 0.063, from: 'start' },
      })
        .to('.hero-type-caret', { opacity: 1, duration: 0.06, ease: 'none' })
        .to('.hero-type-l2', {
          opacity: 1,
          duration: 0.034,
          ease: 'none',
          stagger: { each: 0.063, from: 'start' },
        })

      return () => {
        tl.kill()
      }
    },
    { scope: sectionRef, dependencies: [language] },
  )

  const renderGlyphSpans = (glyphs: string[], cls: string) =>
    glyphs.map((glyph, index) => (
      <span
        key={`${cls}-${index}`}
        className={`hero-type-char ${cls} inline-block opacity-0 drop-shadow-[0_0_8px_rgba(255,98,179,0.35)] ${
          glyph === ' ' ? 'w-[0.45em]' : 'min-w-[0.38em]'
        }`}
        style={{ color: PINK_HEX, textShadow: PINK_GLOW_STYLE }}
      >
        {glyph === ' ' ? '\u00A0' : glyph}
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative box-border flex min-h-svh w-full flex-col items-center overflow-hidden bg-black px-6 pt-[4.75rem] md:px-10 lg:px-14"
      aria-labelledby="hero-greeting"
    >
      <HeroSideImageFloat />

      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col px-4 pb-0">
        <div className="mt-auto flex w-full flex-col items-center gap-5 sm:gap-7 md:gap-9">
          <h1
            id="hero-greeting"
            className="m-0 flex w-full max-w-[min(41rem,88vw)] translate-y-2 flex-col items-center gap-7 text-center uppercase leading-none tracking-[0.12em] sm:translate-y-2.5 sm:gap-8 sm:tracking-[0.13em] md:translate-y-3 md:gap-9"
          >
            <span className="sr-only">{`${lineFirst} ${lineSecond}`}</span>
            <span
              className="font-terminal flex flex-col items-center gap-7 text-[clamp(1.2rem,3.95vw,3.05rem)] sm:gap-8 md:gap-9"
              aria-hidden="true"
            >
              <span className="flex flex-wrap justify-center gap-x-[0.1em]">
                {renderGlyphSpans(glyphsLine1, 'hero-type-l1')}
              </span>
              <span className="flex min-h-[1.08em] flex-wrap items-center justify-center gap-x-[0.09em]">
                {renderGlyphSpans(glyphsLine2, 'hero-type-l2')}
                <span
                  className="hero-type-caret terminal-caret-blink ml-[0.1em] inline-block h-[0.52em] w-[0.3em] translate-y-[0.04em]"
                  style={{ backgroundColor: PINK_HEX }}
                />
              </span>
            </span>
          </h1>

          <figure className="flex w-full shrink-0 justify-center overflow-hidden">
            <img
              src={meryPortrait}
              alt="Meryem Gulduren"
              width={560}
              height={700}
              className="hero-mery-photo block h-[min(56svh,480px)] w-auto max-w-[min(428px,92vw)] object-cover object-[center_14%] [filter:drop-shadow(0_24px_48px_rgba(255,98,179,0.12))] sm:h-[min(58svh,516px)] md:h-[min(60svh,560px)]"
              decoding="async"
              loading="eager"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
