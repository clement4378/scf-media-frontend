import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    Image as ImageIcon,
    Upload,
    Download,
    X,
    ScanFace,
} from "lucide-react";
import { apiRequest, downloadFile } from "../services/api";
import { useAuth } from "../context/AuthContext";
import PhotoCard from "../components/PhotoCard";
import PhotoLightbox from "../components/PhotoLightbox";
import PhotoUpload from "../components/PhotoUpload";
import SelfieUpload from "../components/SelfieUpload";

function EventDetails() {
    const { id } = useParams();
    const { isAdmin } = useAuth();

    const [event, setEvent] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [photosLoading, setPhotosLoading] = useState(true);
    const [error, setError] = useState("");
    const [showUpload, setShowUpload] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const [justMatched, setJustMatched] = useState(false);

    const loadEvent = useCallback(async () => {
        try {
            const data = await apiRequest(`/events/${id}`);
            setEvent(data);
        } catch (err) {
            console.error("Failed to load event:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    const loadPhotos = useCallback(async () => {
        setPhotosLoading(true);
        try {
            const data = await apiRequest(`/events/${id}/photos`);
            setPhotos(data || []);
        } catch (err) {
            console.error("Failed to load photos:", err);
            setPhotos([]);
        } finally {
            setPhotosLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadEvent();
        loadPhotos();
    }, [loadEvent, loadPhotos]);

    const handleDownloadAll = async () => {
        setDownloading(true);
        try {
            await downloadFile(
                `/events/${id}/download-all`,
                `event-${id}.zip`
            );
        } catch (err) {
            alert("Download failed: " + err.message);
        } finally {
            setDownloading(false);
        }
    };

    const handleUploaded = () => {
        loadPhotos();
    };

    const handleMatched = () => {
        // Refresh the photo list to show matched photos
        setJustMatched(true);
        loadPhotos();
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080a0d] text-white">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#080a0d] px-6 py-10 text-white">
                <div className="mx-auto max-w-5xl">
                    <Link
                        to={isAdmin ? "/admin" : "/events"}
                        className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D4AF37]"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </Link>

                    <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
                        <p className="text-red-400">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080a0d] text-white">
                <p className="text-gray-400">Event not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080a0d] px-6 py-10 text-white">
            <div className="mx-auto max-w-6xl">
                <Link
                    to={isAdmin ? "/admin" : "/events"}
                    className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D4AF37]"
                >
                    <ArrowLeft size={18} />
                    {isAdmin ? "Back to Admin" : "Back to Events"}
                </Link>

                {/* Event Header */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                    <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                        SCF MEDIA EVENT
                    </p>

                    <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                        {event.name}
                    </h1>

                    <div className="mt-5 flex flex-wrap gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <CalendarDays size={18} className="text-[#D4AF37]" />
                            <span>{event.eventDate}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <ImageIcon size={18} className="text-[#D4AF37]" />
                            <span>
                                {photos.length} photo
                                {photos.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                    </div>

                    {event.description && (
                        <p className="mt-6 max-w-3xl leading-7 text-gray-400">
                            {event.description}
                        </p>
                    )}
                </div>

                {/* Selfie Match Section — non-admin only */}
                {!isAdmin && (
                    <div className="mt-8">
                        <SelfieUpload eventId={id} onMatched={handleMatched} />
                    </div>
                )}

                {/* Photos Section */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                                Gallery
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold">
                                {isAdmin ? "Event Photos" : "Your Photos"}
                            </h2>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {isAdmin && (
                                <button
                                    onClick={() => setShowUpload((v) => !v)}
                                    className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-2.5 font-semibold text-black transition hover:bg-[#e4c45c]"
                                >
                                    {showUpload ? (
                                        <>
                                            <X size={18} />
                                            Close Upload
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={18} />
                                            Upload Photos
                                        </>
                                    )}
                                </button>
                            )}

                            {photos.length > 0 && (
                                <button
                                    onClick={handleDownloadAll}
                                    disabled={downloading}
                                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 font-semibold text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-50"
                                >
                                    <Download size={18} />
                                    {downloading ? "Preparing..." : "Download All"}
                                </button>
                            )}
                        </div>
                    </div>

                    {showUpload && isAdmin && (
                        <div className="mt-6">
                            <PhotoUpload eventId={id} onUploaded={handleUploaded} />
                        </div>
                    )}

                    {photosLoading ? (
                        <div className="mt-8 flex justify-center py-12">
                            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
                        </div>
                    ) : photos.length === 0 ? (
                        <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-12 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                                {isAdmin ? (
                                    <ImageIcon size={30} className="text-gray-500" />
                                ) : (
                                    <ScanFace size={30} className="text-gray-500" />
                                )}
                            </div>

                            <h3 className="mt-5 text-lg font-semibold">
                                {isAdmin
                                    ? "No photos uploaded yet"
                                    : "No photos found yet"}
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                {isAdmin
                                    ? "Click 'Upload Photos' above to add photos to this event."
                                    : "Upload a selfie above to find photos of yourself in this event."}
                            </p>
                        </div>
                    ) : (
                        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {photos.map((photo, index) => (
                                <PhotoCard
                                    key={photo.id}
                                    photo={photo}
                                    onClick={() => setLightboxIndex(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {lightboxIndex !== null && photos[lightboxIndex] && (
                <PhotoLightbox
                    photos={photos}
                    startIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </div>
    );
}

export default EventDetails;