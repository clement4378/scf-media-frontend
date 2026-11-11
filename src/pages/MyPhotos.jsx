import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Image as ImageIcon,
    Download,
    CalendarDays,
} from "lucide-react";
import { apiRequest, downloadFile } from "../services/api";
import PhotoCard from "../components/PhotoCard";
import PhotoLightbox from "../components/PhotoLightbox";

function MyPhotos() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [downloadingEvent, setDownloadingEvent] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await apiRequest("/me/photos");
                setPhotos(data || []);
            } catch (err) {
                console.error("Failed to load photos:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // Group photos by event
    const grouped = photos.reduce((acc, photo) => {
        const key = photo.eventId;
        if (!acc[key]) acc[key] = [];
        acc[key].push(photo);
        return acc;
    }, {});

    const handleDownloadEvent = async (eventId) => {
        setDownloadingEvent(eventId);
        try {
            await downloadFile(
                `/events/${eventId}/download-all`,
                `event-${eventId}-my-photos.zip`
            );
        } catch (err) {
            alert("Download failed: " + err.message);
        } finally {
            setDownloadingEvent(null);
        }
    };

    // For lightbox navigation we pass a flat array
    const flatPhotos = photos;

    return (
        <div className="min-h-screen bg-[#080a0d] px-6 py-10 text-white">
            <div className="mx-auto max-w-6xl">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D4AF37]"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </Link>

                <div className="mt-8 mb-10">
                    <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                        YOUR COLLECTION
                    </p>
                    <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                        My Photos
                    </h1>
                    <p className="mt-3 text-gray-400">
                        All photos you've matched with, organized by event.
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

                {!loading && !error && photos.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-16 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                            <ImageIcon size={30} className="text-gray-500" />
                        </div>
                        <h3 className="mt-5 text-lg font-semibold">
                            No photos yet
                        </h3>
                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                            Browse events and upload a selfie to find your photos.
                        </p>
                        <Link
                            to="/events"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3 font-semibold text-black transition hover:bg-[#e4c45c]"
                        >
                            Browse Events
                        </Link>
                    </div>
                )}

                {!loading && !error && photos.length > 0 && (
                    <div className="space-y-12">
                        {Object.entries(grouped).map(([eventId, eventPhotos]) => (
                            <div
                                key={eventId}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <CalendarDays
                                                size={16}
                                                className="text-[#D4AF37]"
                                            />
                                            <span>Event #{eventId}</span>
                                        </div>
                                        <h2 className="mt-2 text-2xl font-semibold">
                                            {eventPhotos.length} photo
                                            {eventPhotos.length !== 1 ? "s" : ""}
                                        </h2>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <Link
                                            to={`/events/${eventId}`}
                                            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                                        >
                                            View Event
                                        </Link>

                                        <button
                                            onClick={() => handleDownloadEvent(eventId)}
                                            disabled={downloadingEvent === Number(eventId)}
                                            className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#e4c45c] disabled:opacity-50"
                                        >
                                            <Download size={16} />
                                            {downloadingEvent === Number(eventId)
                                                ? "Preparing..."
                                                : "Download ZIP"}
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                    {eventPhotos.map((photo) => {
                                        const idx = flatPhotos.findIndex(
                                            (p) => p.id === photo.id
                                        );
                                        return (
                                            <PhotoCard
                                                key={photo.id}
                                                photo={photo}
                                                onClick={() => setLightboxIndex(idx)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {lightboxIndex !== null && flatPhotos[lightboxIndex] && (
                <PhotoLightbox
                    photos={flatPhotos}
                    startIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </div>
    );
}

export default MyPhotos;