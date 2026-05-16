import { useEffect, useRef, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom"
import { fetchAlbumById } from "../store/features/albumByIdAPI";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Music2, Infinity } from "lucide-react";
import Songs from "../components/Songs";
import MusicPlayer from "../components/MusicPlayer";

const UserAlbumPage = () => {

  const params = useParams()
  const dispatch = useDispatch()

  const albumParamID = params.albumId
  const invalid = albumParamID === ':albumId'

  const AlbumObjByID = useSelector((state) => state.albumById)

  const [currentSong, setCurrentSong] = useState(null)
  const audioRef = useRef(new Audio())
  const [isLoop, setIsLoop] = useState(false)

  const playTheSong = (uri, idx, onloop = false) => {
    const audio = audioRef.current

    if (uri) {
      setCurrentSong(idx)
      setIsLoop(onloop)
      audio.src = uri
      audio.loop = onloop
      audio.play()
    }
    else {
      setCurrentSong(null)
      setIsLoop(false)
      audio.loop = false
      audio.pause()
    }
  }

  useEffect(() => {
    if (!invalid) {
      dispatch(fetchAlbumById(params))
    }
  }, [])

  useEffect(() => {
    return () => {
      audioRef.current.pause()
      audioRef.current.loop = false
      setIsLoop(false)
    }
  }, [])

  return (
    <section className="scrollbar-adaptive flex lg:h-full lg:min-h-0 flex-col gap-4 pb-2 sm:gap-6 text-white">

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
          <div className="flex min-h-0 flex-1 flex-col gap-4">

            {/* Header */}
            <div className='relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-emerald-500/20 via-zinc-900/70 to-black/90 p-6 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.85)] sm:p-8'>
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
                  {AlbumObjByID.IdAlbumData.artist?.username} • Songs: {AlbumObjByID.IdAlbumData.musics?.length}
                </span>
              </div>
            </div>


            {/* Main — songs */}
            <div className="flex flex-col gap-3 min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-4 backdrop-blur-sm sm:p-5 sm:gap-4">
              <div className="w-full flex min-h-72 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-3 backdrop-blur-sm sm:min-h-80 sm:p-4 md:min-h-88" >
                <h2 className="mb-3 shrink-0 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Songs
                </h2>

                <div className="songs flex min-h-0 max-h-60 flex-1 pr-1 flex-col gap-2 overflow-y-auto overscroll-contain scrollbar-hide">
                  {
                    AlbumObjByID.isLoading
                      ?
                      <div className="flex min-h-40 flex-1 items-center justify-center py-12">
                        <Infinity size={20} className="h-9 w-9 cursor-pointer animate-spin rounded-full bg-lime-500/20 p-2 text-lime-300" />
                      </div>
                      :
                      (AlbumObjByID.IdAlbumData.musics && AlbumObjByID.IdAlbumData.musics?.length > 0
                        ? AlbumObjByID.IdAlbumData.musics.map((song, idx) => (
                          <Songs
                            key={idx}
                            idx={idx}
                            song={song}
                            currentSong={currentSong}
                            playTheSong={playTheSong}
                          />
                        ))
                        :
                        (
                          <p className="py-12 text-center text-sm text-zinc-500">
                            No music found yet. Add songs to see them here.
                          </p>
                        )
                      )
                  }
                </div>
              </div>
            </div>

            {/* Music Player (same placement pattern as Track page) */}
            <MusicPlayer
              isLoop={isLoop}
              setIsLoop={setIsLoop}
              track={AlbumObjByID.IdAlbumData.musics}
              currentSong={currentSong}
              playTheSong={playTheSong}
            />

          </div>
      }

    </section >
  )
}

export default UserAlbumPage
