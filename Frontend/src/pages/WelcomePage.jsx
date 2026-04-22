import { Link } from "react-router-dom"

const WelcomePage = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80)] bg-cover bg-center bg-no-repeat px-4 py-10 text-white">
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-linear-to-br from-emerald-950/55 via-black/35 to-zinc-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.2),transparent_45%)]" />

      <div className="relative z-10 w-full max-w-6xl rounded-3xl border border-white/15 bg-linear-to-br from-emerald-950/90 via-green-950/85 to-zinc-950/90 p-6 shadow-[0_20px_80px_-20px_rgba(132,204,22,0.55)] sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">

          {/* Left Side */}
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/40 bg-lime-300/10 px-4 py-1 text-sm font-semibold text-lime-200">
              Stream your vibe, anytime
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Welcome To
              <span className="block bg-linear-to-r from-lime-300 via-emerald-300 to-lime-100 bg-clip-text text-transparent">
                Music World
              </span>
            </h1>

            <p className="max-w-xl text-base text-zinc-200/90 sm:text-lg md:text-xl">
              Listen to your favorite music anywhere, anytime.
            </p>

            {/* Logo Banner */}
            <div className="mt-2 inline-flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md sm:px-5">
              <img
                className="h-10 w-10 rounded-full border border-white/30 object-cover sm:h-12 sm:w-12"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVGHahSsy5_XU1QcxJAFf4-aC2VHbUugDFJw&s"
                alt="Logo"
              />
              <p className="text-2xl font-bold tracking-wide text-lime-100 sm:text-3xl">
                Spotify
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex w-full flex-col justify-center gap-4 rounded-2xl border border-white/15 bg-black/25 p-5 backdrop-blur-md sm:p-6">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-lime-200/90">
              Start your journey
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Join and enjoy limitless music
            </h2>

            {/* Auth Buttons */}
            <div className="mt-2 flex w-full flex-col gap-4">
              <Link
                to="/api/auth/register"
                className="w-full rounded-xl bg-lime-400 px-5 py-3 text-center text-base font-bold text-zinc-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime-300 hover:shadow-lg hover:shadow-lime-300/40"
              >
                Sign up
              </Link>
              <Link
                to="/api/auth/login"
                className="w-full rounded-xl border border-lime-300/60 bg-transparent px-5 py-3 text-center text-base font-bold text-lime-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime-300/10 hover:shadow-lg hover:shadow-lime-300/20"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WelcomePage