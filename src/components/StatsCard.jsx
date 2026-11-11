import { useEffect, useState } from "react";
import {
    Users,
    UserCheck,
    UserPlus,
    Shield,
    CalendarDays,
    Image as ImageIcon,
    HardDrive,
    ScanFace,
} from "lucide-react";
import { apiRequest } from "../services/api";

function StatTile({ icon: Icon, label, value, accent }) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent || "bg-[#d4af37]/10"}`}>
                    <Icon
                        size={16}
                        className={accent ? "text-white" : "text-[#d4af37]"}
                    />
                </div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                    {label}
                </p>
            </div>

            <p className="mt-3 text-2xl font-bold text-white">
                {value}
            </p>
        </div>
    );
}

function StatsCard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const data = await apiRequest("/admin/stats/overview");
                setStats(data);
            } catch (err) {
                console.error("Failed to load stats:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
                <p className="text-sm text-red-400">
                    Could not load stats: {error}
                </p>
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37]/10">
                    <Shield className="text-[#d4af37]" size={20} />
                </div>
                <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                        System Overview
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">
                        Statistics
                    </h2>
                </div>
            </div>

            {/* Users row */}
            <div className="mb-3">
                <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">
                    Users
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <StatTile
                        icon={Users}
                        label="Total"
                        value={stats.totalUsers}
                    />
                    <StatTile
                        icon={UserCheck}
                        label="Approved"
                        value={stats.approvedUsers}
                    />
                    <StatTile
                        icon={UserPlus}
                        label="Pending"
                        value={stats.pendingUsers}
                        accent={
                            stats.pendingUsers > 0
                                ? "bg-orange-500/20"
                                : undefined
                        }
                    />
                    <StatTile
                        icon={Shield}
                        label="Admins"
                        value={stats.adminUsers}
                    />
                </div>
            </div>

            {/* Content row */}
            <div className="mb-3">
                <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">
                    Content
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <StatTile
                        icon={CalendarDays}
                        label="Events"
                        value={stats.totalEvents}
                    />
                    <StatTile
                        icon={ImageIcon}
                        label="Photos"
                        value={stats.totalPhotos}
                    />
                    <StatTile
                        icon={ScanFace}
                        label="Face embeddings"
                        value={stats.totalFaceEmbeddings}
                    />
                </div>
            </div>

            {/* Storage + matches */}
            <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">
                    Storage & Matching
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <StatTile
                        icon={HardDrive}
                        label="Storage used"
                        value={stats.totalStorageHuman}
                    />
                    <StatTile
                        icon={ScanFace}
                        label="Total matches"
                        value={stats.totalMatchGrants}
                    />
                    <StatTile
                        icon={Users}
                        label="Users with matches"
                        value={stats.usersWithMatches}
                    />
                </div>
            </div>
        </div>
    );
}

export default StatsCard;