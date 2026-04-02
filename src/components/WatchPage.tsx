import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { CommentSection } from "./CommentSection";
import type { VideoItem, VideoSnippet } from "../utils/types";

interface YoutubeVideoDetailsResponse {
  items?: VideoItem[];
}

interface YoutubeRelatedSearchItem {
  kind: string;
  etag: string;
  id: { videoId?: string } | string;
  snippet: VideoSnippet;
}

interface YoutubeRelatedSearchResponse {
  items?: YoutubeRelatedSearchItem[];
}

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
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [related, setRelated] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoContext = async () => {
      if (!videoId) {
        setCurrentVideo(null);
        setRelated([]);
        setLoading(false);
        return;
      }

      try {
        const videoRes = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );
        const videoJson: YoutubeVideoDetailsResponse = await videoRes.json();
        const selectedVideo = videoJson.items?.[0] ?? null;
        setCurrentVideo(selectedVideo);

        const channelId = selectedVideo?.snippet.channelId;
        if (!channelId) {
          setRelated([]);
          return;
        }

        const relatedRes = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&channelId=${channelId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );
        const relatedJson: YoutubeRelatedSearchResponse = await relatedRes.json();

        const items =
          relatedJson.items?.map((item) => ({
            kind: item.kind,
            etag: item.etag,
            id: typeof item.id === "string" ? item.id : item.id.videoId || "",
            snippet: item.snippet,
            statistics: {
              viewCount: "–",
              likeCount: "–",
              commentCount: "–",
              favoriteCount: "0",
            },
            contentDetails: { duration: "", definition: "", caption: "" },
          })) ?? [];

        setRelated(items);
      } catch {
        setCurrentVideo(null);
        setRelated([]);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchVideoContext();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [videoId]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col gap-6 overflow-x-hidden p-4 max-w-screen-xl mx-auto lg:flex-row">
        {/* Left: Player + Info */}
        <div className="min-w-0 flex-1">
          <button
            onClick={() => navigate("/")}
            className="mb-4 flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-black"
          >
            ← Back to Home
          </button>

          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full rounded-xl shadow-lg"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mt-4">
            <h1 className="text-xl font-bold leading-snug text-gray-900">
              {currentVideo?.snippet.title ?? "Video Player"}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Playing video ID:{" "}
              <span className="font-mono text-gray-700">{videoId}</span>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium transition hover:bg-gray-200">
                👍 Like
              </button>
              <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium transition hover:bg-gray-200">
                👎 Dislike
              </button>
              <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium transition hover:bg-gray-200">
                🔗 Share
              </button>
              <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium transition hover:bg-gray-200">
                💾 Save
              </button>
            </div>

            <CommentSection />
          </div>
        </div>

        {/* Right: Recommended Videos */}
        <div className="w-full flex-shrink-0 lg:w-96">
          <h2 className="mb-3 text-base font-bold text-gray-800">Up Next</h2>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex gap-2 animate-pulse">
                  <div className="h-24 w-40 flex-shrink-0 rounded-lg bg-gray-200" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 rounded bg-gray-200 w-full" />
                    <div className="h-3 rounded bg-gray-200 w-4/5" />
                    <div className="h-3 rounded bg-gray-200 w-1/2" />
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
                    className="flex cursor-pointer gap-2 group"
                  >
                    <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={video.snippet.thumbnails?.medium?.url}
                        alt={video.snippet.title}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2 transition-colors group-hover:text-red-600">
                        {video.snippet.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
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
