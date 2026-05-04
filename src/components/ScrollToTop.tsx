import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'

import { gsap } from '@/lib/gsap-setup'

export function ScrollToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => {
      const next = window.scrollY > 480
      setVisible((previous) => (previous === next ? previous : next))
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useGSAP(
    () => {
      gsap.fromTo(
        buttonRef.current,
        { autoAlpha: 0, y: 18, scale: 0.9 },
        {
          autoAlpha: visible ? 1 : 0,
          y: visible ? 0 : 18,
          scale: visible ? 1 : 0.9,
          duration: 0.55,
          ease: 'power3.out',
          pointerEvents: visible ? 'auto' : 'none',
        },
      )
    },
    { dependencies: [visible], revertOnUpdate: true, scope: buttonRef },
  )

  const handleClick = () => {
    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: 0, autoKill: true },
      ease: 'power3.inOut',
    })
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className="fixed bottom-8 right-6 z-50 hidden h-12 w-12 items-center justify-center rounded-full bg-chocolate text-cream shadow-lg shadow-chocolate/40 transition-transform hover:-translate-y-1 md:flex"
      aria-label="Scroll back to top"
      onClick={handleClick}
    >
      <span className="sr-only">Back to top</span>
      <svg viewBox="0 0 20 22" aria-hidden className="h-[18px] w-[14px]" fill="none">
        <path
          d="M10 21V3M10 3 4 10M10 3l6 7"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
