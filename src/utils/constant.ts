
export const Youtube_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;

export const Youtube_search_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=40&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&q=`;