import axios from 'axios'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'

const ArtistSongPage = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const [active, setActive] = useState('home') // State to manage active navigation link (default is 'home')
  const [isMenuOpen, setIsMenuOpen] = useState(false) // State to manage mobile navigation menu visibility

  // Content for Artist's Navigation Bar Logo Section
  const logoNavContent = {
    subHead: 'Artist Studio',
    mainHead: 'Spotify',
    paraHead: 'Manage your music world'
  }

  // Navigation Links for Artist
  const navLinks = [
    { activeNav: 'home', path: '/artist/home', displayName: 'Home' },
    { activeNav: 'song', path: '/artist/song', displayName: 'Songs' },
    { activeNav: 'upload', path: '/artist/upload', displayName: 'Upload' },
    { activeNav: 'myAlbum', path: '/artist/my-album', displayName: 'My Albums' },
    { activeNav: 'mySong', path: '/artist/my-song', displayName: 'My Songs' },
  ]

  // Logout function for Artist
  const logoutFunc = async () => {
    await axios.post("http://localhost:3000/api/auth/logout")
    localStorage.clear();
    navigate('/api/auth/login')
  }

  // Set active navigation link based on current URL path
  useEffect(() => {
    if (location.pathname.startsWith('/artist/home')) {
      setActive('home')
    }
    else if (location.pathname.startsWith('/artist/song')) {
      setActive('song')
    }
    else if (location.pathname.startsWith('/artist/upload')) {
      setActive('upload')
    }
    else if (location.pathname.startsWith('/artist/my-album')) {
      setActive('myAlbum')
    }
    else if (location.pathname.startsWith('/artist/my-song')) {
      setActive('mySong')
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
        setActive={setActive}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Content */}
      <main className='scrollbar-adaptive min-h-0 flex-1 overflow-y-auto p-4 sm:p-8'>
        <Outlet />
      </main>
    </section>
  )
}

export default ArtistSongPage
