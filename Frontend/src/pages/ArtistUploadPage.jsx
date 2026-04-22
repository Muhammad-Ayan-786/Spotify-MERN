import { useState } from 'react'
import axios from 'axios';

const ArtistUploadPage = () => {

  const [songTitle, setSongTitle] = useState('')
  const [songFile, setSongFile] = useState(null)

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('title', songTitle)
    formData.append('music', songFile)

    const token = localStorage.getItem('token')
    const headers = {
      'Authorization': token
    }

    try {
      const res = await axios.post('http://localhost:3000/api/music/upload', formData, { headers })

      setSongTitle('')
      setSongFile(null)

      return res

    } catch (err) {
      console.log("Error", err);
    }
  }

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 p-4 sm:p-6">

      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_20px_45px_-25px_rgba(74,222,128,0.5)] backdrop-blur-md sm:p-8">
          <div className="border-b border-white/10 pb-5">
            <h2 className="pb-3 bg-linear-to-r from-lime-200 via-green-300 to-emerald-200 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
              Upload Song
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-300/80">
              Add a title and choose an audio file to upload.
            </p>
          </div>

          <form onSubmit={formSubmitHandler} className="mt-6 space-y-6">
            {/* Song-Title */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="title" className="text-sm font-semibold uppercase tracking-wider text-gray-200">
                Title
              </label>
              <input
                className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-base text-gray-100 placeholder:text-gray-400/70 outline-none transition hover:border-white/25 focus:border-green-400/60 focus:ring-2 focus:ring-green-500/25"
                required
                type="text"
                id="title"
                name="title"
                placeholder="Enter your song title"
                autoComplete="off"
                value={songTitle}
                onChange={(e) => {
                  setSongTitle(e.target.value)
                }}
              />
            </div>

            {/* Song-File */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="file" className="text-sm font-semibold uppercase tracking-wider text-gray-200">
                File
              </label>
              <input
                className="w-full cursor-pointer rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-gray-100 outline-none transition hover:border-white/25 file:mr-4 file:cursor-pointer file:rounded-lg file:border file:border-white/15 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-100 hover:file:bg-white/15 focus:border-green-400/60 focus:ring-2 focus:ring-green-500/25"
                required
                type="file"
                id="file"
                name="file"
                onChange={(e) => {
                  setSongFile(e.target.files[0])
                }}
              />
              <p className="text-sm text-gray-300/60">
                Choose a single audio file. Supported formats depend on your browser and backend.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-linear-to-r from-lime-300 via-green-400 to-emerald-400 px-6 text-sm font-extrabold tracking-wide text-gray-900 shadow-[0_18px_45px_-25px_rgba(74,222,128,0.95)] transition hover:from-lime-200 hover:via-green-300 hover:to-emerald-300 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-green-500/30"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>

    </section>
  )
}

export default ArtistUploadPage
