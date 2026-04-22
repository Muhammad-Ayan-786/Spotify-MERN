import axios from 'axios'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'

const UserPage = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const [active, setActive] = useState('home') // State to manage active navigation link (default is 'home')
  const [isMenuOpen, setIsMenuOpen] = useState(false) // State to manage mobile navigation menu visibility

  // Content for User's Navigation Bar Logo Section
  const logoNavContent = {
    subHead: 'Your Music',
    mainHead: 'Spotify',
    paraHead: 'Listen, discover, repeat'
  }

  // Navigation Links for User
  const navLinks = [
    { activeNav: 'home', path: '/user/home', displayName: 'Home' },
    { activeNav: 'track', path: '/user/track', displayName: 'Tracks' },
    { activeNav: 'album', path: '/user/album/:albumId', displayName: 'Album' },
  ]

  // Logout function for User
  const logoutFunc = async () => {
    await axios.post("http://localhost:3000/api/auth/logout")
    localStorage.clear();
    navigate('/api/auth/login')
  }

  // Set active navigation link based on current URL path
  useEffect(() => {
    if (location.pathname.startsWith('/user/home')) {
      setActive('home')
    }
    if (location.pathname.startsWith('/user/track')) {
      setActive('track')
    }
    if (location.pathname.startsWith('/user/album/')) {
      setActive('album')
    }
  }, [location.pathname])


  return (
    <section className='relative flex h-screen w-full overflow-hidden bg-linear-to-br from-zinc-950 via-emerald-950 to-black text-white'>
      {/* Navigation Bar */}
      <NavigationBar
        {...logoNavContent}
        navLinks={navLinks}
        logoutFunc={logoutFunc}
        active={active}
        isMenuOpen={isMenuOpen}
        setActive={setActive}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Content */}
      <main className='scrollbar-adaptive min-h-0 flex-1 overflow-y-auto p-4 sm:p-8'>
        <Outlet />
      </main>

    </section >
  )
}

export default UserPage
