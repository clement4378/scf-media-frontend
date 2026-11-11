import { useRef, useState } from "react";
import { ScanFace, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { uploadFile } from "../services/api";

function SelfieUpload({ eventId, onMatched }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [matching, setMatching] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);
    const inputRef = useRef(null);

    const handleSelect = (selected) => {
        setError("");
        setResult(null);

        if (!selected) return;

        if (!selected.type.startsWith("image/")) {
            setError("Please select an image file");
            return;
        }

        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    const clear = () => {
        if (preview) URL.revokeObjectURL(preview);
        setFile(null);
        setPreview(null);
        setError("");
        setResult(null);
    };

    const handleMatch = async () => {
        if (!file) return;

        setMatching(true);
        setError("");

        try {
            const data = await uploadFile(
                `/events/${eventId}/match-face`,
                file
            );

            setResult(data);

            if (data.matchesFound === 0) {
                setError(
                    "No photos of you found in this event yet. Try again with a clearer selfie."
                );
            } else if (onMatched) {
                onMatched(data);
            }
        } catch (err) {
            setError(err.message || "Face matching failed");
        } finally {
            setMatching(false);
        }
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37]/10">
                    <ScanFace className="text-[#d4af37]" size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Find your photos</h3>
                    <p className="text-sm text-gray-500">
                        Upload a clear selfie to find photos of you in this event.
                    </p>
                </div>
            </div>

            {!preview ? (
                <div
                    onClick={() => inputRef.current?.click()}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-black/20 px-6 py-10 transition hover:border-[#d4af37]/50"
                >
                    <Upload size={36} className="text-gray-500" />
                    <p className="mt-4 text-sm text-white">
                        Click to select a selfie
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        JPG, PNG, or WEBP
                    </p>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Selfie preview"
                            className="h-40 w-40 rounded-full border-2 border-[#d4af37]/50 object-cover"
                        />
                        <button
                            onClick={clear}
                            className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-black"
                            aria-label="Remove"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <p className="mt-3 max-w-xs truncate text-xs text-gray-500">
                        {file.name}
                    </p>

                    <button
                        onClick={handleMatch}
                        disabled={matching}
                        className="mt-5 flex items-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3 font-semibold text-black transition hover:bg-[#e4c45c] disabled:opacity-50"
                    >
                        {matching ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                                Searching...
                            </>
                        ) : (
                            <>
                                <ScanFace size={18} />
                                Find My Photos
                            </>
                        )}
                    </button>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleSelect(e.target.files?.[0])}
                className="hidden"
            />

            {error && (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                    <AlertCircle
                        size={18}
                        className="mt-0.5 flex-shrink-0 text-red-400"
                    />
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            )}

            {result && result.matchesFound > 0 && (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                    <CheckCircle
                        size={18}
                        className="mt-0.5 flex-shrink-0 text-green-400"
                    />
                    <div>
                        <p className="text-sm font-medium text-green-400">
                            Found {result.matchesFound} photo
                            {result.matchesFound !== 1 ? "s" : ""} of you!
                        </p>
                        <p className="mt-1 text-xs text-green-400/70">
                            Scroll down to see them, or come back anytime to view.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SelfieUpload;