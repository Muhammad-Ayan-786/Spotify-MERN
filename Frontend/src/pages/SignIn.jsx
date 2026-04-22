import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeroTitle from "../components/AuthConponents/HeroTitle";
import AuthSinginForm from "../components/AuthConponents/AuthSinginForm";

const SignIn = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    username: '',
    email: '',
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
      const responce = await axios.post('http://localhost:3000/api/auth/register', user)

      setUser({
        username: '',
        email: '',
        password: '',
        role: 'user'
      });

      navigate('/api/auth/login')

      return responce;
    } catch (err) {
      alert('Account Already Exist !')
      console.log("Error", err);
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
          ButtonMessage={"Join Spotify"}
          MainTitle={"Create your account"}
          Description={"Start streaming your favorite songs in seconds."}
        />

        {/* Sign-in Form */}
        <AuthSinginForm
          formSubmit={formSubmit}
          twoWaysBinding={twoWaysBinding}
          user={user}
        />

        {/* Login Route */}
        <p className="text-center text-sm text-gray-300 sm:text-base">
          Already have an account? <Link to='http://localhost:5173/api/auth/login' className="cursor-pointer font-semibold text-green-400 transition hover:text-green-300">
            Log in
          </Link>
        </p>

      </div>
    </section>
  )
}

export default SignIn