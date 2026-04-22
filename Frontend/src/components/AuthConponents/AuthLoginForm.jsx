import { Key, User } from 'lucide-react';

const AuthLoginForm = ({ formSubmit, twoWaysBinding, user }) => {
  return (
    <form className="flex flex-1 flex-col gap-5" onSubmit={formSubmit}>

      {/* Username Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-medium text-gray-300 sm:text-base">Username</label>
        <div className="relative flex items-center">
          <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-green-400" size={18} />
          <input
            className="h-12 w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-4 text-base text-gray-100 placeholder:text-gray-400/70 outline-none transition hover:border-white/25 focus:border-green-400/60 focus:ring-2 focus:ring-green-500/25"
            required
            type="text"
            id="username"
            name="username"
            placeholder='Enter your Username'
            autoComplete="off"
            value={user.username}
            onChange={twoWaysBinding}
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-300 sm:text-base">Password</label>
        <div className="relative flex items-center">
          <Key className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-green-400" size={18} />
          <input
            className="h-12 w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-4 text-base text-gray-100 placeholder:text-gray-400/70 outline-none transition hover:border-white/25 focus:border-green-400/60 focus:ring-2 focus:ring-green-500/25"
            required
            type="password"
            id="password"
            name="password"
            placeholder='Enter your Password'
            autoComplete="off"
            value={user.password}
            onChange={twoWaysBinding}
          />
        </div>
      </div>

      {/* Roles Container */}
      <div className="role my-1 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* USER Role */}
        <div className="flex items-center gap-3 rounded-xl border border-green-400/35 bg-green-500/15 px-4 py-2.5 font-semibold uppercase text-green-100 transition hover:bg-green-500/25">
          <input
            type="radio"
            name="role"
            id="user"
            value="user"
            checked={user.role === 'user'}
            onChange={twoWaysBinding}
          />
          <label htmlFor="user">user</label>
        </div>
        {/* Artist Role */}
        <div className="flex items-center gap-3 rounded-xl border border-green-400/35 bg-green-500/15 px-4 py-2.5 font-semibold uppercase text-green-100 transition hover:bg-green-500/25">
          <input
            type="radio"
            name="role"
            id="artist"
            value="artist"
            checked={user.role === 'artist'}
            onChange={twoWaysBinding}
          />
          <label htmlFor="artist">artist</label>
        </div>
      </div>

      {/* Submit Form */}
      <button className="w-full rounded-xl bg-green-500 py-3 text-lg font-bold uppercase text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/35">
        Log in
      </button>

    </form>
  )
}

export default AuthLoginForm