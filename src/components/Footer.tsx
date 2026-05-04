import { useLanguage } from '@/context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-white/10 bg-black text-cream/90">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-12 text-center">
        <p className="font-sans font-bold text-xl tracking-[0.04em] text-white">{t.footer.brand}</p>
        <div className="mt-1 flex flex-wrap items-center justify-center text-[0.85rem] font-sans text-zinc-400">
          <span>{t.footer.copyright}</span>
        </div>
      </div>
    </footer>
  )
}
