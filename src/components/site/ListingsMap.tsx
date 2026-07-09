import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { listings } from "@/lib/listings";

export function ListingsMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const points = listings.filter((l) => l.coords);

  useEffect(() => {
    if (points.length === 0 || !containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([34.0522, -118.2437], 10);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const bounds = L.latLngBounds([]);

    points.forEach((l) => {
      const [lat, lng] = l.coords as [number, number];
      const marker = L.marker([lat, lng]).addTo(map);
      bounds.extend([lat, lng]);

      marker.bindPopup(
        `<div style="font-family: Inter, sans-serif; min-width: 180px;">
          <div style="font-weight: 700; font-size: 14px; color: #1a1a1a;">${l.title}</div>
          <div style="font-size: 12px; color: #666; margin-top: 4px;">${l.location}</div>
          ${l.price ? `<div style="font-size: 13px; font-weight: 600; color: #b8860b; margin-top: 6px;">${l.price}</div>` : ""}
        </div>`,
      );
    });

    map.fitBounds(bounds, { padding: [60, 60] });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [points]);

  if (points.length === 0) return null;

  return (
    <div className="relative rounded-xl border border-gold/40 overflow-hidden shadow-elegant bg-card">
      <div
        ref={containerRef}
        title="Map of Los Angeles restaurant and real estate listings"
        className="h-[420px] md:h-[520px] w-full"
      />
    </div>
  );
}
