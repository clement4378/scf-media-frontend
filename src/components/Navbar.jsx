import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#080a0d]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10">
            <span className="text-sm font-bold text-[#d4af37]">SCF</span>
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wider text-white">
              SCF MEDIA
            </h1>
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500">
              Capture • Remember • Preserve
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#how-it-works"
            className="text-sm text-gray-300 hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="text-sm text-gray-300 hover:text-white"
          >
            About
          </a>

          <Link
            to="/login"
            className="text-sm text-gray-300 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-[#d4af37] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#e4c45c]"
          >
            Create Account
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#080a0d] px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            <a
              href="#how-it-works"
              onClick={() => setIsOpen(false)}
              className="text-gray-300"
            >
              How It Works
            </a>

            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="text-gray-300"
            >
              About
            </a>

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-gray-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-[#d4af37] px-5 py-3 text-center font-semibold text-black"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;