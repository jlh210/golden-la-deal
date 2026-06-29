import { useEffect, useRef } from "react";
import { listings } from "@/lib/listings";

export function ListingsMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    let map: import("leaflet").Map | null = null;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      const points = listings.filter((l) => l.coords);
      if (points.length === 0) return;

      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      });
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map);

      const pinIcon = L.divIcon({
        className: "penthouse-pin",
        html: `<span class="ph-pin-dot"></span><span class="ph-pin-pulse"></span>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -12],
      });

      const bounds = L.latLngBounds(
        points.map((l) => l.coords as [number, number])
      );

      points.forEach((l) => {
        const [lat, lng] = l.coords as [number, number];
        const img = l.images?.[0]
          ? `<img src="${l.images[0]}" alt="${escapeHtml(l.title)}" class="ph-popup-img" loading="lazy" />`
          : "";
        const price = l.price
          ? `<div class="ph-popup-price">${escapeHtml(l.price)}</div>`
          : "";
        const html = `
          <div class="ph-popup">
            ${img}
            <div class="ph-popup-body">
              <div class="ph-popup-type">${escapeHtml(l.type)}</div>
              <div class="ph-popup-title">${escapeHtml(l.title)}</div>
              <div class="ph-popup-loc">${escapeHtml(l.location)}</div>
              ${price}
              <a href="/restaurants-for-sale/${l.slug}" class="ph-popup-link">View listing →</a>
            </div>
          </div>
        `;
        L.marker([lat, lng], { icon: pinIcon })
          .addTo(map!)
          .bindPopup(html, { maxWidth: 260, className: "ph-popup-wrap" });
      });

      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });

      // Invalidate after a tick in case container size changes
      setTimeout(() => map?.invalidateSize(), 200);
    })();

    return () => {
      cancelled = true;
      if (map) {
        map.remove();
        map = null;
      }
    };
  }, []);

  return (
    <div className="relative rounded-xl border border-gold/40 overflow-hidden shadow-elegant bg-card">
      <div
        ref={containerRef}
        className="h-[420px] md:h-[520px] w-full"
        aria-label="Map of Los Angeles restaurant and real estate listings"
      />
    </div>
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
