"use client";
import { MovieInfo } from "@/global/types";
import searchStore from "@/store/searchStore";
import Image from "next/image";
import React from "react";

interface Props {
  data: MovieInfo;
  onCardClick: (movieTitle: string) => void;
}

const MovieItem = React.memo(function MovieItem({ data, onCardClick }: Props) {
  const togglePopup = searchStore((state) => state.togglePopup);
  const handleClickCard = () => {
    onCardClick(data.original_title);
    togglePopup(true);
    console.log(data.original_title);
  };

  return (
    <>
      <div className="w-full">
        <div
          onClick={handleClickCard}
          className=" cursor-pointer bg-gray-800 rounded shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          {data.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              alt="poster image"
              className="w-full h-40 md:h-48 object-cover"
              width={500}
              height={192}
              style={{ width: "auto", height: "auto", objectFit: "cover" }}
            />
          )}
        </div>
      </div>
    </>
  );
});

export default MovieItem;
