import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#080a0d] px-6 text-white">
            <div className="mx-auto max-w-md text-center">
                <p className="text-8xl font-bold text-[#d4af37]">404</p>

                <h1 className="mt-6 text-2xl font-bold sm:text-3xl">
                    Page not found
                </h1>

                <p className="mt-3 text-gray-400">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Link
                        to="/"
                        className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-black transition hover:bg-[#e4c45c]"
                    >
                        <Home size={18} />
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-semibold text-gray-300 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;