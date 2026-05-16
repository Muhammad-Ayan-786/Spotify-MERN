import { useEffect, useRef, useState } from "react";

export const useAudioPlayer = (songURL = '') => {
  const audioRef = useRef(new Audio())
  const [currentSong, setCurrentSong] = useState(null)
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
    playTheSong(songURL, currentSong, isLoop)
  }, [])

  useEffect(() => {
    return () => {
      audioRef.current.pause()
      audioRef.current.loop = false
    }
  }, [])

  return {
    currentSong,
    playTheSong,
    isLoop,
    setIsLoop
  }
}