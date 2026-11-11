import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, ScanFace, ChevronRight } from "lucide-react";
import { apiRequest } from "../services/api";

function FindMyPhotos() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const data = await apiRequest("/events");
                setEvents(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div className="min-h-screen bg-[#080a0d] px-6 py-10 text-white">
            <div className="mx-auto max-w-4xl">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D4AF37]"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </Link>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4af37]/10">
                            <ScanFace className="text-[#d4af37]" size={24} />
                        </div>
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                                FACE MATCHING
                            </p>
                            <h1 className="mt-1 text-2xl font-bold">
                                Find My Photos
                            </h1>
                        </div>
                    </div>

                    <p className="mt-6 text-gray-400">
                        Pick an event below, then upload a selfie on that page
                        to find photos of yourself.
                    </p>
                </div>

                <div className="mt-8">
                    <h2 className="mb-4 text-lg font-semibold">Choose an event</h2>

                    {loading && (
                        <div className="flex justify-center py-12">
                            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
                        </div>
                    )}

                    {error && (
                        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
                            <p className="text-red-400">{error}</p>
                        </div>
                    )}

                    {!loading && !error && events.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-12 text-center">
                            <p className="text-gray-400">No events available yet.</p>
                        </div>
                    )}

                    <div className="space-y-3">
                        {events.map((event) => (
                            <Link
                                key={event.id}
                                to={`/events/${event.id}`}
                                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#D4AF37]/50"
                            >
                                <div>
                                    <h3 className="font-semibold group-hover:text-[#D4AF37]">
                                        {event.name}
                                    </h3>

                                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                        <CalendarDays size={16} className="text-[#D4AF37]" />
                                        <span>{event.eventDate}</span>
                                    </div>
                                </div>

                                <ChevronRight
                                    size={20}
                                    className="text-gray-600 transition group-hover:translate-x-1 group-hover:text-[#D4AF37]"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindMyPhotos;