import { Infinity, Pause, Play } from "lucide-react"

const MusicPlayer = ({ currentSong, playSongFunc, musicsObj, isLoop, setIsLoop }) => {
  return (
    <div className="music-play sticky bottom-0 z-20 mt-2 flex flex-row gap-4 justify-between rounded-2xl border border-white/15 bg-black/70 px-4 py-4 backdrop-blur-md sm:mt-auto sm:shrink-0 sm:flex-row sm:items-center sm:justify-between sm:px-8 min-[0px]:flex-col min-[350px]:flex-row">
      {/* Song Details */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300/90">
          {currentSong !== null
            ? "Currently Playing"
            : "Please select a song to play"
          }
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-wide text-white sm:text-2xl">
          {currentSong !== null
            ? musicsObj.data[currentSong].title
            : "No song selected"
          }
        </h2>
      </div>

      {/* Player Controls */}
      <div className="icons flex items-center justify-center gap-3 sm:justify-end">
        {/* Play & Pause Button Logic */}
        {currentSong === null ?
          // Disabled Play Button
          <button
            type="button"
            className="DisabledBtn rounded-full bg-zinc-800 p-2.5 text-zinc-500 shadow-lg shadow-zinc-900/20 transition"
            aria-label="Play"
            disabled
          >
            <Play size={18} className="fill-current h-5 w-5" />
          </button>
          :
          // Play Button
          <button
            type="button"
            className="rounded-full bg-lime-400 p-2.5 text-zinc-900 shadow-lg shadow-lime-500/30 transition hover:bg-lime-300"
            aria-label="Pause"
            onClick={() => {
              playSongFunc(null, null)
            }}
          >
            <Pause size={18} className="fill-current h-5 w-5" />
          </button>
        }

        {/* Song on Loop Button Logic */}
        {currentSong === null ?
          // Disabled Repeat Button
          <button
            type="button"
            className={`
                  ${isLoop &&
              'bg-lime-400 p-2.5 text-zinc-900 shadow-lg shadow-lime-500/30 transition hover:bg-lime-300'
              }
                  DisabledBtn rounded-full border border-white/20 p-2.5  bg-zinc-800 text-zinc-500 shadow-lg shadow-zinc-900/20 transition
                `}
            aria-label="Repeat"
            disabled
          >
            <Infinity className="h-5 w-5" />
          </button>
          :
          // Repeat Button
          <button
            type="button"
            className={`
                ${isLoop
                ? 'bg-lime-400 p-2.5 text-zinc-900 shadow-lg shadow-lime-500/30 transition hover:bg-lime-300'
                : 'text-white transition hover:bg-white/10'
              }
                rounded-full border border-white/20 p-2.5
                `}
            aria-label="Repeat"
            onClick={() => {
              const nextLoop = !isLoop
              setIsLoop(nextLoop)
              playSongFunc(musicsObj.data[currentSong].uri, currentSong, nextLoop);
            }}>
            <Infinity className="h-5 w-5" />
          </button>
        }
      </div>
    </div>
  )
}

export default MusicPlayer