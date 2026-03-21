import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { VideoItem } from "../utils/types";
import { Youtube_url } from "../utils/constant";
import { Sidebar } from "./Sidebar";

// Helper: format large numbers like "1.2M views"
const formatViews = (count: string) => {
  const n = parseInt(count, 10);
  if (isNaN(n)) return "–";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M views";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K views";
  return `${n} views`;
};

// Helper: relative time
const timeAgo = (dateStr: string) => {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 3600) return Math.floor(diff / 60) + " minutes ago";
  if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";
  if (diff < 2592000) return Math.floor(diff / 86400) + " days ago";
  if (diff < 31536000) return Math.floor(diff / 2592000) + " months ago";
  return Math.floor(diff / 31536000) + " years ago";
};

export const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const [related, setRelated] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(Youtube_url);
        const json = await res.json();
        setRelated(json.items || []);
      } catch {
        setRelated([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
    // Scroll to top when navigating to a new video
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [videoId]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
    <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 max-w-screen-xl mx-auto overflow-x-hidden">
      {/* ── Left: Player + Info ─────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
        >
          ← Back to Home
        </button>

        {/* Video iframe */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-xl shadow-lg"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video info placeholder (we don't re-fetch single video, use URL state) */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-gray-900 leading-snug">
            Video Player
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Playing video ID: <span className="font-mono text-gray-700">{videoId}</span>
          </p>

          {/* Action row */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm font-medium">
              👍 Like
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm font-medium">
              👎 Dislike
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm font-medium">
              🔗 Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm font-medium">
              💾 Save
            </button>
          </div>
        </div>
      </div>

      {/* ── Right: Recommended Videos ───────────────────── */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <h2 className="font-bold text-base mb-3 text-gray-800">Up Next</h2>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex gap-2 animate-pulse">
                <div className="w-40 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-4/5" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {related
              .filter((v) => v.id !== videoId)
              .map((video) => (
                <div
                  key={video.id}
                  onClick={() => navigate(`/watch/${video.id}`)}
                  className="flex gap-2 cursor-pointer group"
                >
                  <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden">
                    <img
                      src={video.snippet.thumbnails?.medium?.url}
                      alt={video.snippet.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {video.snippet.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {video.snippet.channelTitle}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatViews(video.statistics?.viewCount)} •{" "}
                      {timeAgo(video.snippet.publishedAt)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};
