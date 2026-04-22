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

      {/* Main */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-4 backdrop-blur-sm sm:p-5">
        {/* Songs column */}
        <Songs
          songsHeading={"All Songs"}
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

export default ArtistSongPage