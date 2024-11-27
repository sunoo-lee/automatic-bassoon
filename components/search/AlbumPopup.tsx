import SearchSpotity from "./SearchSpotify";

export default function AlbumPopup() {
  return (
    <div className="fixed w-full right-0 left-0 bottom-0 bg-slate-400 gap-2 h-60">
      {/* {resultList.map((item, i) => (
            <SearchSpotity key={i} name={item.name} images={item.images} />
          ))} */}
      <SearchSpotity />
    </div>
  );
}
