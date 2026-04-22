import { Link } from "react-router-dom";

const UserHomePage = () => {
  return (
    <section className='mx-auto flex w-full max-w-7xl flex-col gap-6 text-white'>
      {/* Main Heading */}
      <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-emerald-500/20 via-zinc-900/70 to-black/90 p-6 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.85)] sm:p-8'>
        <div className='pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl' />
        <div className='pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-lime-300/15 blur-3xl' />

        <p className='text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/80'>Hello World</p>
        <h1 className='mt-3 text-3xl font-black tracking-tight sm:text-5xl'>
          Welcome back to your
          <span className='ml-2 bg-linear-to-r from-lime-200 via-emerald-200 to-green-300 bg-clip-text text-transparent'>
            Music World
          </span>
        </h1>
        <p className='mt-3 max-w-2xl text-sm text-zinc-300 sm:text-base'>
          Keep your vibe flowing with fresh tracks, smooth playlists, and the songs you love most.
        </p>

        <div className='mt-6 flex flex-wrap items-center gap-3'>
          <Link to='/user/track' className='rounded-xl border border-emerald-200/30 bg-emerald-400/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all hover:bg-emerald-400/30'>
            Play Favorites
          </Link>
        </div>
      </div>

      {/* Explaination Articles */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <article className='group rounded-2xl border border-white/10 bg-linear-to-br from-emerald-500/20 to-zinc-950 p-5 transition-all hover:border-emerald-300/40'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/80'>Listen</p>
          <h3 className='mt-2 text-xl font-bold'>Play songs in Track</h3>
          <p className='mt-2 text-sm text-zinc-300'>
            Open the Track page to browse songs and start listening instantly.
          </p>
          <Link
            to='/user/track'
            className='mt-4 inline-flex items-center justify-center rounded-lg border border-emerald-300/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-100 transition-all hover:bg-emerald-300/20'
          >
            Go to Track
          </Link>
        </article>

        <article className='group rounded-2xl border border-white/10 bg-linear-to-br from-lime-500/15 to-zinc-950 p-5 transition-all hover:border-lime-300/40'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-lime-200/80'>Explore</p>
          <h3 className='mt-2 text-xl font-bold'>View albums & tracks</h3>
          <p className='mt-2 text-sm text-zinc-300'>
            Discover music by checking album details and exploring tracks.
          </p>
          <Link
            to='/user/track'
            className='mt-4 inline-flex items-center justify-center rounded-lg border border-lime-300/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-lime-100 transition-all hover:bg-lime-300/20'
          >
            Browse Music
          </Link>
        </article>

        <article className='group rounded-2xl border border-white/10 bg-linear-to-br from-cyan-500/15 to-zinc-950 p-5 transition-all hover:border-cyan-300/40'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80'>Library</p>
          <h3 className='mt-2 text-xl font-bold'>Save what you like</h3>
          <p className='mt-2 text-sm text-zinc-300'>
            Keep your favorite songs and albums together so they're easy to find later.
          </p>
          <button className='mt-4 rounded-lg border border-cyan-300/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-100 transition-all hover:bg-cyan-300/20'>
            View Library
          </button>
        </article>
      </div>
    </section>
  )
}

export default UserHomePage