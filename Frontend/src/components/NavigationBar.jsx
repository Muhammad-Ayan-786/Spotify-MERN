import { LogOut, Menu, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const NavigationBar = ({
  subHead, mainHead, paraHead,
  navLinks,
  logoutFunc,
  active, setActive,
  isMenuOpen, setIsMenuOpen
}) => {

  const [username, setUsername] = useState('')

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/get-user', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })

      setUsername(response.data.user.username || '')
      return response.data.user
    } catch (err) {
      setUsername('')
      return null
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`${isMenuOpen ? 'fixed inset-0 z-40 flex w-full' : 'hidden'} sm:relative sm:z-auto sm:flex sm:h-screen sm:w-72 flex-col justify-between border-r border-white/10 bg-black/55 p-5 backdrop-blur-xl sm:bg-black/30 sm:backdrop-blur-md`}>

        <div className='flex flex-col gap-7'>
          {/* User Studio Logo */}
          <div className='rounded-2xl flex flex-col gap-2 border border-white/15 bg-white/5 p-4 shadow-[0_16px_40px_-20px_rgba(74,222,128,0.55)]'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-green-200/80'>{subHead}</p>
            <h1 className='pb-2 bg-linear-to-r from-lime-200 via-green-300 to-emerald-200 bg-clip-text text-4xl font-black tracking-tight text-transparent'>
              {mainHead}
            </h1>
            <p className='text-sm text-zinc-300'>{paraHead}</p>
          </div>

          {/* Navigation Links */}
          <ul className='flex flex-col gap-3'>
            {navLinks.map((link, idx) => {
              return (
                <Link key={idx}
                  to={`${link.path}`}
                  className='w-full rounded-xl px-4 py-2.5 text-lg font-semibold uppercase tracking-wide transition-all active:scale-95 hover:bg-green-500/20'
                  style={active === link.activeNav ? { background: 'linear-gradient(135deg, rgba(20,83,45,0.9), rgba(3,7,18,0.9))', boxShadow: '0 20px 40px -20px rgba(163,230,53,0.65)', borderLeft: '3px solid #84cc16' } : { background: 'none' }}
                  onClick={() => {
                    setActive(link.activeNav)
                    setIsMenuOpen(false)
                  }}
                >
                  {link.displayName}
                </Link>
              )
            })}
          </ul>
        </div>

        {/* Logout Button */}
        <div className='border-t flex flex-col gap-3 border-white/10 pt-4'>
          <div className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 py-2 px-3 shadow-[0_18px_45px_-30px_rgba(16,185,129,0.65)]'>
            <div className='pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-emerald-500/20 blur-3xl opacity-70 transition-opacity duration-300 group-hover:opacity-100' />
            <div className='pointer-events-none absolute -left-16 -bottom-20 h-48 w-48 rounded-full bg-lime-500/10 blur-3xl opacity-70 transition-opacity duration-300 group-hover:opacity-100' />

            <div className='relative flex items-center gap-3'>
              <div className='relative shrink-0'>
                <div className='grid h-10 w-10 place-items-center rounded-full bg-linear-to-br from-emerald-400/35 via-lime-300/15 to-cyan-300/20 ring-1 ring-white/10 sm:h-10 sm:w-10'>
                  {username
                    ? (
                      <span className='text-base font-black tracking-tight text-emerald-50 sm:text-lg'>
                        {username[0]?.toUpperCase()}
                      </span>
                    )
                    : (
                      <UserRound size={18} className='text-emerald-50/80' />
                    )}
                </div>
                <span className='absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-black/60' />
              </div>

              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-semibold text-zinc-100 sm:text-[15px]'>
                  {username || 'Signed out'}
                </p>
                <p className='truncate text-xs text-zinc-400'>
                  {username ? 'Profile' : 'Connect your account'}
                </p>
              </div>
            </div>
          </div>

          <button
            type='button'
            className='flex w-full items-center justify-center gap-2 rounded-2xl border border-red-400/25 bg-red-500/10 px-3 py-2.5 text-sm font-semibold uppercase tracking-wide text-red-100 transition-all hover:border-red-400/40 hover:bg-red-500/20 active:scale-[0.99] sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/40'
            onClick={logoutFunc}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile Menu Toggle Button */}
      <button
        type='button'
        aria-label='Toggle navigation menu'
        className='sm:hidden fixed top-5 right-5 z-50 rounded-xl border border-white/20 bg-black/45 p-2.5 text-white shadow-[0_12px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-emerald-500/25 active:scale-95'
        onClick={() => {
          setIsMenuOpen(prev => !prev)
        }}
      >
        <Menu size={20} />
      </button>
    </>
  )
}

export default NavigationBar
