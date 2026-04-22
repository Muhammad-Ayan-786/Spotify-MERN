import { Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Default Routes
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import WelcomePage from './pages/WelcomePage';

// User's Routes
import UserPage from './pages/UserPage';
import UserHomePage from './pages/UserHomePage';
import UserTrackPage from './pages/UserTrackPage';

// Artist's Routes
import ArtistPage from './pages/ArtistPage';
import ArtistHomePage from './pages/ArtistHomePage';
import ArtistSongPage from './pages/ArtistSongPage';
import ArtistUploadPage from './pages/ArtistUploadPage';
import ArtistMyAlbumPage from './pages/ArtistMyAlbumPage';
import ArtistMySongPage from './pages/ArtistMySongPage';
import UserAlbumPage from './pages/UserAlbumPage';

const App = () => {

  const getDecodedToken = () => {
    const raw = localStorage.getItem('token');
    if (!raw) return null;

    const token = raw.startsWith('Bearer ') ? raw.slice(7) : raw;

    try {
      const decoded = jwtDecode(token);
      if (decoded?.exp && decoded.exp * 1000 <= Date.now()) return null;
      return decoded;
    } catch {
      return null;
    }
  };

  const RoleHomeRedirect = () => {
    const decoded = getDecodedToken();

    if (!decoded) return <WelcomePage />;
    if (decoded.role === 'user') return <Navigate to='/user/home' replace />;
    if (decoded.role === 'artist') return <Navigate to='/artist/home' replace />;

    return <WelcomePage />;
  };

  const RequireRole = ({ role, children }) => {
    const decoded = getDecodedToken();

    if (!decoded) return <Navigate to='/api/auth/login' replace />;

    if (role && decoded.role !== role) {
      if (decoded.role === 'user') return <Navigate to='/user/home' replace />;
      if (decoded.role === 'artist') return <Navigate to='/artist/home' replace />;
      return <Navigate to='/' replace />;
    }

    return children;
  };

  return (
    <>
      <Routes>

        {/* Default Routes */}
        <Route path='/' element={<RoleHomeRedirect />} />
        <Route path='/api/auth/register' element={<SignIn />} />
        <Route path='/api/auth/login' element={<Login />} />

        {/* User Routes */}
        <Route
          path='/user'
          element={
            <RequireRole role='user'>
              <UserPage />
            </RequireRole>
          }
        >
          <Route index element={<Navigate to='home' replace />} />
          <Route path='home' element={<UserHomePage />} />
          <Route path='track' element={<UserTrackPage />} />
          <Route path='album/:albumId' element={<UserAlbumPage />} />
        </Route>

        {/* Artist Routes */}
        <Route
          path='/artist'
          element={
            <RequireRole role='artist'>
              <ArtistPage />
            </RequireRole>
          }
        >
          <Route index element={<Navigate to='home' replace />} />
          <Route path='home' element={<ArtistHomePage />} />
          <Route path='song' element={<ArtistSongPage />} />
          <Route path='upload' element={<ArtistUploadPage />} />
          <Route path='my-album' element={<ArtistMyAlbumPage />} />
          <Route path='my-song' element={<ArtistMySongPage />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
