import { Infinity, Pause, Play } from "lucide-react"
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchMusic } from '../store/features/musicAPI';
import Header from '../components/Header';
import Songs from '../components/Songs';
import MusicPlayer from '../components/MusicPlayer';

const ArtistSongPage = () => {

  const dispatch = useDispatch()
  const musicsObj = useSelector((state) => state.music)

  const [currentSong, setCurrentSong] = useState(null)
  const [isLoop, setIsLoop] = useState(false)
  const audioRef = useRef(new Audio())

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
  }, [dispatch])

  useEffect(() => {
    return () => {
      audioRef.current.pause()
    }
  }, [])

  return (
    <section className="flex h-full min-h-0 flex-col gap-6">
      {/* Header */}
      <Header
        ButtonMessage="Discover"
        MainTitle="All Music"
        Description="Browse every uploaded track and play any song instantly."
      />

      {/* Songs column */}
      <div className="w-full flex min-h-0 max-h-85 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-3 backdrop-blur-sm sm:p-4" >
        <h2 className="mb-3 shrink-0 text-sm font-semibold uppercase tracking-wider text-zinc-400">
          All Songs
        </h2>

        <div className="songs flex min-h-0 flex-1 pr-1 flex-col gap-2 overflow-y-auto overscroll-contain scrollbar-hide">
          {
            musicsObj.isLoading
              ?
              <div className="flex min-h-40 flex-1 items-center justify-center py-12">
                <Infinity size={20} className="h-9 w-9 cursor-pointer animate-spin rounded-full bg-lime-500/20 p-2 text-lime-300" />
              </div>
              :
              (musicsObj.data && musicsObj.data.length > 0
                ? musicsObj.data.map((song, idx) => (
                  <Songs
                    key={idx}
                    idx={idx}
                    song={song}
                    currentSong={currentSong}
                    playSongFunc={playSongFunc}
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

export default ArtistSongPage