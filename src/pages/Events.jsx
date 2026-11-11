import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Image as ImageIcon, ArrowRight } from "lucide-react";
import { apiRequest } from "../services/api";
import UserNavbar from "../components/UserNavbar";

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const data = await apiRequest("/events");
                setEvents(data || []);
            } catch (err) {
                console.error("Failed to load events:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <>
            <UserNavbar />
            <div className="min-h-screen bg-[#080a0d] px-6 py-10 text-white">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-10">
                        <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                            SCF MEDIA
                        </p>
                        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                            Events
                        </h1>
                        <p className="mt-3 text-gray-400">
                            Browse events and find photos of yourself.
                        </p>
                    </div>

                    {loading && (
                        <div className="flex justify-center py-16">
                            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
                        </div>
                    )}

                    {error && (
                        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
                            <p className="text-red-400">{error}</p>
                        </div>
                    )}

                    {!loading && !error && events.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-16 text-center">
                            <ImageIcon size={40} className="mx-auto text-gray-600" />
                            <p className="mt-4 text-gray-400">
                                No events yet. Check back soon.
                            </p>
                        </div>
                    )}

                    {!loading && events.length > 0 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {events.map((event) => (
                                <Link
                                    key={event.id}
                                    to={`/events/${event.id}`}
                                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#D4AF37]/50 hover:bg-white/[0.06]"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white group-hover:text-[#D4AF37]">
                                                {event.name}
                                            </h3>

                                            <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                                                <CalendarDays size={16} className="text-[#D4AF37]" />
                                                <span>{event.eventDate}</span>
                                            </div>

                                            {event.description && (
                                                <p className="mt-3 line-clamp-2 text-sm text-gray-500">
                                                    {event.description}
                                                </p>
                                            )}
                                        </div>

                                        <ArrowRight
                                            size={20}
                                            className="text-gray-600 transition group-hover:translate-x-1 group-hover:text-[#D4AF37]"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Events;