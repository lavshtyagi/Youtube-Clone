import { useNavigate } from "react-router-dom";
import type { VideoItem } from "../utils/types";

interface Props {
  video: VideoItem;
}

// Format view count: 1200000 → "1.2M views"
const formatViews = (count: string) => {
  const n = parseInt(count, 10);
  if (isNaN(n) || count === "–") return "";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M views";
  if (n >= 1_000) return Math.floor(n / 1_000) + "K views";
  return `${n} views`;
};

// Relative time: "3 days ago"
const timeAgo = (dateStr: string) => {
  if (!dateStr) return "";
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 3600) return Math.floor(diff / 60) + " min ago";
  if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";
  if (diff < 2592000) return Math.floor(diff / 86400) + " days ago";
  if (diff < 31536000) return Math.floor(diff / 2592000) + " months ago";
  return Math.floor(diff / 31536000) + " years ago";
};

export const VedioCard = ({ video }: Props) => {
  const navigate = useNavigate();
  if (!video) return null;

  const thumb =
    video.snippet.thumbnails?.medium?.url ||
    video.snippet.thumbnails?.high?.url ||
    video.snippet.thumbnails?.default?.url;

  const views = formatViews(video.statistics?.viewCount ?? "");
  const ago = timeAgo(video.snippet.publishedAt);

  return (
    <div
      onClick={() => navigate(`/watch/${video.id}`)}
      className="cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video bg-gray-100">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={video.snippet.title}
          src={thumb}
        />
      </div>

      {/* Info row */}
      <div className="flex gap-3 mt-3">
        {/* Channel avatar placeholder */}
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold uppercase">
          {video.snippet.channelTitle?.[0] ?? "Y"}
        </div>

        {/* Text info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
            {video.snippet.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 truncate">
            {video.snippet.channelTitle}
          </p>
          {(views || ago) && (
            <p className="text-xs text-gray-400">
              {views}{views && ago ? " • " : ""}{ago}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
