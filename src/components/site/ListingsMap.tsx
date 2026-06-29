import { listings } from "@/lib/listings";

export function ListingsMap() {
  const points = listings.filter((l) => l.coords);
  if (points.length === 0) return null;

  // Center on average of all points
  const avgLat = points.reduce((s, l) => s + (l.coords as [number, number])[0], 0) / points.length;
  const avgLng = points.reduce((s, l) => s + (l.coords as [number, number])[1], 0) / points.length;

  const src = `https://www.google.com/maps?q=${avgLat},${avgLng}&z=10&output=embed`;

  return (
    <div className="relative rounded-xl border border-gold/40 overflow-hidden shadow-elegant bg-card">
      <iframe
        title="Map of Los Angeles restaurant and real estate listings"
        src={src}
        className="h-[420px] md:h-[520px] w-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
