import { useEffect, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom"
import { fetchAlbumById } from "../store/features/albumByIdAPI";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Music2, Infinity } from "lucide-react";
import Songs from "../components/Songs";

const UserAlbumPage = () => {

  const params = useParams()
  const dispatch = useDispatch()

  const albumParamID = params.albumId
  const invalid = albumParamID === ':albumId'

  const AlbumObjByID = useSelector((state) => state.albumById)

  useEffect(() => {
    if (!invalid) {
      dispatch(fetchAlbumById(params))
    }
  }, [])

  return (
    <section className='mx-auto flex w-full max-w-7xl flex-col gap-6 text-white'>

      {invalid
        ?
        // If Album ID is invalid
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-zinc-900/70 via-emerald-950/40 to-black/80 p-8 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.55)]">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-emerald-300/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-lime-300/10 blur-3xl" />

          <div className="flex flex-col items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-200/20 bg-emerald-400/15">
              <Music2 className="h-6 w-6 text-emerald-200" />
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/70">
                Album
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-4xl">
                Choose an album first
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
                You opened the Album page without selecting an album. Go to Tracks and pick one to view its details.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/user/track"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go to Tracks
                </Link>

                <Link
                  to="/user/home"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        :

        // If Album ID is valid
        AlbumObjByID && AlbumObjByID.isLoading
          ?
          // If Album is loading
          <div className="flex min-h-30 items-center justify-center py-8">
            <Infinity size={20} className="h-9 w-9 cursor-pointer animate-spin rounded-full bg-lime-500/20 p-2 text-lime-300" />
          </div>
          :
          // If Album is loaded
          <div>
            <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-emerald-500/20 via-zinc-900/70 to-black/90 p-6 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.85)] sm:p-8'>
              <div className='pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl' />
              <div className='pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-lime-300/15 blur-3xl' />

              <p className='text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/80'>Playlist</p>
              <h1 className='mt-3 text-3xl font-black tracking-tight sm:text-5xl'>
                Album :
                <span className='ml-2 bg-linear-to-r from-lime-200 via-emerald-200 to-green-300 bg-clip-text text-transparent'>
                  {AlbumObjByID.IdAlbumData.title}
                </span>
              </h1>

              <div className='mt-6 flex flex-wrap items-center gap-3'>
                <span className='rounded-xl border border-emerald-200/30 bg-emerald-400/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all hover:bg-emerald-400/30'>
                  {AlbumObjByID.IdAlbumData.artist?.username} • Songs:  {AlbumObjByID.IdAlbumData.musics?.length}
                </span>
              </div>
            </div>

          </div>
      }

    </section >
  )
}

export default UserAlbumPage