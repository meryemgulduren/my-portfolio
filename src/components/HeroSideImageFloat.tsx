import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import klavyeImg from '@/assets/klavye.png'
import pcImg from '@/assets/pc.png'
import { gsap } from '@/lib/gsap-setup'

/**
 * Left / right hero accents: user PNGs with subtle 3D-style motion (perspective + GSAP).
 */
export function HeroSideImageFloat() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      gsap.set(['.hero-side-img-kb', '.hero-side-img-pc'], {
        transformOrigin: '50% 50%',
      })

      if (reduce) {
        gsap.set('.hero-side-img-kb', {
          rotateY: -14,
          rotateX: 5,
          y: 0,
        })
        gsap.set('.hero-side-img-pc', {
          rotateY: 16,
          rotateX: 4,
          y: 0,
        })
        return
      }

      gsap.to('.hero-side-img-kb', {
        rotation: 360,
        duration: 90,
        repeat: -1,
        ease: 'linear',
      })

      gsap.fromTo(
        '.hero-side-img-kb',
        { y: 15 },
        {
          y: -15,
          duration: 5.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      )

      gsap.to('.hero-side-img-pc', {
        rotation: -360,
        duration: 100,
        repeat: -1,
        ease: 'linear',
      })

      gsap.fromTo(
        '.hero-side-img-pc',
        { y: -15 },
        {
          y: 15,
          duration: 6.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.55,
        },
      )
    },
    { scope: rootRef },
  )

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-[2] hidden overflow-hidden md:block"
      aria-hidden
    >
      <div className="absolute inset-y-16 translate-y-28 left-[5%] lg:left-[10%] flex w-[min(36vw,300px)] items-center justify-start pl-2 [perspective:960px] lg:w-[min(32vw,340px)] lg:pl-4">
        <div className="relative w-full [-webkit-mask-image:linear-gradient(90deg,black_40%,transparent)] [mask-image:linear-gradient(90deg,black_45%,transparent)]">
          <img
            src={klavyeImg}
            alt=""
            className="hero-side-img-kb mx-auto block h-auto max-h-[min(40vh,380px)] w-full max-w-[min(92%,280px)] select-none object-contain [transform-style:preserve-3d] [filter:drop-shadow(0_12px_32px_rgba(255,98,179,0.18))]"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>

      <div className="absolute inset-y-16 translate-y-28 right-[5%] lg:right-[10%] flex w-[min(36vw,300px)] items-center justify-end pr-2 [perspective:960px] lg:w-[min(32vw,340px)] lg:pr-4">
        <div className="relative w-full [-webkit-mask-image:linear-gradient(270deg,black_40%,transparent)] [mask-image:linear-gradient(270deg,black_45%,transparent)]">
          <img
            src={pcImg}
            alt=""
            className="hero-side-img-pc mx-auto block h-auto max-h-[min(40vh,380px)] w-full max-w-[min(92%,280px)] select-none object-contain [transform-style:preserve-3d] [filter:drop-shadow(0_12px_32px_rgba(255,98,179,0.2))]"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
