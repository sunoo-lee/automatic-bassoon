import searchStore from "@/store/searchStore";
import AlbumPopup from "./AlbumPopup";

export default function PopupWrapper() {
  const isPopupOpen = searchStore((state) => state.isPopupOpen);
  return <>{isPopupOpen ? <AlbumPopup /> : ""}</>;
}
