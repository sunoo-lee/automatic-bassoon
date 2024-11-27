export interface MovieInfo {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  release_date: string;
}

export interface MusicInfo {
  name: string;
  images: { url: string }[];
  release_date: string;
  total_tracks: number;
  artists: { name: string }[];
}
