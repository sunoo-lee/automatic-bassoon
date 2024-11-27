export default function SpotifyPlayer() {
  return (
    <div className="absolute">
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/album/5vkqYmiPBYLaalcmjujWxK?utm_source=generator"
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
