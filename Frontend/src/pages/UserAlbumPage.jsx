import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom"
import { fetchAlbumById } from "../store/features/albumByIdAPI";
import { useDispatch, useSelector } from "react-redux";
import { Infinity } from "lucide-react";

const UserAlbumPage = () => {

  const params = useParams()
  const dispatch = useDispatch()

  const albumByIdObj = useSelector((state) => state.albumById)

  useEffect(() => {
    if (params) {
      dispatch(fetchAlbumById(params))
    }
  }, [params])

  return (
    <section className='mx-auto flex w-full max-w-7xl flex-col gap-6 text-white'>

      {albumByIdObj.isLoading
        ?
        <div className="flex min-h-30 items-center justify-center py-8">
          <Infinity size={20} className="h-9 w-9 cursor-pointer animate-spin rounded-full bg-lime-500/20 p-2 text-lime-300" />
        </div>
        :
        <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-emerald-500/20 via-zinc-900/70 to-black/90 p-6 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.85)] sm:p-8'>
          <div className='pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl' />
          <div className='pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-lime-300/15 blur-3xl' />

          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/80'>Playlist</p>
          <h1 className='mt-3 text-3xl font-black tracking-tight sm:text-5xl'>
            Album :
            <span className='ml-2 bg-linear-to-r from-lime-200 via-emerald-200 to-green-300 bg-clip-text text-transparent'>
              {albumByIdObj.IdAlbumData.title}
            </span>
          </h1>

          <div className='mt-6 flex flex-wrap items-center gap-3'>
            <span to='/user/track' className='rounded-xl border border-emerald-200/30 bg-emerald-400/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all hover:bg-emerald-400/30'>
              {albumByIdObj.IdAlbumData.artist?.username} • Songs Count
            </span>
          </div>
        </div>
      }

    </section >
  )
}

export default UserAlbumPage