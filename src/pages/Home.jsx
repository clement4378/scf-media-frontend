import { Link } from "react-router-dom";

import {
  Camera,
  UserPlus,
  ScanFace,
  Download,
  ShieldCheck,
  ArrowRight,
   Lock,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import heroImage from "../assets/hero-photo.JPG";
import social from "../assets/social.JPG"
import { MdEmail } from "react-icons/md";


const Home = () => {
  return (
    <main className="bg-[#080a0d] text-white">
      {/* Hero */}
     <section
  className="relative flex min-h-[90vh] items-center overflow-hidden"
  style={{
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/65"></div>

  {/* Extra gradient for readability */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30"></div>

  {/* Hero content */}
  <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
    <div className="max-w-3xl">

      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-black/30 px-4 py-2 backdrop-blur-sm">
        <Camera size={16} className="text-[#D4AF37]" />

        <span className="text-sm tracking-wide text-gray-200">
          Sunday Service Photography
        </span>
      </div>

      <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
        Capturing Moments.
        <span className="block text-[#D4AF37]">
          Preserving Memories.
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
        Your moments deserve more than a camera roll. SCF MEDIA helps you
        discover, view and download the photographs you appear in.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">

        <Link
          to="/register"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 font-semibold text-black transition hover:bg-[#e5c04a]"
        >
          Create Account
          <ArrowRight size={18} />
        </Link>

        <Link
          to="/login"
          className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
        >
          Find My Photos
        </Link>

      </div>

      {/* Small trust message */}
      <div className="mt-10 flex items-center gap-3 text-sm text-gray-400">
        <Lock size={16} className="text-[#D4AF37]" />

        <span>
          Your photos are private and accessible only to you.
        </span>
      </div>

    </div>
  </div>
</section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-white/10 py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Your photos, without the searching.
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              SCF MEDIA uses secure photo management and face matching to
              help you find the photographs that belong to you.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4af37]/10">
                <ScanFace className="text-[#d4af37]" />
              </div>

              <span className="text-sm text-gray-500">01</span>

              <h3 className="mt-3 text-xl font-semibold">
                Create your account
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Register your account and provide the information needed
                to help us identify your photographs.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4af37]/10">
                <Camera className="text-[#d4af37]" />
              </div>

              <span className="text-sm text-gray-500">02</span>

              <h3 className="mt-3 text-xl font-semibold">
                We find your photos
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Our photo-matching system helps identify photographs in
                which you appear, including group photographs.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4af37]/10">
                <Download className="text-[#d4af37]" />
              </div>

              <span className="text-sm text-gray-500">03</span>

              <h3 className="mt-3 text-xl font-semibold">
                Download your memories
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                View your private gallery and download individual photos
                or your complete collection.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Privacy */}
      <section
        id="about"
        className="border-t border-white/10 py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
          
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Private by design
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Your gallery belongs to you.
            </h2>
          </div>

          <div className="space-y-5 text-gray-400">
            <p className="leading-8">
              SCF MEDIA is designed so that members only see photographs
              that have been assigned to their account.
            </p>

            <div className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <Lock className="mt-1 shrink-0 text-[#d4af37]" />
              <div>
                <h3 className="font-semibold text-white">
                  Private photo access
                </h3>
                <p className="mt-1 text-sm leading-6">
                  Your gallery is protected by your account and
                  authorization.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <ShieldCheck className="mt-1 shrink-0 text-[#d4af37]" />
              <div>
                <h3 className="font-semibold text-white">
                  Secure downloads
                </h3>
                <p className="mt-1 text-sm leading-6">
                  Photos are delivered through protected access rather
                  than publicly exposed galleries.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-24 "
           style={{
    backgroundImage: `url(${social})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    
  }}
      >
        <div className="mx-auto max-w-6xl h-96 px-6 text-center inset-0 bg-black/65 pt-28 ">
          <h2 className="text-4xl font-bold sm:text-5xl ">
            Never lose a memory.
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-yellow-600 bg-white">
            Create your SCF MEDIA account and keep your event memories
            close.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#d4af37] px-7 py-4 font-semibold text-black hover:bg-[#e4c45c]"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
     <footer className="border-t border-white/10 bg-[#080a0d]">
  <div className="mx-auto max-w-7xl px-6 py-12">
    <div className="grid gap-10 md:grid-cols-3">

      {/* Brand */}
      <div>
        <h2 className="text-2xl font-bold tracking-wider text-white">
          SCF <span className="text-[#D4AF37]">MEDIA</span>
        </h2>

        <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
          Capturing moments. Preserving memories. Discover and keep the
          moments you were part of.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
          Quick Links
        </h3>

        <div className="flex flex-col gap-3 text-sm text-gray-400">
          <a href="#how-it-works" className="hover:text-[#D4AF37]">
            How It Works
          </a>

          <a href="#privacy" className="hover:text-[#D4AF37]">
            Privacy
          </a>

          <a href="/login" className="hover:text-[#D4AF37]">
            Login
          </a>

          <a href="/register" className="hover:text-[#D4AF37]">
            Create Account
          </a>
        </div>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
          Follow SCF MEDIA
        </h3>

        <p className="mb-5 text-sm leading-6 text-gray-400">
          Follow us on social media and stay connected with our latest
          moments, events and updates.
        </p>

        <div className="flex items-center gap-3">

          {/* Instagram */}
         <a
  href="https://www.instagram.com/sviet_christian_fellowship?utm_source=qr
Instagram"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="SCF MEDIA Instagram"
  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
>
  <FaInstagram size={20} />
</a>

          {/* Facebook */}
 <a
  href="https://www.facebook.com/share/1D8JVQ56gK/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="SCF MEDIA Facebook"
  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
>
  <FaFacebookF size={18} />
</a>

          {/* YouTube */}
          <a
  href="https://youtube.com/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="SCF MEDIA YouTube"
  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
>
  <FaYoutube size={20} />
</a>

          {/* WhatsApp */}
        <a
  href="https://whatsapp.com/channel/0029VbAhHcw47XeD0ZYrqo1g"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="SCF MEDIA WhatsApp"
  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
>
  <FaWhatsapp size={20} />
</a>

          {/* Email */}
<a
  href="mailto:svietchristianfellowship@gmail.com"
  aria-label="SCF MEDIA Email"
  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
>
  <MdEmail size={21} />
</a>

        </div>
      </div>
    </div>

    {/* Bottom */}
    <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
      <p>
        © {new Date().getFullYear()} SCF MEDIA. All rights reserved.
      </p>

      <p className="text-gray-600">
        Capture • Remember • Preserve
      </p>
    </div>
  </div>
</footer>

    </main>
  );
};

export default Home;