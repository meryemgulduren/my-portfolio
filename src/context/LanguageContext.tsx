import { createContext, useContext, useState, type ReactNode } from 'react'
import { en } from '@/data/locales/en'
import { tr } from '@/data/locales/tr'

type Language = 'en' | 'tr'
type Translations = typeof en

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en') // Default to English as requested

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'tr' : 'en'))
  }

  const t = language === 'en' ? en : tr

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
