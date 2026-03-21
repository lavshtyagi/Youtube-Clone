import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Youtube_url, Youtube_search_url } from "../utils/constant";
import type { VideoItem, RootState } from "../utils/types";
import { VedioCard } from "./Vediocard";

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
      default: { url: `https://picsum.photos/seed/${i + 10}/120/90`, width: 120, height: 90 },
      medium: { url: `https://picsum.photos/seed/${i + 10}/320/180`, width: 320, height: 180 },
      high: { url: `https://picsum.photos/seed/${i + 10}/480/360`, width: 480, height: 360 },
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
    <div className="bg-gray-200 rounded-xl w-full aspect-video" />
    <div className="flex gap-2 mt-3">
      <div className="w-9 h-9 bg-gray-200 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-4/5" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  </div>
);

export const VedioContainer = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const searchQuery = useSelector((store: RootState) => store.app.searchQuery);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(false);
      try {
        let url = Youtube_url;
        let items: VideoItem[] = [];

        if (searchQuery) {
          // Search API returns a slightly different shape — id is an object
          url = Youtube_search_url + encodeURIComponent(searchQuery);
          const res = await fetch(url);
          const json = await res.json();
          if (json.error || !json.items) throw new Error("API error");
          // Map search results to VideoItem-like shape
          items = (json.items as any[]).map((item: any) => ({
            kind: item.kind,
            etag: item.etag,
            id: item.id?.videoId || item.id,
            snippet: item.snippet,
            statistics: { viewCount: "–", likeCount: "–", commentCount: "–", favoriteCount: "0" },
            contentDetails: { duration: "", definition: "", caption: "" },
          }));
        } else {
          const res = await fetch(url);
          const json = await res.json();
          if (json.error || !json.items) throw new Error("API error");
          items = json.items as VideoItem[];
        }

        setVideos(items);
      } catch {
        setError(true);
        setVideos(MOCK_VIDEOS);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  return (
    <div className="p-4">
      {searchQuery && !loading && (
        <h2 className="text-base font-semibold text-gray-700 mb-4">
          Results for <span className="text-black">"{searchQuery}"</span>
          {error && (
            <span className="ml-2 text-xs text-orange-500 font-normal">(showing mock results — API quota exceeded)</span>
          )}
        </h2>
      )}
      {error && !searchQuery && (
        <p className="text-xs text-orange-500 mb-3">⚠ API quota exceeded — showing sample videos.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
          : videos.map((video) => (
              <VedioCard key={video.id + video.snippet.publishedAt} video={video} />
            ))}
      </div>
    </div>
  );
};
