import { useEffect, useRef } from "react";

type Props = {
  coords: [number, number];
  title: string;
  location: string;
  zoom?: number;
};

export function ListingLocationMap({ coords, title, location, zoom = 13 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let map: import("leaflet").Map | null = null;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: false,
        dragging: true,
        attributionControl: false,
      }).setView(coords, zoom);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 20 }
      ).addTo(map);

      const pinIcon = L.divIcon({
        className: "penthouse-pin",
        html: `<span class="ph-pin-dot"></span><span class="ph-pin-pulse"></span>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      L.marker(coords, { icon: pinIcon })
        .addTo(map)
        .bindTooltip(`<strong>${escapeHtml(title)}</strong><br/>${escapeHtml(location)}`, {
          direction: "top",
          offset: [0, -10],
          className: "ph-mini-tooltip",
        });

      setTimeout(() => map?.invalidateSize(), 150);
    })();

    return () => {
      cancelled = true;
      if (map) {
        map.remove();
        map = null;
      }
    };
  }, [coords, title, location, zoom]);

  return (
    <div
      ref={containerRef}
      className="h-48 w-full rounded-xl border border-gold/40 overflow-hidden shadow-elegant"
      aria-label={`Map showing ${title} at ${location}`}
    />
  );
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
