export interface MovieInfo {
  poster_path: string;
  title: string;
  original_title: string;
  id: number;
}

export interface MusicInfo {
  name: string;
  images: { url: string }[];
  release_date: string;
  total_tracks: number;
  artists: { name: string }[];
}
