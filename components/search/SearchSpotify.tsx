"use client";

import useAlbumStore from "@/store/albumStore";
import searchStore from "@/store/searchStore";
import Image from "next/image";

export default function SearchSpotity() {
  const selectedAlbum = useAlbumStore((state) => state.selectedAlbum);
  const togglePopup = searchStore((state) => state.togglePopup);
  const handlePopupClose = () => {
    togglePopup(false);
  };

  return (
    <>
      <div className="z-50 relative w-full h-full  bg-neutral-600">
        <div className="relative z-10 text-center space-y-2 p-4">
          {selectedAlbum && (
            <div className="flex">
              {selectedAlbum.images[0] && (
                <Image
                  src={selectedAlbum?.images[0].url}
                  alt="album image"
                  height={120}
                  width={120}
                  className="w-28 h-28 object-cover"
                />
              )}
              <div>
                <div>{selectedAlbum?.name}</div>
                <div>{selectedAlbum?.artists[0].name}</div>
                <div>{selectedAlbum?.release_date.slice(0, 4)}</div>
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
