import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Youtube_search_url, Youtube_url } from "../utils/constant";
import type { RootState, VideoItem, VideoSnippet } from "../utils/types";
import { VedioCard } from "./Vediocard";

interface YoutubeSearchItem {
  kind: string;
  etag: string;
  id: { videoId?: string } | string;
  snippet: VideoSnippet;
}

interface YoutubeSearchResponse {
  error?: unknown;
  items?: YoutubeSearchItem[];
}

interface YoutubeVideosResponse {
  error?: unknown;
  items?: VideoItem[];
}

// Mock data fallback if the API quota is exceeded
const MOCK_VIDEOS: VideoItem[] = Array.from({ length: 12 }, (_, i) => ({
  kind: "youtube#video",
  etag: `mock-${i}`,
  id: `dQw4w9WgXcQ`,
  snippet: {
    title: `Sample Video ${i + 1} — API quota exceeded, showing mock data`,
    channelTitle: "YouTube Clone Demo",
    channelId: "demo",
    description: "Mock description",
    publishedAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
    thumbnails: {
      default: {
        url: `https://picsum.photos/seed/${i + 10}/120/90`,
        width: 120,
        height: 90,
      },
      medium: {
        url: `https://picsum.photos/seed/${i + 10}/320/180`,
        width: 320,
        height: 180,
      },
      high: {
        url: `https://picsum.photos/seed/${i + 10}/480/360`,
        width: 480,
        height: 360,
      },
    },
  },
  statistics: {
    viewCount: String(Math.floor(Math.random() * 5_000_000)),
    likeCount: String(Math.floor(Math.random() * 100_000)),
    commentCount: String(Math.floor(Math.random() * 10_000)),
    favoriteCount: "0",
  },
  contentDetails: { duration: "PT5M30S", definition: "hd", caption: "false" },
}));

const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="aspect-video w-full rounded-xl bg-gray-200" />
    <div className="mt-3 flex gap-2">
      <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gray-200" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-4/5 rounded bg-gray-200" />
        <div className="h-3 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  </div>
);

export const VedioContainer = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Cache: stores results by query so repeat searches skip the API
  const cache = useRef<Record<string, VideoItem[]>>({});

  const searchQuery = useSelector((store: RootState) => store.app.searchQuery);

  useEffect(() => {
    const fetchVideos = async () => {
      const cacheKey = searchQuery || "__trending__";
      if (cache.current[cacheKey]) {
        setVideos(cache.current[cacheKey]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        let items: VideoItem[] = [];

        if (searchQuery) {
          const url = Youtube_search_url + encodeURIComponent(searchQuery);
          const res = await fetch(url);
          const json: YoutubeSearchResponse = await res.json();

          if (json.error || !json.items) {
            throw new Error("API error");
          }

          items = json.items.map((item) => ({
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
          }));
        } else {
          const res = await fetch(Youtube_url);
          const json: YoutubeVideosResponse = await res.json();

          if (json.error || !json.items) {
            throw new Error("API error");
          }

          items = json.items;
        }

        cache.current[cacheKey] = items;
        setVideos(items);
      } catch {
        setError(true);
        setVideos(MOCK_VIDEOS);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchVideos();
    }, searchQuery ? 500 : 0);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="p-4">
      {searchQuery && !loading && (
        <h2 className="mb-4 text-base font-semibold text-gray-700">
          Results for <span className="text-black">"{searchQuery}"</span>
          {error && (
            <span className="ml-2 text-xs font-normal text-orange-500">
              (showing mock results - API quota exceeded)
            </span>
          )}
        </h2>
      )}
      {error && !searchQuery && (
        <p className="mb-3 text-xs text-orange-500">
          ⚠ API quota exceeded - showing sample videos.
        </p>
      )}
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
          : videos.map((video) => (
              <VedioCard key={video.id + video.snippet.publishedAt} video={video} />
            ))}
      </div>
    </div>
  );
};
