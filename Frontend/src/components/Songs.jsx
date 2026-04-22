import { Infinity, Pause, Play } from "lucide-react"

const Songs = ({ songsHeading, musicsObj, currentSong, playSongFunc }) => {
  return (
    <div className="w-full flex min-h-0 max-h-60 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-3 backdrop-blur-sm sm:p-4" >
      <h2 className="mb-3 shrink-0 text-sm font-semibold uppercase tracking-wider text-zinc-400">
        {songsHeading}
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
                <div
                  key={idx}
                  className="song group flex items-start gap-1 cursor-pointer justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-green-400/25 hover:bg-green-500/10 
                  max-[350px]:flex-col min-[640px]:flex-col min-[770px]:flex-row 
                  max-[350px]:items-start min-[640px]:items-start min-[770px]:items-center
                  min-[350px]:gap-4"
                  style={currentSong === idx ? {
                    background: 'linear-gradient(90deg, #a3e635 0%, #34d399 100%)',
                    boxShadow: '2px 4px 25px -2px #bef264cc',
                    border: '2px solid #bbf7d0'
                  } : {}}
                  onDoubleClick={() => {
                    playSongFunc(song.uri, idx)
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold tracking-wide text-white sm:text-lg">
                      {song.title}
                    </h3>
                    <p className="mt-0.5 truncate font-mono text-[11px] text-zinc-500 sm:text-xs" title={String(song._id ?? song.id ?? '')}>
                      ID: {song._id ?? song.id ?? '—'}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 truncate sm:gap-6 max-[350px]:w-full max-[350px]:justify-between min-[640px]:w-full min-[770px]:w-auto min-[640px]:justify-between min-[770px]:justify-end">
                    <p className="truncate text-sm text-zinc-400">
                      {song.artist.username}
                    </p>

                    {
                      currentSong === idx ?
                        <button
                          type="button"
                          className="rounded-full bg-lime-500/90 p-2.5 text-zinc-900 shadow-lg shadow-lime-500/25 transition group-hover:bg-lime-400"
                          aria-label="Play"
                          onClick={() => {
                            playSongFunc(null, null)
                          }}
                        >
                          <Pause size={18} className="fill-current" />
                        </button>
                        :
                        <button
                          type="button"
                          className="rounded-full bg-lime-500/90 p-2.5 text-zinc-900 shadow-lg shadow-lime-500/25 transition group-hover:bg-lime-400"
                          aria-label="Play"
                          onClick={() => {
                            playSongFunc(song.uri, idx)
                          }}
                        >
                          <Play size={18} className="fill-current" />
                        </button>
                    }
                  </div>
                </div>
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
  )
}

export default Songs
