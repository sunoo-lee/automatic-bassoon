"use client";

import { getSpotifyToken } from "@/components/search/getToken";
import PopupWrapper from "@/components/search/PopupWrapper";
import SearchBar from "@/components/search/SearchBar";
import SearchMovie from "@/components/search/SearchMovie";
import authStore from "@/store/authStore";
import { useEffect } from "react";

export default function Home() {
  const setToken = authStore((state) => state.setToken);

  const fetchToken = async () => {
    const newToken = await getSpotifyToken();
    setToken(newToken);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 bg-neutral-800">
      <SearchBar />
      <SearchMovie />
      <PopupWrapper />
    </div>
  );
}
