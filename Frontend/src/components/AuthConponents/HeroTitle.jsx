import React from 'react'

const HeroTitle = ({ ButtonMessage, MainTitle, Description }) => {
  return (
    <div className="space-y-2 text-center">
      <p className="inline-flex rounded-full border border-green-400/35 bg-green-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-200">
        {ButtonMessage}
      </p>
      <h1 className="bg-linear-to-r from-lime-200 via-green-300 to-emerald-200 bg-clip-text text-3xl font-black tracking-tight text-transparent py-2 sm:text-4xl">
        {MainTitle}
      </h1>
      <p className="text-sm text-gray-300 sm:text-base">
        {Description}
      </p>
    </div>
  )
}

export default HeroTitle