import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    CalendarDays,
    ScanFace,
    Images,
    LogOut,
    Menu,
    X,
    User as UserIcon,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function UserNavbar() {
    const { user, logout, isAdmin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/events", label: "Events", icon: CalendarDays },
        { to: "/find-my-photos", label: "Find My Photos", icon: ScanFace },
        { to: "/my-photos", label: "My Photos", icon: Images },
        { to: "/profile", label: "Profile", icon: UserIcon },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080a0d]/95 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                {/* Logo */}
                <Link to="/dashboard" className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10">
                        <span className="text-xs font-bold text-[#d4af37]">
                            SCF
                        </span>
                    </div>
                    <span className="text-base font-bold tracking-wider text-white">
                        SCF MEDIA
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-1 md:flex">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.to);
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
                                    active
                                        ? "bg-[#d4af37]/10 text-[#D4AF37]"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <Icon size={16} />
                                {link.label}
                            </Link>
                        );
                    })}

                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 rounded-lg border border-[#d4af37]/30 px-4 py-2 text-sm text-[#D4AF37] transition hover:bg-[#d4af37]/10"
                        >
                            Admin
                        </Link>
                    )}
                </div>

                {/* Right side — user + logout */}
                <div className="hidden items-center gap-3 md:flex">
                    <span className="text-sm text-gray-400">
                        {user?.fullName}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-red-500/50 hover:text-red-400"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white md:hidden"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile menu */}
            {isOpen && (
                <div className="border-t border-white/10 bg-[#080a0d] px-6 py-4 md:hidden">
                    <div className="flex flex-col gap-2">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.to);
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                                        active
                                            ? "bg-[#d4af37]/10 text-[#D4AF37]"
                                            : "text-gray-300 hover:bg-white/5"
                                    }`}
                                >
                                    <Icon size={18} />
                                    {link.label}
                                </Link>
                            );
                        })}

                        {isAdmin && (
                            <Link
                                to="/admin"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 rounded-lg border border-[#d4af37]/30 px-4 py-3 text-sm text-[#D4AF37]"
                            >
                                Admin Dashboard
                            </Link>
                        )}

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-300"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default UserNavbar;