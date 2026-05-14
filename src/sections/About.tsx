import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { RichText } from '@/components/RichText'
import { useLanguage } from '@/context/LanguageContext'
import { gsap } from '@/lib/gsap-setup'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import iyilikPcImg from '@/assets/iyilikpc.png'
import iyilikTelImg from '@/assets/iyiliktel.png'
import emlakPcImg from '@/assets/emlakpc.png'
import emlakTelImg from '@/assets/emlaktel.png'
import lokmaPcImg from '@/assets/lokmapc.png'
import lokmaTelImg from '@/assets/lokmatel.png'

export function About() {
  const wrapperRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useGSAP(
    () => {
      gsap.delayedCall(0.06, () => ScrollTrigger.refresh())
    },
    { scope: wrapperRef },
  )

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const timeline =
        prefersReducedMotion || !wrapperRef.current
          ? undefined
          : gsap.timeline({
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: 'top 74%',
                end: 'bottom 65%',
                toggleActions: 'play none none reverse',
              },
            })

      timeline?.from('.about-intro', {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 40,
        duration: prefersReducedMotion ? 0 : 1,
        ease: 'power3.out',
      })

      if (!prefersReducedMotion) {
        gsap.utils.toArray('.project-card').forEach((el: any) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
          })
        })
      }
    },
    { scope: wrapperRef },
  )

  return (
    <section
      ref={wrapperRef}
      id="about"
      className="relative overflow-hidden bg-[#ffeaea] py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto flex max-w-6xl min-[2000px]:max-w-7xl flex-col px-6">
        <div className="relative about-intro" id="about-heading">
          {/* Text Content - Limited width on XL to avoid overlap with floating card */}
          <div className="w-full xl:max-w-[55%] min-[2000px]:max-w-[60%]">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-black/60">{t.about.eyebrow}</p>
            <h2 className="font-sans font-bold whitespace-pre-line text-5xl tracking-[0.02em] text-black lg:text-[3.85rem] mt-6" style={{ lineHeight: 1.06 }}>
              {t.about.title}
            </h2>
            <div className="mt-16 md:mt-24 space-y-6 text-[1.15rem] leading-relaxed text-black/80">
              <p className="whitespace-pre-line">
                <RichText content={t.about.paragraph} />
              </p>
            </div>
          </div>

          {/* Floating Code Card - Absolute on Large Screens */}
          <div className="mt-12 lg:mt-0 lg:absolute lg:-right-36 min-[2000px]:-right-64 lg:top-0 lg:w-[620px] lg:translate-x-0 hidden xl:block transition-all duration-500">
            <div className="relative overflow-hidden rounded-2xl bg-[#1e1e1e] shadow-2xl border border-white/10 font-mono text-[0.8rem] leading-relaxed">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="ml-4 text-[0.7rem] text-white/40 tracking-wider font-sans uppercase">skills.js</div>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6">
                <div className="flex gap-4">
                  <div className="flex flex-col text-white/20 text-right select-none pr-2 border-r border-white/5">
                    <span>01</span>
                    <span>02</span>
                    <span>03</span>
                    <span>04</span>
                    <span>05</span>
                  </div>
                  <pre className="text-white/90">
                    <code>
                      <span className="text-[#c586c0]">const</span> <span className="text-[#9cdcfe]">skills</span> = {'{'}{'\n'}
                      {'  '}<span className="text-[#9cdcfe]">programmingLanguages</span>: [<span className="text-[#ce9178]">'JavaScript'</span>, <span className="text-[#ce9178]">'HTML'</span>, <span className="text-[#ce9178]">'CSS'</span>, <span className="text-[#ce9178]">'React'</span>, <span className="text-[#ce9178]">'Firebase'</span>],{'\n'}
                      {'  '}<span className="text-[#9cdcfe]">otherSkills</span>: [<span className="text-[#ce9178]">'Project Management'</span>, <span className="text-[#ce9178]">'Problem Solving'</span>, <span className="text-[#ce9178]">'Teamwork'</span>]{'\n'}
                      {'}'};
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile/Tablet Fallback Card (Centered below) */}
          <div className="mt-12 xl:hidden w-full max-w-2xl mx-auto">
             {/* Same card content but in-flow for mobile */}
             <div className="relative overflow-hidden rounded-2xl bg-[#1e1e1e] shadow-2xl border border-white/10 font-mono text-[0.75rem] leading-relaxed">
                <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3">
                  <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-[#ff5f56]" /><div className="h-3 w-3 rounded-full bg-[#ffbd2e]" /><div className="h-3 w-3 rounded-full bg-[#27c93f]" /></div>
                  <div className="ml-4 text-[0.7rem] text-white/40 tracking-wider font-sans uppercase">skills.js</div>
                </div>
                <div className="p-5 overflow-x-auto">
                   <pre className="text-white/90"><code>
                      <span className="text-[#c586c0]">const</span> <span className="text-[#9cdcfe]">skills</span> = {'{'}{'\n'}
                      {'  '}<span className="text-[#9cdcfe]">progLangs</span>: [<span className="text-[#ce9178]">'JS'</span>, <span className="text-[#ce9178]">'HTML'</span>, <span className="text-[#ce9178]">'CSS'</span>, <span className="text-[#ce9178]">'React'</span>, <span className="text-[#ce9178]">'Firebase'</span>],{'\n'}
                      {'  '}<span className="text-[#9cdcfe]">other</span>: [<span className="text-[#ce9178]">'PM'</span>, <span className="text-[#ce9178]">'PS'</span>, <span className="text-[#ce9178]">'Teamwork'</span>]{'\n'}
                      {'}'};
                   </code></pre>
                </div>
             </div>
          </div>
        </div>

        {/* Projects Section Header */}
        <div className="mt-32 pt-16 border-t border-black/10 text-center project-card" id="projects">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-black/60">{t.about.portfolio}</p>
          <h2 className="font-sans font-bold text-5xl tracking-[0.02em] text-black lg:text-[3.85rem] mt-4" style={{ lineHeight: 1.06 }}>
            {t.about.projectsTitle}
          </h2>
          <div className="mt-12 w-full flex flex-col gap-8" id="projects-container">
            {/* Project 1 Placeholder */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mt-12 text-left project-card">
              <div className="flex-1 translate-x-0 -translate-y-4 lg:-translate-x-8 lg:-translate-y-6">
                <h3 className="font-sans font-bold text-3xl md:text-4xl text-black tracking-wide">
                  {t.projects.bilokmaIyilik.title}
                </h3>
                <div className="mt-6 space-y-5 text-[1.08rem] leading-relaxed text-black/80">
                  <p>{t.projects.bilokmaIyilik.desc1}</p>
                </div>
              </div>
              <div className="relative w-full lg:w-[45%] flex flex-col items-center lg:items-end mt-12 lg:mt-0">
                <div className="relative w-full max-w-[550px] mx-auto translate-x-0 lg:translate-x-8 scale-100 lg:scale-110 origin-center lg:origin-right">
                  {/* Desktop view (Background) */}
                  <img src={iyilikPcImg} alt="İyilik PC Görünümü" className="w-full object-contain rounded-xl drop-shadow-2xl" />
                  {/* Mobile view (Foreground, Overlapping) */}
                  <img src={iyilikTelImg} alt="İyilik Telefon Görünümü" className="absolute -bottom-8 -right-4 lg:-right-8 w-[23%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)] z-10" />
                </div>
                <div className="mt-16 lg:mt-20 flex flex-col items-center gap-8 translate-x-0 lg:-translate-x-4">
                  <div className="flex flex-wrap items-center justify-center gap-8">
                    <a href="https://bilokmaiyilik.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-lg transition-transform hover:scale-105">
                      {t.about.liveProject}
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3 lg:max-w-[30rem]">
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">REACT NATIVE & EXPO</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">JAVA 17 & SPRING BOOT</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">POSTGRESQL</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">JWT</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">FLYWAY</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">APACHE POI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-16 h-[1px] w-full bg-black/10 project-card"></div>

            {/* Project 2: DOĞAN EMLAK */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mt-12 text-left project-card">
              <div className="flex-1 translate-x-0 -translate-y-4 lg:-translate-x-8 lg:-translate-y-6">
                <h3 className="font-sans font-bold text-3xl md:text-4xl text-black tracking-wide">
                  {t.projects.doganEmlak.title}
                </h3>
                <div className="mt-6 space-y-5 text-[1.08rem] leading-relaxed text-black/80">
                  <p>{t.projects.doganEmlak.desc1}</p>
                  <p>{t.projects.doganEmlak.desc2}</p>
                </div>
              </div>
              <div className="relative w-full lg:w-[45%] flex flex-col items-center lg:items-end mt-12 lg:mt-0">
                <div className="relative w-full max-w-[550px] mx-auto translate-x-0 lg:translate-x-8 scale-100 lg:scale-110 origin-center lg:origin-right">
                  {/* Desktop view (Background) */}
                  <img src={emlakPcImg} alt="Doğan Emlak PC Görünümü" className="w-full object-contain rounded-xl drop-shadow-2xl" />
                  {/* Mobile view (Foreground, Overlapping) */}
                  <img src={emlakTelImg} alt="Doğan Emlak Telefon Görünümü" className="absolute -bottom-8 -right-4 lg:-right-8 w-[23%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)] z-10" />
                </div>
                <div className="mt-16 lg:mt-20 flex flex-col items-center gap-8 translate-x-0 lg:-translate-x-4">
                  <div className="flex flex-wrap items-center justify-center gap-8">
                    <a href="https://doganemlakgroup.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-lg transition-transform hover:scale-105">
                      {t.about.liveProject}
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3 lg:max-w-[26rem]">
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">REACT 19</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">TAILWIND CSS 4</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">NODE.JS & EXPRESS</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">MONGODB & MONGOOSE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-16 h-[1px] w-full bg-black/10 project-card"></div>

            {/* Project 3: Bİ LOKMA */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mt-12 text-left project-card">
              <div className="flex-1 translate-x-0 -translate-y-4 lg:-translate-x-8 lg:-translate-y-6">
                <h3 className="font-sans font-bold text-3xl md:text-4xl text-black tracking-wide">
                  {t.projects.bilokma.title}
                </h3>
                <div className="mt-6 space-y-5 text-[1.08rem] leading-relaxed text-black/80">
                  <p>{t.projects.bilokma.desc1}</p>
                  <p>{t.projects.bilokma.desc2}</p>
                </div>
              </div>
              <div className="relative w-full lg:w-[45%] flex flex-col items-center lg:items-end mt-12 lg:mt-0">
                <div className="relative w-full max-w-[550px] mx-auto translate-x-0 lg:translate-x-8 scale-100 lg:scale-110 origin-center lg:origin-right">
                  {/* Desktop view (Background) */}
                  <img src={lokmaPcImg} alt="Bi Lokma PC Görünümü" className="w-full object-contain rounded-xl drop-shadow-2xl" />
                  {/* Mobile view (Foreground, Overlapping) */}
                  <img src={lokmaTelImg} alt="Bi Lokma Telefon Görünümü" className="absolute -bottom-8 -right-4 lg:-right-8 w-[23%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)] z-10" />
                </div>
                <div className="mt-16 lg:mt-20 flex flex-col items-center gap-8 translate-x-0 lg:-translate-x-4">
                  <div className="flex flex-wrap items-center justify-center gap-8">
                    <a href="https://bilokmakocaeli.com/?https://bilokmakocaeli.com/&gad_source=1&gad_campaignid=23300076386&gbraid=0AAAABCJ-WmjH2aKMHvrP0iO0yG15S82pw&gclid=CjwKCAjw5NvPBhAoEiwA_2egftWBi99sMtpVK8zzSvJx95lc1iQtsfXqaY8r13CLzaJ0VxlJwHLk3RoCJV0QAvD_BwE" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-lg transition-transform hover:scale-105">
                      {t.about.liveProject}
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3 lg:max-w-[30rem]">
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">REACT 19</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">VITE</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">FIREBASE</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">REACT ROUTER DOM</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">REACT HELMET ASYNC</span>
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#ffb3c6] px-4 py-2 text-[0.75rem] font-bold tracking-widest text-black shadow-sm transition-transform hover:-translate-y-1">ESLINT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
