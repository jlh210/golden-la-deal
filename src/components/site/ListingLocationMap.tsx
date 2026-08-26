type Props = {
  coords: [number, number];
  title: string;
  location: string;
  zoom?: number;
};

export function ListingLocationMap({ coords, title, location, zoom = 16 }: Props) {
  const [lat, lng] = coords;
  const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
  const src = `https://www.google.com/maps/embed/v1/place?key=${key}&q=${lat},${lng}&zoom=${zoom}`;

  return (
    <div className="h-48 w-full rounded-xl border border-gold/40 overflow-hidden shadow-elegant bg-card">
      <iframe
        title={`Map showing ${title} at ${location}`}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
