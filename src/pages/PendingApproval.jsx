import { Link, useNavigate } from "react-router-dom";
import {
    Clock,
    Mail,
    Phone,
    LogOut,
    ShieldCheck,
    CheckCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function PendingApproval() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#080a0d] text-white">
            {/* Top bar */}
            <div className="border-b border-white/10 px-6 py-5">
                <div className="mx-auto flex max-w-4xl items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10">
                            <span className="text-xs font-bold text-[#d4af37]">
                                SCF
                            </span>
                        </div>
                        <span className="text-base font-bold tracking-wider">
                            SCF MEDIA
                        </span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-red-500/50 hover:text-red-400"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-6 py-16">
                {/* Pending icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#d4af37]/10">
                            <Clock className="text-[#d4af37]" size={40} />
                        </div>
                        <div className="absolute inset-0 animate-ping rounded-full bg-[#d4af37]/10" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="mt-8 text-center text-3xl font-bold sm:text-4xl">
                    Account Pending Approval
                </h1>

                <p className="mx-auto mt-4 max-w-lg text-center leading-7 text-gray-400">
                    Thank you for registering with SCF MEDIA. Your account
                    is currently under review by an administrator.
                </p>

                {/* User info */}
                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                        Your registration details
                    </p>

                    <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 text-gray-300">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                                <ShieldCheck size={16} className="text-[#d4af37]" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Name</p>
                                <p className="text-sm">{user?.fullName}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-300">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                                <Mail size={16} className="text-[#d4af37]" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="text-sm">{user?.email}</p>
                            </div>
                        </div>

                        {user?.phone && (
                            <div className="flex items-center gap-3 text-gray-300">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                                    <Phone size={16} className="text-[#d4af37]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Phone</p>
                                    <p className="text-sm">{user.phone}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* What happens next */}
                <div className="mt-6 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-6">
                    <div className="flex items-start gap-3">
                        <CheckCircle
                            className="mt-0.5 flex-shrink-0 text-[#d4af37]"
                            size={20}
                        />
                        <div>
                            <p className="font-semibold">What happens next?</p>
                            <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-400">
                                <li>• An administrator will review your registration</li>
                                <li>
                                    • Once approved, you'll receive a WhatsApp
                                    notification on{" "}
                                    <span className="text-white">{user?.phone}</span>
                                </li>
                                <li>
                                    • Then you can log back in and start finding
                                    your photos
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Need help? Contact us on{" "}
                    <a
                        href="https://whatsapp.com/channel/0029VbAhHcw47XeD0ZYrqo1g"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d4af37] hover:underline"
                    >
                        WhatsApp
                    </a>{" "}
                    or{" "}
                    <a
                        href="mailto:svietchristianfellowship@gmail.com"
                        className="text-[#d4af37] hover:underline"
                    >
                        email us
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}

export default PendingApproval;