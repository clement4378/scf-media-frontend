import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { fetchImageUrl, downloadFile } from "../services/api";

function PhotoLightbox({ photos, startIndex, onClose }) {
    const [index, setIndex] = useState(startIndex);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    const current = photos[index];

    // Load the current image
    useEffect(() => {
        let revoked = false;
        let url = null;
        setLoading(true);

        const load = async () => {
            try {
                url = await fetchImageUrl(`/photos/${current.id}/raw`);
                if (revoked) {
                    window.URL.revokeObjectURL(url);
                    return;
                }
                setImageUrl(url);
            } catch (err) {
                console.error("Failed to load image:", err);
            } finally {
                setLoading(false);
            }
        };

        load();

        return () => {
            revoked = true;
            if (url) window.URL.revokeObjectURL(url);
        };
    }, [current.id]);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
            if (e.key === "ArrowRight")
                setIndex((i) => Math.min(photos.length - 1, i + 1));
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [photos.length, onClose]);

    const handleDownload = async () => {
        try {
            await downloadFile(
                `/photos/${current.id}/raw?download=true`,
                current.fileName
            );
        } catch (err) {
            alert("Download failed: " + err.message);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Close"
            >
                <X size={22} />
            </button>

            {/* Counter */}
            <div className="absolute left-6 top-6 z-10 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                {index + 1} / {photos.length}
            </div>

            {/* Previous */}
            {index > 0 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIndex(index - 1);
                    }}
                    className="absolute left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Previous"
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            {/* Image */}
            <div
                className="flex max-h-[85vh] max-w-[85vw] flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                {loading ? (
                    <div className="flex h-64 w-64 items-center justify-center">
                        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
                    </div>
                ) : (
                    imageUrl && (
                        <img
                            src={imageUrl}
                            alt={current.fileName}
                            className="max-h-[75vh] max-w-full rounded-lg object-contain"
                        />
                    )
                )}

                {/* File info + download */}
                <div className="mt-4 flex items-center gap-4 text-white">
                    <p className="text-sm text-gray-300">{current.fileName}</p>

                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 rounded-full bg-[#d4af37] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#e4c45c]"
                    >
                        <Download size={16} />
                        Download
                    </button>
                </div>
            </div>

            {/* Next */}
            {index < photos.length - 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIndex(index + 1);
                    }}
                    className="absolute right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Next"
                >
                    <ChevronRight size={24} />
                </button>
            )}
        </div>
    );
}

export default PhotoLightbox;