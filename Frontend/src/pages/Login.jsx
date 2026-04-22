import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import HeroTitle from "../components/AuthConponents/HeroTitle";
import AuthLoginForm from "../components/AuthConponents/AuthLoginForm";

const Login = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    username: '',
    password: '',
    role: 'user'
  })

  const twoWaysBinding = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const formSubmit = async (e) => {
    e.preventDefault()

    try {
      const responce = await axios.post('http://localhost:3000/api/auth/login', user)

      localStorage.setItem('token', responce.headers.authorization)

      setUser({
        username: '',
        password: '',
        role: 'user'
      });

      const tokenDecode = jwtDecode(responce.headers.authorization)

      if (responce.status === 200 && tokenDecode.role === 'user') {
        navigate('/user/home')
      }

      if (responce.status === 200 && tokenDecode.role === 'artist') {
        navigate('/artist/home')
      }

      return responce;

    } catch (err) {
      console.log("Error", err);
      alert('You are passing Invalid credentials')
    }
  }


  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-linear-to-br from-zinc-950 via-emerald-950 to-black px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.22),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_45%)]" />

      {/* Centered Container */}
      <div className="relative z-10 flex w-full max-w-xl flex-col gap-6 rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_20px_45px_-25px_rgba(74,222,128,0.5)] backdrop-blur-md sm:p-8">

        {/* Hero Title */}
        <HeroTitle
          ButtonMessage={"Welcome Back"}
          MainTitle={"Login to your account"}
          Description={"Continue your music journey."}
        />

        {/* Sign-in Form */}
        <AuthLoginForm
          formSubmit={formSubmit}
          twoWaysBinding={twoWaysBinding}
          user={user}
        />

        {/* Login Route */}
        <p className="text-center text-sm text-gray-300 sm:text-base">
          Don't have an account? <Link to='/api/auth/register' className="cursor-pointer font-semibold text-green-400 transition hover:text-green-300">
            Register
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login