import { useEffect, useRef } from "react";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { listings } from "@/lib/listings";

const points = listings.filter((l) => l.coords);
type LeafletMap = ReturnType<(typeof import("leaflet"))["map"]>;

export function ListingsMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (points.length === 0 || !containerRef.current || mapRef.current) return;

    let mounted = true;
    let map: LeafletMap | undefined;

    async function init() {
      const L = (await import("leaflet")).default;
      if (!mounted || !containerRef.current) return;

      map = L.map(containerRef.current).setView([34.0522, -118.2437], 10);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const bounds = L.latLngBounds([]);
      const icon = L.icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon2x,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const initializedMap = map;
      points.forEach((l) => {
        const [lat, lng] = l.coords as [number, number];
        const marker = L.marker([lat, lng], { icon, title: l.title, alt: l.title }).addTo(
          initializedMap,
        );
        bounds.extend([lat, lng]);

        marker.bindPopup(
          `<div style="font-family: Inter, sans-serif; min-width: 180px;">
            <div style="font-weight: 700; font-size: 14px; color: #1a1a1a;">${l.title}</div>
            <div style="font-size: 12px; color: #666; margin-top: 4px;">${l.location}</div>
            ${l.price ? `<div style="font-size: 13px; font-weight: 600; color: #b8860b; margin-top: 6px;">${l.price}</div>` : ""}
            <a href="/restaurants-for-sale/${encodeURIComponent(l.slug)}" style="display:inline-block;margin-top:10px;color:#66501b;text-decoration:underline;">View listing details</a>
          </div>`,
        );
      });

      map.fitBounds(bounds, { padding: [60, 60] });
    }

    // The map is below the listing cards. Preserve its dimensions while
    // deferring Leaflet initialization and tile requests until it is nearby.
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) {
                observer?.disconnect();
                void init();
              }
            },
            { rootMargin: "300px" },
          )
        : null;
    if (observer) observer.observe(containerRef.current);
    else void init();

    return () => {
      mounted = false;
      observer?.disconnect();
      if (map) {
        map.remove();
        mapRef.current = null;
      }
    };
  }, []);

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
