import axios from "axios"
import { useEffect, useState } from "react"

const ArtistHomePage = () => {

  const [username, setUsername] = useState('')

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/get-user', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })

      setUsername(response.data.user.username || '')
      return response.data.user
    } catch (err) {
      setUsername('')
      return null
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <section className="h-full w-full">
      <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Main Info Card */}
        <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_20px_45px_-25px_rgba(74,222,128,0.5)] backdrop-blur-md lg:col-span-2 sm:p-8">
          <p className="inline-flex rounded-full border border-green-400/35 bg-green-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-200">
            Artist Dashboard
          </p>
          <h1 className="mt-4 bg-linear-to-r from-lime-200 via-green-300 to-emerald-200 bg-clip-text text-3xl font-black tracking-tight text-transparent pb-2 sm:text-5xl">
            Welcome back, {username}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            This is your creative space to manage songs, upload fresh tracks, and organize your albums. Build your music brand with a clean workflow and keep everything ready for your listeners.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 min-[760px]:grid-cols-3">
            <div className="rounded-xl border border-lime-300/20 bg-lime-400/10 p-4">
              <p className="text-xs uppercase tracking-wider text-lime-100/80">Step 1</p>
              <p className="mt-1 text-lg font-semibold text-lime-100">Upload Songs</p>
            </div>
            <div className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <p className="text-xs uppercase tracking-wider text-emerald-100/80">Step 2</p>
              <p className="mt-1 text-lg font-semibold text-emerald-100">Create Albums</p>
            </div>
            <div className="rounded-xl border border-teal-300/20 bg-teal-400/10 p-4">
              <p className="text-xs uppercase tracking-wider text-teal-100/80">Step 3</p>
              <p className="mt-1 text-lg font-semibold text-teal-100">Share Music</p>
            </div>
          </div>
        </div>

        {/* Quick Tip Aside */}
        <div className="rounded-2xl border border-white/15 bg-black/25 p-6 backdrop-blur-md sm:p-8">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Quick Tip</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
            Keep your song titles, album covers, and metadata polished. A consistent profile makes your page look professional and helps fans discover your work faster.
          </p>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Today Focus</p>
            <p className="mt-2 text-base font-semibold text-green-200">Upload your latest single</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ArtistHomePage