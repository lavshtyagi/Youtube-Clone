// ─── YouTube API Types ─────────────────────────────────────────────────────

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface VideoSnippet {
  title: string;
  channelTitle: string;
  channelId: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
  };
}

export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  commentCount: string;
  favoriteCount: string;
}

export interface VideoContentDetails {
  duration: string;
  definition: string;
  caption: string;
}

export interface VideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippet;
  statistics: VideoStatistics;
  contentDetails: VideoContentDetails;
}

// ─── Redux State Types ──────────────────────────────────────────────────────

export interface AppState {
  isMenuOpen: boolean;
  searchQuery: string;
}

export interface RootState {
  app: AppState;
}
