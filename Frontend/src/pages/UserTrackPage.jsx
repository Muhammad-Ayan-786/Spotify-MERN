import { Infinity } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchMusic } from '../store/features/musicAPI';
import { fetchAlbum } from '../store/features/albumAPI';
import Header from '../components/Header';
import Songs from '../components/Songs';
import MusicPlayer from '../components/MusicPlayer';
import { useNavigate } from 'react-router-dom';

const UserTrackPage = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const musicsObj = useSelector((state) => state.music)
  const albumsObj = useSelector((state) => state.album)

  const [currentSong, setCurrentSong] = useState(null)
  const audioRef = useRef(new Audio())
  const [isLoop, setIsLoop] = useState(false)

  const playSongFunc = (uri, idx, onloop = false) => {
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
    dispatch(fetchMusic())
    dispatch(fetchAlbum())
  }, [])

  useEffect(() => {
    return () => {
      audioRef.current.pause()
      audioRef.current.loop = false
      setIsLoop(false)
    }
  }, [])

  return (
    <section className="scrollbar-adaptive flex lg:h-full lg:min-h-0 flex-col gap-4 pb-2 sm:gap-6">
      {/* Header */}
      <Header
        ButtonMessage={"Discover"}
        MainTitle={"Home"}
        Description={"Browse albums, explore songs, and jump into your library in one place."}
      />

      {/* Main — albums & songs side by side on large screens */}
      <div className="flex flex-col gap-3 min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-4 backdrop-blur-sm sm:p-5 sm:gap-4 lg:min-h-0  lg:flex-row lg:items-stretch lg:gap-6 lg:overflow-hidden">

        {/* Albums column */}
        <div className="w-full flex min-h-0 max-h-60 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-3 backdrop-blur-sm sm:p-4">
          <h2 className="mb-3 shrink-0 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Albums
          </h2>

          <div className="albums flex min-h-0 flex-1 pr-1 overflow-y-auto overscroll-contain scrollbar-hide">
            {albumsObj.isLoading
              ?
              <div className="flex min-h-30 items-center justify-center py-8">
                <Infinity size={20} className="h-9 w-9 cursor-pointer animate-spin rounded-full bg-lime-500/20 p-2 text-lime-300" />
              </div>
              :
              <div className="flex flex-wrap justify-start gap-4 sm:gap-3 min-[640px]:justify-center min-[670px]:justify-center">
                {albumsObj.data.map((album, idx) => (
                  <div
                    key={idx}
                    className="album relative flex aspect-square min-h-30 flex-col justify-end overflow-hidden rounded-xl border border-white/10 bg-linear-to-br from-emerald-900/80 to-zinc-900/90 p-2.5 shadow-[0_8px_24px_-10px_rgba(74,222,128,0.35)] cursor-pointer sm:aspect-square sm:max-h-36 sm:p-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/user/album/${album._id}`)
                    }}
                  >
                    <span className="absolute left-1.5 top-1.5 rounded-md bg-black/40 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-lime-200/90">
                      Album
                    </span>
                    <h3 className="line-clamp-2 text-center text-[11px] font-semibold leading-tight tracking-wide text-white sm:text-xs">
                      {album.title}
                    </h3>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>

        {/* Songs column */}
        <Songs
          songsHeading={"Songs"}
          musicsObj={musicsObj}
          currentSong={currentSong}
          playSongFunc={playSongFunc}
        />
      </div>

      {/* Music Player */}
      <MusicPlayer
        isLoop={isLoop}
        setIsLoop={setIsLoop}
        musicsObj={musicsObj}
        currentSong={currentSong}
        playSongFunc={playSongFunc}
      />

    </section>
  )
}

export default UserTrackPage