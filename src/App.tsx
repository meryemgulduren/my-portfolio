import '@/lib/gsap-setup'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { OrganicBackdrop } from '@/components/OrganicBackdrop'
import { ScrollToTop } from '@/components/ScrollToTop'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Hero } from '@/sections/Hero'
import { LanguageProvider } from '@/context/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <div className="relative isolate min-h-screen overflow-x-hidden bg-cream-soft font-sans text-chocolate selection:bg-tan-light/62">
        <OrganicBackdrop />
        <Navbar logoAlt="Meryem — portfolio home" />
        <main>
          <Hero />
          <About />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </LanguageProvider>
  )
}

export default App
