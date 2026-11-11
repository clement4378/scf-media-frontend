import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ScanFace, Images, CalendarDays } from "lucide-react";

function Dashboard() {
    const { user, logout, isAdmin } = useAuth();

    return (
        <div className="min-h-screen bg-[#080a0d] px-6 py-10 text-white">
            <div className="mx-auto max-w-5xl">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                            SCF MEDIA
                        </p>
                        <h1 className="mt-2 text-3xl font-bold">
                            Welcome, {user?.fullName}
                        </h1>
                    </div>

                    <button
                        onClick={logout}
                        className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-gray-300 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    >
                        Logout
                    </button>
                </div>

                {/* Quick Actions */}
                <div className="mb-10 grid gap-4 sm:grid-cols-3">
                    <Link
                        to="/events"
                        className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#D4AF37]/50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4af37]/10">
                            <CalendarDays className="text-[#d4af37]" size={22} />
                        </div>
                        <h3 className="mt-4 font-semibold group-hover:text-[#D4AF37]">
                            Browse Events
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            See all events and find photos of yourself.
                        </p>
                    </Link>

                    <Link
                        to="/my-photos"
                        className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#D4AF37]/50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4af37]/10">
                            <Images className="text-[#d4af37]" size={22} />
                        </div>
                        <h3 className="mt-4 font-semibold group-hover:text-[#D4AF37]">
                            My Photos
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            All photos you've matched with, by event.
                        </p>
                    </Link>

                    <Link
                        to="/find-my-photos"
                        className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#D4AF37]/50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4af37]/10">
                            <ScanFace className="text-[#d4af37]" size={22} />
                        </div>
                        <h3 className="mt-4 font-semibold group-hover:text-[#D4AF37]">
                            Find My Photos
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Upload a selfie to match photos across events.
                        </p>
                    </Link>
                </div>

                {isAdmin && (
                    <div className="mb-10 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-6">
                        <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                            Admin Access
                        </p>
                        <h3 className="mt-2 text-lg font-semibold">
                            You have admin privileges
                        </h3>
                        <p className="mt-2 text-sm text-gray-400">
                            Manage events, users, and photos from the admin dashboard.
                        </p>
                        <Link
                            to="/admin"
                            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#e4c45c]"
                        >
                            Go to Admin Dashboard
                        </Link>
                    </div>
                )}

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-xl font-semibold">Your Profile</h2>

                    <div className="mt-6 space-y-4 text-gray-300">
                        <p>
                            <span className="text-gray-500">Name:</span>{" "}
                            {user?.fullName}
                        </p>
                        <p>
                            <span className="text-gray-500">Email:</span>{" "}
                            {user?.email}
                        </p>
                        <p>
                            <span className="text-gray-500">Role:</span>{" "}
                            {user?.role}
                        </p>
                        <p>
                            <span className="text-gray-500">Account:</span>{" "}
                            {user?.approved ? "Approved" : "Pending"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;