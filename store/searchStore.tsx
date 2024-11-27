import { MovieInfo, MusicInfo } from "@/global/types";
import { create } from "zustand";

interface SearchSote {
  selectMovie: MovieInfo;
  movieList: MovieInfo[];
  isPopupOpen: boolean;
  setMovieList: (data: MovieInfo[]) => void;
  togglePopup: (toggleState: boolean) => void;
}

const searchStore = create<SearchSote>((set, get) => ({
  selectMovie: {
    poster_path: "",
    title: "title",
    original_title: "title",
    id: 0,
    release_date: "0000-00-00",
  },
  movieList: [],
  isPopupOpen: false,
  setMovieList: (data: MovieInfo[]) => {
    set((state) => ({ movieList: data }));
  },
  togglePopup: (open: boolean) => {
    set((state) => ({ isPopupOpen: open }));
  },
}));

export default searchStore;
