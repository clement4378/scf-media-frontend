
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);

      // Send the user to the correct area
      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0d] text-white">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE — IMAGE */}
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src="/hero-photo.JPG"
            alt="SCF MEDIA photography"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/65" />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10">

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold tracking-widest"
            >
              SCF <span className="text-[#D4AF37]">MEDIA</span>
            </Link>

            {/* Text */}
            <div className="max-w-lg">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#D4AF37]">
                Welcome Back
              </p>

              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Your memories are waiting for you.
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-gray-300">
                Sign in to discover the moments you were part of,
                view your personal gallery and download your photos.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — LOGIN FORM */}
        <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-12 lg:hidden">
              <Link
                to="/"
                className="text-2xl font-bold tracking-widest"
              >
                SCF <span className="text-[#D4AF37]">MEDIA</span>
              </Link>
            </div>

            {/* Back */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D4AF37]"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
                Member Login
              </p>

              <h2 className="text-3xl font-bold sm:text-4xl">
                Welcome back
              </h2>

              <p className="mt-3 text-gray-400">
                Sign in to access your private photo gallery.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white outline-none placeholder:text-gray-600 transition focus:border-[#D4AF37] focus:bg-white/[0.07]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#D4AF37] transition hover:text-[#e5c04a]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-12 text-white outline-none placeholder:text-gray-600 transition focus:border-[#D4AF37] focus:bg-white/[0.07]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#D4AF37] py-3.5 font-semibold text-black transition hover:bg-[#e5c04a] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Register */}
            <div className="mt-8 text-center text-sm text-gray-400">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#D4AF37] transition hover:text-[#e5c04a]"
              >
                Create an account
              </Link>
            </div>

            {/* Privacy */}
            <div className="mt-10 flex items-center justify-center gap-2 text-xs text-gray-600">
              <Lock size={13} />
              Your gallery is private and protected.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;