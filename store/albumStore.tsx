import { MusicInfo } from "@/global/types";
import { create } from "zustand";

interface AlbumStore {
  selectedAlbum: MusicInfo;
  albumList: MusicInfo[];
  setAlbumList: (data: MusicInfo[]) => void;
  setAlbum: (data: MusicInfo) => void;
}

const useAlbumStore = create<AlbumStore>((set, get) => ({
  selectedAlbum: {
    name: "",
    images: [{ url: "" }],
    artists: [{ name: "" }],
    total_tracks: 0,
    release_date: "",
  },
  albumList: [],
  setAlbumList: async (data: MusicInfo[]) => {
    await set((state) => ({ albumList: data }));
  },
  setAlbum: (data: MusicInfo) => {
    set((state) => ({ selectedAlbum: data }));
  },
}));

export default useAlbumStore;
