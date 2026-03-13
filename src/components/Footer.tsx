export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-900 px-6 py-12 text-zinc-500 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="text-xs font-bold uppercase tracking-[0.4em] text-white">
          LŪMIA
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em]">
          <button type="button" className="transition-colors hover:text-white">
            Terms
          </button>
          <button type="button" className="transition-colors hover:text-white">
            Privacy
          </button>
          <button type="button" className="transition-colors hover:text-white">
            Support
          </button>
          <button type="button" className="transition-colors hover:text-white">
            Careers
          </button>
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em]">
          © {year} LŪMIA Originals
        </p>
      </div>
    </footer>
  )
}
