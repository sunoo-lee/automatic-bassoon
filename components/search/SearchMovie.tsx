"use client";

import useAlbumStore from "@/store/albumStore";
import authStore from "@/store/authStore";
import searchStore from "@/store/searchStore";
import axios from "axios";
import React, { useCallback } from "react";
import { useShallow } from "zustand/shallow";
import MovieItem from "./MovieItem";
import { MusicInfo } from "@/global/types";

const SearchMovie = React.memo(function SearchMovie() {
  const movieList = searchStore((state) => state.movieList);
  const setAlbumList = useAlbumStore(useShallow((state) => state.setAlbumList));
  const setAlbum = useAlbumStore((state) => state.setAlbum);

  const token = authStore((state) => state.token);

  const fetchAlbumData = async (original_title: string, year: string) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${original_title}&type=album`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = await response.data;
    const {
      albums: { items },
    } = data;

    setAlbumList(items);
    const selectedAlbum: MusicInfo = items.find(
      (album: MusicInfo) => album.release_date.slice(0, 4) === year
    );
    setAlbum(selectedAlbum);

    // console.log(original_title);
    // console.log(selectedAlbum);
    // console.log(items);
  };

  const handleClickCard = useCallback(
    async (movieTitle: string, year: string) => {
      await fetchAlbumData(movieTitle, year);
    },
    [token]
  );

  return (
    <>
      <div className="absolute top-0 h-dvh pt-40 overflow-scroll">
        <div className="grid grid-cols-3 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {movieList?.map((item, i) => (
            <MovieItem
              key={item.id}
              data={item}
              onCardClick={handleClickCard}
            />
          ))}
        </div>
      </div>
    </>
  );
});

export default SearchMovie;
