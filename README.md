# 📺 YouTube Clone

🚀 **Live Demo:** [https://youtube-clone-xi-pied.vercel.app/](https://youtube-clone-xi-pied.vercel.app/)

A feature-rich static web app that replicates the core YouTube experience — built with **React 19**, **TypeScript**, **Vite**, **TailwindCSS v4**, and **Redux Toolkit**.

Live data is powered by the **YouTube Data API v3**.

---

## ✨ Features

- 🏠 **Home Feed** — Fetches the top 50 trending videos in India via the YouTube API
- 🔍 **Search** — Type a query and real-time debounced search calls the YouTube API
- ⚡ **Search Caching** — Stores previous searches in a `useRef` cache for instant loading without rebill API
- 🎬 **Watch Page** — Click any video to open it in a full embedded player (`/watch/:videoId`)
- 💬 **N-Level Nested Comments** — Recursive comment component supporting infinite depth replies on watch page
- 📋 **Up Next Panel** — Recommended videos listed alongside the player
- 🗂️ **Collapsible Sidebar** — Hamburger toggle works on both the home and watch pages
- 🏷️ **Category Chips** — Filter bar with active highlighting (All, Music, Gaming, News …)
- ⏳ **Loading Skeletons** — Shimmer placeholders while videos are being fetched
- 🛡️ **API Fallback** — Mock video cards shown automatically if the API quota is exceeded
- 📱 **Responsive** — Grid collapses from 4 columns → 1 column on mobile

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Head.tsx           # Sticky navbar — search, logo, hamburger, mic, bell
│   ├── Body.tsx           # Sidebar + MainContainer layout
│   ├── Sidebar.tsx        # Collapsible sidebar (Redux-driven)
│   ├── MainContainer.tsx  # Category chips + video grid
│   ├── ButtonList.tsx     # Scrollable category filter bar
│   ├── Button.tsx         # Individual chip with active state
│   ├── VedioContainer.tsx # Fetches & renders video grid (trending / search + cache)
│   ├── Vediocard.tsx      # Single video card with thumbnail, views, time
│   ├── WatchPage.tsx      # Video player page with iframe + Up Next panel
│   └── CommentSection.tsx # Recursive n-level nested comment UI
├── utils/
│   ├── store.tsx          # Redux store
│   ├── appslice.tsx       # Redux slice — isMenuOpen, searchQuery
│   ├── constant.ts        # YouTube API URLs
│   └── types.ts           # Shared TypeScript interfaces
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | TailwindCSS v4 |
| State | Redux Toolkit |
| Routing | React Router DOM v7 |
| API | YouTube Data API v3 |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/lavshtyagi/Youtube-Clone.git
cd Youtube-Clone
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your API key

Create a `.env` file in the root:
```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
```

Get a free key from [Google Cloud Console](https://console.cloud.google.com/) → Enable **YouTube Data API v3**.

### 4. Run locally
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📐 Architecture — How Redux Drives the App

```
User types query → Head dispatches setSearchQuery("react")
                        ↓
              Redux Store updates searchQuery
                        ↓
         VedioContainer reads searchQuery via useSelector
                        ↓
         Calls YouTube Search API → grid re-renders
```

Two Redux state values power the entire app:

| State | Set by | Read by |
|---|---|---|
| `isMenuOpen` | `Head` (hamburger click) | `Sidebar` (show/hide) |
| `searchQuery` | `Head` (search submit) | `VedioContainer` (API call) |

---

## 📸 Pages

| Route | Description |
|---|---|
| `/` | Home feed with trending videos and search |
| `/watch/:videoId` | Embedded video player with Up Next panel |
