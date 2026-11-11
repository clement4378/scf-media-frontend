import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    CheckCircle,
} from "lucide-react";
import { apiRequest } from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");   // clear any previous error on typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Client-side validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        // Build the payload — backend expects fullName, email, phone, password
        const fullName = `${formData.firstName} ${formData.lastName}`.trim();
        const payload = {
            fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
        };

        setLoading(true);

        try {
            await apiRequest("/auth/register", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            // Success — show confirmation
            setSuccess(true);

            // Redirect to login after 2 seconds
            setTimeout(() => navigate("/login"), 2000);

        } catch (err) {
            console.error("Registration failed:", err);
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // -------- SUCCESS SCREEN --------
    if (success) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080a0d] px-6 text-white">
                <div className="w-full max-w-md rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle className="text-green-400" size={32} />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold">
                        Account created!
                    </h2>

                    <p className="mt-3 text-gray-400">
                        Your account is pending admin approval. You'll be
                        able to sign in once an administrator reviews it.
                    </p>

                    <p className="mt-6 text-sm text-gray-500">
                        Redirecting to login...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080a0d] text-white">
            <div className="grid min-h-screen lg:grid-cols-2">
                {/* LEFT SIDE */}
                <div className="relative hidden min-h-screen overflow-hidden lg:block">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/hero-photo.jpg')",
                        }}
                    />

                    <div className="absolute inset-0 bg-black/70" />

                    <div className="relative z-10 flex min-h-screen flex-col justify-between p-14">
                        <div>
                            <h1 className="text-4xl font-bold tracking-wide">
                                <span className="text-white">SCF</span>{" "}
                                <span className="text-[#d4af37]">MEDIA</span>
                            </h1>

                            <p className="mt-2 text-sm tracking-[0.25em] text-gray-400">
                                CAPTURE • REMEMBER • PRESERVE
                            </p>
                        </div>

                        <div className="max-w-xl">
                            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
                                JOIN SCF MEDIA
                            </p>

                            <h2 className="text-5xl font-bold leading-tight text-white">
                                Your memories deserve a place of their own.
                            </h2>

                            <p className="mt-6 text-lg leading-relaxed text-gray-300">
                                Create your private SCF MEDIA account and
                                discover the moments you were part of.
                                Once your account is approved, our system
                                can help identify photos where you appear.
                            </p>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#d4af37]" />
                                    <span className="text-gray-300">
                                        Private personal photo gallery
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#d4af37]" />
                                    <span className="text-gray-300">
                                        AI-powered photo matching
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#d4af37]" />
                                    <span className="text-gray-300">
                                        Download your memories anytime
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500">
                            Capturing Moments. Preserving Memories.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex min-h-screen items-center justify-center bg-[#080a0d] px-6 py-10 sm:px-10 lg:px-16">
                    <div className="w-full max-w-xl">
                        <Link
                            to="/"
                            className="mb-10 inline-flex items-center gap-2 text-gray-400 transition hover:text-white"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Back to home
                        </Link>

                        <div className="mb-8">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                                CREATE ACCOUNT
                            </p>

                            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                Join SCF MEDIA
                            </h2>

                            <p className="mt-4 leading-relaxed text-gray-400">
                                Create your account to access your private
                                photo gallery. Your account will be
                                reviewed by an administrator before you can
                                sign in.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* First & Last Name */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="mb-2 block text-sm font-medium text-gray-200"
                                    >
                                        First name
                                    </label>

                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Perry"
                                            required
                                            className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="mb-2 block text-sm font-medium text-gray-200"
                                    >
                                        Last name
                                    </label>

                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Sakwe"
                                            required
                                            className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-200"
                                >
                                    Email address
                                </label>

                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-2 block text-sm font-medium text-gray-200"
                                >
                                    Phone number
                                </label>

                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+237 6XX XXX XXX"
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                                    />
                                </div>
                            </div>

                            {/* Passwords */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-medium text-gray-200"
                                    >
                                        Password
                                    </label>

                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Create a password"
                                            required
                                            minLength={8}
                                            className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-12 text-white outline-none transition placeholder:text-gray-600 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-2 block text-sm font-medium text-gray-200"
                                    >
                                        Confirm password
                                    </label>

                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm password"
                                            required
                                            minLength={8}
                                            className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-12 text-white outline-none transition placeholder:text-gray-600 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Privacy Notice */}
                            <div className="rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-4">
                                <p className="text-sm leading-relaxed text-gray-400">
                                    By creating an account, you agree that
                                    SCF MEDIA may use your submitted
                                    information and approved face profile
                                    to help identify photos in which you
                                    appear. Your account must be approved
                                    by an administrator before you can
                                    access the gallery.
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                                    <p className="text-sm text-red-400">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-[#d4af37] px-6 py-4 text-base font-semibold text-black transition hover:bg-[#e3bd45] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating account..." : "Create Account"}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-[#d4af37] transition hover:text-[#e3bd45]"
                            >
                                Sign in
                            </Link>
                        </p>

                        <p className="mt-6 text-center text-xs leading-relaxed text-gray-600">
                            Your account information is kept private and is
                            only accessible according to SCF MEDIA's access
                            policies.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;