import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Shield,
    User as UserIcon,
    UserCheck,
    ShieldCheck,
    ShieldOff,
} from "lucide-react";
import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";
import UserNavbar from "../components/UserNavbar";

function AdminUsers() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pendingAction, setPendingAction] = useState(null);
    const [filter, setFilter] = useState("all"); // all | admin | user | pending

    const loadUsers = async () => {
        try {
            const data = await apiRequest("/admin/users");
            setUsers(data || []);
        } catch (err) {
            console.error("Failed to load users:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handlePromote = async (userId) => {
        if (!window.confirm("Promote this user to admin?")) return;
        setPendingAction(userId);
        setError("");
        setSuccess("");

        try {
            await apiRequest(`/admin/users/${userId}/promote`, {
                method: "PUT",
            });
            setSuccess("User promoted to admin.");
            await loadUsers();
        } catch (err) {
            setError(err.message);
        } finally {
            setPendingAction(null);
        }
    };

    const handleDemote = async (userId) => {
        if (!window.confirm("Demote this admin to regular user?")) return;
        setPendingAction(userId);
        setError("");
        setSuccess("");

        try {
            await apiRequest(`/admin/users/${userId}/demote`, {
                method: "PUT",
            });
            setSuccess("User demoted to regular user.");
            await loadUsers();
        } catch (err) {
            setError(err.message);
        } finally {
            setPendingAction(null);
        }
    };

    const handleApprove = async (userId) => {
        setPendingAction(userId);
        setError("");
        setSuccess("");

        try {
            await apiRequest(`/admin/users/${userId}/approve`, {
                method: "PUT",
            });
            setSuccess("User approved.");
            await loadUsers();
        } catch (err) {
            setError(err.message);
        } finally {
            setPendingAction(null);
        }
    };

    const filteredUsers = users.filter((u) => {
        if (filter === "admin") return u.role === "ADMIN";
        if (filter === "user") return u.role === "USER";
        if (filter === "pending") return !u.approved;
        return true;
    });

    return (
        <>
            <UserNavbar />

            <div className="min-h-screen bg-[#080a0d] px-6 py-10 text-white">
                <div className="mx-auto max-w-5xl">
                    <Link
                        to="/admin"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D4AF37]"
                    >
                        <ArrowLeft size={18} />
                        Back to Admin Dashboard
                    </Link>

                    <div className="mt-8 mb-10">
                        <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                            SCF MEDIA ADMIN
                        </p>
                        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                            User Management
                        </h1>
                        <p className="mt-3 text-gray-400">
                            Approve, promote, or manage user accounts.
                        </p>
                    </div>

                    {/* Messages */}
                    {success && (
                        <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Filters */}
                    <div className="mb-6 flex flex-wrap gap-2">
                        {[
                            { key: "all", label: "All", count: users.length },
                            { key: "admin", label: "Admins", count: users.filter((u) => u.role === "ADMIN").length },
                            { key: "user", label: "Users", count: users.filter((u) => u.role === "USER").length },
                            { key: "pending", label: "Pending", count: users.filter((u) => !u.approved).length },
                        ].map((f) => (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                className={`rounded-lg border px-4 py-2 text-sm transition ${
                                    filter === f.key
                                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                                        : "border-white/10 text-gray-400 hover:border-[#D4AF37]/50 hover:text-white"
                                }`}
                            >
                                {f.label}{" "}
                                <span className="ml-1 text-xs opacity-70">
                                    ({f.count})
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="flex justify-center py-16">
                            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && filteredUsers.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-12 text-center">
                            <UserIcon size={32} className="mx-auto text-gray-600" />
                            <p className="mt-3 text-sm text-gray-400">
                                No users match this filter.
                            </p>
                        </div>
                    )}

                    {/* User list */}
                    {!loading && filteredUsers.length > 0 && (
                        <div className="space-y-3">
                            {filteredUsers.map((u) => {
                                const isSelf = u.email === currentUser?.email;
                                const isBusy = pendingAction === u.id;

                                return (
                                    <div
                                        key={u.id}
                                        className="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
                                                    u.role === "ADMIN"
                                                        ? "bg-[#d4af37]/20"
                                                        : "bg-white/5"
                                                }`}
                                            >
                                                {u.role === "ADMIN" ? (
                                                    <Shield
                                                        className="text-[#d4af37]"
                                                        size={20}
                                                    />
                                                ) : (
                                                    <UserIcon
                                                        className="text-gray-400"
                                                        size={20}
                                                    />
                                                )}
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="font-semibold">
                                                        {u.fullName}
                                                    </p>

                                                    {u.role === "ADMIN" && (
                                                        <span className="rounded-full bg-[#d4af37]/10 px-2 py-0.5 text-xs text-[#d4af37]">
                                                            ADMIN
                                                        </span>
                                                    )}

                                                    {!u.approved && (
                                                        <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-xs text-orange-400">
                                                            PENDING
                                                        </span>
                                                    )}

                                                    {isSelf && (
                                                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-gray-400">
                                                            YOU
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="mt-1 text-sm text-gray-400">
                                                    {u.email}
                                                </p>

                                                {u.phone && (
                                                    <p className="text-sm text-gray-500">
                                                        {u.phone}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-2">
                                            {!u.approved && (
                                                <button
                                                    onClick={() => handleApprove(u.id)}
                                                    disabled={isBusy}
                                                    className="flex items-center gap-1.5 rounded-lg bg-[#D4AF37] px-3.5 py-2 text-sm font-semibold text-black transition hover:bg-[#e4c45c] disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <UserCheck size={14} />
                                                    {isBusy ? "..." : "Approve"}
                                                </button>
                                            )}

                                            {u.role === "USER" && (
                                                <button
                                                    onClick={() => handlePromote(u.id)}
                                                    disabled={isBusy || isSelf}
                                                    className="flex items-center gap-1.5 rounded-lg border border-[#D4AF37]/30 px-3.5 py-2 text-sm text-[#D4AF37] transition hover:bg-[#D4AF37]/10 disabled:cursor-not-allowed disabled:opacity-30"
                                                    title={isSelf ? "You cannot change your own role" : ""}
                                                >
                                                    <ShieldCheck size={14} />
                                                    {isBusy ? "..." : "Make Admin"}
                                                </button>
                                            )}

                                            {u.role === "ADMIN" && (
                                                <button
                                                    onClick={() => handleDemote(u.id)}
                                                    disabled={isBusy || isSelf}
                                                    className="flex items-center gap-1.5 rounded-lg border border-orange-500/30 px-3.5 py-2 text-sm text-orange-400 transition hover:bg-orange-500/10 disabled:cursor-not-allowed disabled:opacity-30"
                                                    title={isSelf ? "You cannot change your own role" : ""}
                                                >
                                                    <ShieldOff size={14} />
                                                    {isBusy ? "..." : "Demote"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminUsers;