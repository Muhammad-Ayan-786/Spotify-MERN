const Header = ({ ButtonMessage, MainTitle, Description }) => {
  return (
    <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-[0_14px_40px_-24px_rgba(74,222,128,0.45)] backdrop-blur-md sm:px-6">
      <p className="inline-flex rounded-full border border-lime-300/40 bg-lime-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-200">
        {ButtonMessage}
      </p>
      <h1 className="mt-2 pb-2 bg-linear-to-r from-lime-200 via-green-300 to-emerald-200 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
        {MainTitle}
      </h1>
      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
        {Description}
      </p>
    </div>
  )
}

export default Header