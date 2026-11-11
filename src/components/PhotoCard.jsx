import { useEffect, useState } from "react";
import { ImageOff, Download } from "lucide-react";
import { fetchImageUrl, downloadFile } from "../services/api";

function PhotoCard({ photo, onClick }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errored, setErrored] = useState(false);

    useEffect(() => {
        let revoked = false;
        let url = null;

        const load = async () => {
            try {
                url = await fetchImageUrl(`/photos/${photo.id}/raw`);
                if (revoked) {
                    window.URL.revokeObjectURL(url);
                    return;
                }
                setImageUrl(url);
            } catch (err) {
                console.error("Failed to load thumbnail:", err);
                setErrored(true);
            } finally {
                setLoading(false);
            }
        };

        load();

        return () => {
            revoked = true;
            if (url) window.URL.revokeObjectURL(url);
        };
    }, [photo.id]);

    const handleDownload = async (e) => {
        e.stopPropagation();
        try {
            await downloadFile(
                `/photos/${photo.id}/raw?download=true`,
                photo.fileName
            );
        } catch (err) {
            console.error("Download failed:", err);
            alert("Download failed: " + err.message);
        }
    };

    return (
        <div
            onClick={onClick}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/40 transition hover:border-[#d4af37]/50"
        >
            {loading && (
                <div className="flex h-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
                </div>
            )}

            {errored && (
                <div className="flex h-full flex-col items-center justify-center text-gray-600">
                    <ImageOff size={32} />
                    <p className="mt-2 text-xs">Unavailable</p>
                </div>
            )}

            {imageUrl && !errored && (
                <img
                    src={imageUrl}
                    alt={photo.fileName}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
            )}

            {/* Overlay with filename + download */}
            <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/0 to-black/0 p-3 opacity-0 transition group-hover:opacity-100">
                <p className="max-w-[70%] truncate text-xs text-white">
                    {photo.fileName}
                </p>

                <button
                    onClick={handleDownload}
                    className="rounded-full bg-[#d4af37] p-2 text-black transition hover:bg-[#e4c45c]"
                    aria-label="Download"
                >
                    <Download size={16} />
                </button>
            </div>
        </div>
    );
}

export default PhotoCard;