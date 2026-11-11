import { useEffect, useState } from "react";
import {
    User as UserIcon,
    Mail,
    Phone,
    Shield,
    Calendar,
    Save,
    Lock,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { apiRequest } from "../services/api";
import UserNavbar from "../components/UserNavbar";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Update form state
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [savingProfile, setSavingProfile] = useState(false);
    const [profileError, setProfileError] = useState("");
    const [profileSuccess, setProfileSuccess] = useState("");

    // Password form state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [savingPassword, setSavingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const data = await apiRequest("/user/profile");
                setProfile(data);
                setFullName(data.fullName || "");
                setPhone(data.phone || "");
            } catch (err) {
                console.error("Failed to load profile:", err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setProfileError("");
        setProfileSuccess("");
        setSavingProfile(true);

        try {
            const updated = await apiRequest("/user/profile", {
                method: "PUT",
                body: JSON.stringify({ fullName, phone }),
            });
            setProfile(updated);
            setProfileSuccess("Profile updated successfully.");
        } catch (err) {
            setProfileError(err.message);
        } finally {
            setSavingProfile(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess("");

        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError("New password must be at least 8 characters.");
            return;
        }

        setSavingPassword(true);

        try {
            await apiRequest("/user/password", {
                method: "PUT",
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            setPasswordSuccess("Password changed successfully.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setPasswordError(err.message);
        } finally {
            setSavingPassword(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        try {
            const d = new Date(dateStr);
            return d.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    if (loading) {
        return (
            <>
                <UserNavbar />
                <div className="flex min-h-screen items-center justify-center bg-[#080a0d]">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
                </div>
            </>
        );
    }

    if (!profile) {
        return (
            <>
                <UserNavbar />
                <div className="flex min-h-screen items-center justify-center bg-[#080a0d] text-white">
                    <p className="text-gray-400">Could not load profile.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <UserNavbar />

            <div className="min-h-screen bg-[#080a0d] px-6 py-10 text-white">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-10">
                        <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                            SCF MEDIA
                        </p>
                        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                            My Profile
                        </h1>
                        <p className="mt-3 text-gray-400">
                            Manage your account information and security.
                        </p>
                    </div>

                    {/* Profile Header Card */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10">
                                {profile.role === "ADMIN" ? (
                                    <Shield className="text-[#d4af37]" size={32} />
                                ) : (
                                    <UserIcon className="text-[#d4af37]" size={32} />
                                )}
                            </div>

                            <div className="flex-1">
                                <h2 className="text-2xl font-bold">
                                    {profile.fullName}
                                </h2>
                                <p className="mt-1 flex items-center gap-2 text-gray-400">
                                    <Mail size={14} />
                                    {profile.email}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-[#d4af37]/10 px-3 py-1 text-xs text-[#d4af37]">
                                        {profile.role}
                                    </span>
                                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                                        {profile.approved ? "Approved" : "Pending"}
                                    </span>
                                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                                        <Calendar size={12} className="mr-1 inline" />
                                        Member since {formatDate(profile.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Update Info Card */}
                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <h3 className="text-lg font-semibold">Update Information</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Email cannot be changed. Contact support if needed.
                        </p>

                        <form onSubmit={handleSaveProfile} className="mt-6 space-y-5">
                            {/* Full Name */}
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Full Name
                                </label>
                                <div className="relative">
                                    <UserIcon
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        size={16}
                                    />
                                    <input
                                        id="fullName"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none transition focus:border-[#D4AF37]"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        size={16}
                                    />
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none transition focus:border-[#D4AF37]"
                                    />
                                </div>
                            </div>

                            {/* Email (read-only) */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Email (read-only)
                                </label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        size={16}
                                    />
                                    <input
                                        id="email"
                                        type="email"
                                        value={profile.email}
                                        disabled
                                        className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.02] py-3 pl-12 pr-4 text-gray-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Messages */}
                            {profileError && (
                                <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                    {profileError}
                                </div>
                            )}
                            {profileSuccess && (
                                <div className="flex items-start gap-2 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
                                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                                    {profileSuccess}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={savingProfile}
                                className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 font-semibold text-black transition hover:bg-[#e4c45c] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Save size={16} />
                                {savingProfile ? "Saving..." : "Save Changes"}
                            </button>
                        </form>
                    </div>

                    {/* Change Password Card */}
                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <h3 className="text-lg font-semibold">Change Password</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Use a strong password with at least 8 characters.
                        </p>

                        <form onSubmit={handleChangePassword} className="mt-6 space-y-5">
                            <div>
                                <label
                                    htmlFor="currentPassword"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Current Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        size={16}
                                    />
                                    <input
                                        id="currentPassword"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none transition focus:border-[#D4AF37]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="newPassword"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    New Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        size={16}
                                    />
                                    <input
                                        id="newPassword"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        minLength={8}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none transition focus:border-[#D4AF37]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        size={16}
                                    />
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        minLength={8}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none transition focus:border-[#D4AF37]"
                                    />
                                </div>
                            </div>

                            {passwordError && (
                                <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                    {passwordError}
                                </div>
                            )}
                            {passwordSuccess && (
                                <div className="flex items-start gap-2 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
                                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                                    {passwordSuccess}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={savingPassword}
                                className="flex items-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-5 py-3 font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37]/10 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Lock size={16} />
                                {savingPassword ? "Changing..." : "Change Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;