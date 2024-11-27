"use client";

import { MusicInfo } from "@/global/types";
import useAlbumStore from "@/store/albumStore";
import searchStore from "@/store/searchStore";
import Image from "next/image";
import { useEffect } from "react";

export default function SearchSpotity() {
  const albumList = useAlbumStore((state) => state.albumList);
  const togglePopup = searchStore((state) => state.togglePopup);
  const handlePopupClose = () => {
    togglePopup(false);
  };
  // useEffect(() => {
  //   console.log(albumList[0]?.images[0].url);
  // }, [albumList]);
  return (
    <>
      <div className="z-50 relative w-full h-full  bg-neutral-600">
        <div className="relative z-10 text-center space-y-2 p-4">
          {albumList[0] && (
            <div className="flex">
              <Image
                src={albumList[0]?.images[0].url}
                alt="album image"
                height={120}
                width={120}
                className="w-28 h-28 object-cover"
              />
              <div>
                <div>{albumList[0]?.name}</div>
                <div>{albumList[0]?.artists[0].name}</div>
                <div>{albumList[0]?.release_date.slice(0, 4)}</div>
              </div>
            </div>
          )}
          <div>상세 정보</div>
          <div className="absolute top-0 right-4">
            <button onClick={handlePopupClose}>X</button>
          </div>
        </div>
      </div>
    </>
  );
}
