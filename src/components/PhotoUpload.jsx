import { useRef, useState } from "react";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { uploadFile } from "../services/api";

function PhotoUpload({ eventId, onUploaded }) {
    const [isDragging, setIsDragging] = useState(false);
    const [queue, setQueue] = useState([]);       // [{ file, status, error }]
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const addFiles = (files) => {
        const newItems = Array.from(files).map((file) => ({
            file,
            status: "pending",   // pending | uploading | done | error
            error: null,
        }));
        setQueue((q) => [...q, ...newItems]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.length) {
            addFiles(e.dataTransfer.files);
        }
    };

    const handleSelect = (e) => {
        if (e.target.files?.length) {
            addFiles(e.target.files);
        }
    };

    const removeItem = (index) => {
        setQueue((q) => q.filter((_, i) => i !== index));
    };

    const startUpload = async () => {
        setUploading(true);

        // Upload sequentially (simple, preserves order)
        for (let i = 0; i < queue.length; i++) {
            const item = queue[i];
            if (item.status !== "pending") continue;

            setQueue((q) => {
                const copy = [...q];
                copy[i] = { ...copy[i], status: "uploading" };
                return copy;
            });

            try {
                await uploadFile(`/events/${eventId}/photos`, item.file);
                setQueue((q) => {
                    const copy = [...q];
                    copy[i] = { ...copy[i], status: "done" };
                    return copy;
                });
            } catch (err) {
                setQueue((q) => {
                    const copy = [...q];
                    copy[i] = {
                        ...copy[i],
                        status: "error",
                        error: err.message,
                    };
                    return copy;
                });
            }
        }

        setUploading(false);

        // Notify parent to refresh gallery
        if (onUploaded) onUploaded();
    };

    const pendingCount = queue.filter((q) => q.status === "pending").length;
    const doneCount = queue.filter((q) => q.status === "done").length;

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            {/* Drop zone */}
            <div
                onDrop={handleDrop}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition ${
                    isDragging
                        ? "border-[#d4af37] bg-[#d4af37]/5"
                        : "border-white/10 bg-black/20"
                }`}
            >
                <Upload
                    size={40}
                    className={isDragging ? "text-[#d4af37]" : "text-gray-500"}
                />

                <p className="mt-4 text-sm font-medium text-white">
                    Drag and drop photos here
                </p>

                <p className="mt-1 text-xs text-gray-500">
                    or click below to browse
                </p>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleSelect}
                    className="hidden"
                />

                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="mt-5 rounded-lg bg-[#d4af37] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#e4c45c] disabled:opacity-50"
                >
                    Choose Photos
                </button>
            </div>

            {/* Queue */}
            {queue.length > 0 && (
                <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <p className="text-gray-400">
                            {doneCount} / {queue.length} uploaded
                        </p>

                        {pendingCount > 0 && !uploading && (
                            <button
                                onClick={startUpload}
                                className="rounded-lg bg-[#d4af37] px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-[#e4c45c]"
                            >
                                Upload {pendingCount} File{pendingCount > 1 ? "s" : ""}
                            </button>
                        )}
                    </div>

                    <div className="max-h-64 space-y-2 overflow-y-auto">
                        {queue.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 rounded-lg border border-white/5 bg-black/30 px-3 py-2"
                            >
                                <div className="flex-shrink-0">
                                    {item.status === "pending" && (
                                        <div className="h-5 w-5 rounded-full border-2 border-gray-600" />
                                    )}
                                    {item.status === "uploading" && (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
                                    )}
                                    {item.status === "done" && (
                                        <CheckCircle size={20} className="text-green-500" />
                                    )}
                                    {item.status === "error" && (
                                        <AlertCircle size={20} className="text-red-500" />
                                    )}
                                </div>

                                <div className="flex-1 overflow-hidden">
                                    <p className="truncate text-sm text-white">
                                        {item.file.name}
                                    </p>
                                    {item.error && (
                                        <p className="truncate text-xs text-red-400">
                                            {item.error}
                                        </p>
                                    )}
                                </div>

                                {item.status === "pending" && (
                                    <button
                                        onClick={() => removeItem(i)}
                                        className="text-gray-500 hover:text-white"
                                        aria-label="Remove"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PhotoUpload;