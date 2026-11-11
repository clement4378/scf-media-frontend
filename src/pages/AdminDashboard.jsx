import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../services/api";
import UserNavbar from "../components/UserNavbar";
import StatsCard from "../components/StatsCard";
import {
    Users,
    UserCog,
    CheckCircle,
    CalendarDays,
    Plus,
    Trash2,
    Eye,
} from "lucide-react";

function AdminDashboard() {
    const { user, logout } = useAuth();

    const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    const [pendingUsers, setPendingUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [approvingUserId, setApprovingUserId] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [creating, setCreating] = useState(false);
    const [deletingEventId, setDeletingEventId] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ---------- LOAD EVENTS ----------
    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await apiRequest("/events");
                setEvents(data);
            } catch (error) {
                console.error("Failed to load events:", error);
                setError(error.message);
            } finally {
                setLoadingEvents(false);
            }
        };
        loadEvents();
    }, []);

    // ---------- LOAD PENDING USERS ----------
    useEffect(() => {
        const loadPendingUsers = async () => {
            try {
                const data = await apiRequest("/admin/users/pending");
                setPendingUsers(data || []);
            } catch (error) {
                console.error("Failed to load pending users:", error);
            } finally {
                setLoadingUsers(false);
            }
        };
        loadPendingUsers();
    }, []);

    // ---------- APPROVE USER ----------
    const handleApprove = async (userId) => {
        setApprovingUserId(userId);
        setError("");
        setSuccess("");

        try {
            await apiRequest(`/admin/users/${userId}/approve`, {
                method: "PUT",
            });
            setPendingUsers((prev) => prev.filter((u) => u.id !== userId));
            setSuccess("User approved successfully.");
        } catch (error) {
            console.error("Failed to approve user:", error);
            setError(error.message);
        } finally {
            setApprovingUserId(null);
        }
    };

    // ---------- CREATE EVENT ----------
    const handleCreateEvent = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setCreating(true);

        try {
            const newEvent = await apiRequest("/events", {
                method: "POST",
                body: JSON.stringify({ name, description, eventDate }),
            });
            setEvents((current) => [...current, newEvent]);
            setName("");
            setDescription("");
            setEventDate("");
            setShowForm(false);
            setSuccess("Event created successfully.");
        } catch (error) {
            console.error("Failed to create event:", error);
            setError(error.message);
        } finally {
            setCreating(false);
        }
    };

    // ---------- DELETE EVENT ----------
    const handleDeleteEvent = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );
        if (!confirmed) return;

        setError("");
        setSuccess("");
        setDeletingEventId(id);

        try {
            await apiRequest(`/events/${id}`, { method: "DELETE" });
            setEvents((current) => current.filter((e) => e.id !== id));
            setSuccess("Event deleted successfully.");
        } catch (error) {
            console.error("Failed to delete event:", error);
            setError(error.message);
        } finally {
            setDeletingEventId(null);
        }
    };

    return (
        <>
            <UserNavbar />

            <div className="min-h-screen bg-[#080a0d] px-6 py-10 text-white">
                <div className="mx-auto max-w-5xl">
                    {/* Header */}
                    <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                                SCF MEDIA ADMIN
                            </p>
                            <h1 className="mt-2 text-3xl font-bold">
                                Welcome, {user?.fullName}
                            </h1>
                        </div>

                        <Link
                            to="/admin/users"
                            className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 font-semibold text-black transition hover:bg-[#e4c45c]"
                        >
                            <UserCog size={18} />
                            Manage Users
                        </Link>
                    </div>

                    {/* Success / Error messages */}
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

                    {/* ---------- STATS OVERVIEW ---------- */}
                    <StatsCard />

                    {/* ---------- PENDING USERS SECTION ---------- */}
                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37]/10">
                                <Users className="text-[#d4af37]" size={20} />
                            </div>
                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                                    User Approvals
                                </p>
                                <h2 className="mt-1 text-xl font-semibold">
                                    Pending Registrations
                                </h2>
                            </div>
                            <div className="ml-auto flex items-center gap-4">
                                <span className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-sm text-[#d4af37]">
                                    {pendingUsers.length} pending
                                </span>
                                <Link
                                    to="/admin/users"
                                    className="text-sm text-[#D4AF37] hover:underline"
                                >
                                    View all users →
                                </Link>
                            </div>
                        </div>

                        {loadingUsers && (
                            <div className="mt-6 flex justify-center py-6">
                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
                            </div>
                        )}

                        {!loadingUsers && pendingUsers.length === 0 && (
                            <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-black/20 px-6 py-8 text-center">
                                <CheckCircle
                                    size={28}
                                    className="mx-auto text-gray-600"
                                />
                                <p className="mt-3 text-sm text-gray-400">
                                    No pending users. Everyone is approved.
                                </p>
                            </div>
                        )}

                        {!loadingUsers && pendingUsers.length > 0 && (
                            <div className="mt-6 space-y-3">
                                {pendingUsers.map((pendingUser) => (
                                    <div
                                        key={pendingUser.id}
                                        className="flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center"
                                    >
                                        <div>
                                            <p className="font-semibold">
                                                {pendingUser.fullName}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-400">
                                                {pendingUser.email}
                                            </p>
                                            {pendingUser.phone && (
                                                <p className="text-sm text-gray-500">
                                                    {pendingUser.phone}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleApprove(pendingUser.id)}
                                            disabled={approvingUserId === pendingUser.id}
                                            className="flex items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#e4c45c] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {approvingUserId === pendingUser.id ? (
                                                <>
                                                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                                                    Approving...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle size={16} />
                                                    Approve
                                                </>
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ---------- EVENTS SECTION ---------- */}
                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                                    Events
                                </p>
                                <h2 className="mt-2 text-xl font-semibold">
                                    SCF MEDIA Events
                                </h2>
                            </div>

                            <button
                                onClick={() => {
                                    setShowForm(!showForm);
                                    setError("");
                                    setSuccess("");
                                }}
                                className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-2.5 font-semibold text-black transition hover:bg-[#e5c04a]"
                            >
                                <Plus size={18} />
                                {showForm ? "Close Form" : "Create Event"}
                            </button>
                        </div>

                        {showForm && (
                            <form
                                onSubmit={handleCreateEvent}
                                className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-6"
                            >
                                <h3 className="text-lg font-semibold">
                                    Create New Event
                                </h3>

                                <div className="mt-6 space-y-5">
                                    <div>
                                        <label
                                            htmlFor="eventName"
                                            className="mb-2 block text-sm font-medium text-gray-300"
                                        >
                                            Event Name
                                        </label>
                                        <input
                                            id="eventName"
                                            type="text"
                                            placeholder="e.g. Sunday Worship Service"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-600 transition focus:border-[#D4AF37]"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="eventDescription"
                                            className="mb-2 block text-sm font-medium text-gray-300"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="eventDescription"
                                            placeholder="Describe this event..."
                                            rows="4"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-600 transition focus:border-[#D4AF37]"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="eventDate"
                                            className="mb-2 block text-sm font-medium text-gray-300"
                                        >
                                            Event Date
                                        </label>
                                        <input
                                            id="eventDate"
                                            type="date"
                                            required
                                            value={eventDate}
                                            onChange={(e) => setEventDate(e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={creating}
                                        className="w-full rounded-xl bg-[#D4AF37] py-3.5 font-semibold text-black transition hover:bg-[#e5c04a] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {creating ? "Creating Event..." : "Create Event"}
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="mt-6">
                            <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-gray-400">
                                {events.length} event{events.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        {loadingEvents && (
                            <p className="mt-6 text-gray-400">Loading events...</p>
                        )}

                        {!loadingEvents && events.length === 0 && (
                            <p className="mt-6 text-gray-400">
                                No events have been created yet.
                            </p>
                        )}

                        {!loadingEvents && events.length > 0 && (
                            <div className="mt-6 space-y-4">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="rounded-xl border border-white/10 bg-black/20 p-5"
                                    >
                                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {event.name}
                                                </h3>
                                                {event.description && (
                                                    <p className="mt-2 text-sm text-gray-400">
                                                        {event.description}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <CalendarDays size={14} />
                                                    {event.eventDate}
                                                </div>

                                                <Link
                                                    to={`/admin/events/${event.id}`}
                                                    className="flex items-center gap-1 rounded-lg border border-[#D4AF37]/30 px-3 py-2 text-sm text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
                                                >
                                                    <Eye size={14} />
                                                    View
                                                </Link>

                                                <button
                                                    onClick={() => handleDeleteEvent(event.id)}
                                                    disabled={deletingEventId === event.id}
                                                    className="flex items-center gap-1 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <Trash2 size={14} />
                                                    {deletingEventId === event.id
                                                        ? "Deleting..."
                                                        : "Delete"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;