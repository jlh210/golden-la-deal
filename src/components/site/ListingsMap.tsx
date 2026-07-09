import { useEffect, useRef, useState } from "react";
import { listings } from "@/lib/listings";

declare global {
  interface Window {
    initListingsMap?: () => void;
    google?: {
      maps: {
        Map: new (
          container: HTMLElement,
          options: {
            center: { lat: number; lng: number };
            zoom: number;
            mapTypeControl?: boolean;
            streetViewControl?: boolean;
            fullscreenControl?: boolean;
          },
        ) => {
          fitBounds: (bounds: unknown, padding?: number) => void;
        };
        LatLngBounds: new () => {
          extend: (point: { lat: number; lng: number }) => void;
        };
        Marker: new (options: {
          position: { lat: number; lng: number };
          map: unknown;
          title: string;
        }) => {
          addListener: (event: string, callback: () => void) => void;
        };
        InfoWindow: new (options: { content: string }) => {
          open: (map: unknown, marker: unknown) => void;
        };
      };
    };
  }
}

export function ListingsMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const points = listings.filter((l) => l.coords);

  useEffect(() => {
    if (points.length === 0 || !mapRef.current) return;

    const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    if (!key) {
      setLoadError("Google Maps key is not configured.");
      return;
    }

    const trackingId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID;

    window.initListingsMap = () => {
      if (!window.google || !mapRef.current) return;

      const avgLat = points.reduce((s, l) => s + (l.coords as [number, number])[0], 0) / points.length;
      const avgLng = points.reduce((s, l) => s + (l.coords as [number, number])[1], 0) / points.length;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: avgLat, lng: avgLng },
        zoom: 10,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      const bounds = new window.google.maps.LatLngBounds();

      points.forEach((l) => {
        const [lat, lng] = l.coords as [number, number];
        const position = { lat, lng };
        const marker = new window.google.maps.Marker({
          position,
          map,
          title: l.title,
        });
        bounds.extend(position);

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="font-family: Inter, sans-serif; min-width: 180px;">
              <div style="font-weight: 700; font-size: 14px; color: #1a1a1a;">${l.title}</div>
              <div style="font-size: 12px; color: #666; margin-top: 4px;">${l.location}</div>
              ${l.price ? `<div style="font-size: 13px; font-weight: 600; color: #b8860b; margin-top: 6px;">${l.price}</div>` : ""}
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });

      map.fitBounds(bounds, 80);
    };

    const scriptId = "google-maps-listings-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=initListingsMap&channel=${trackingId}`;
      script.async = true;
      script.onerror = () => setLoadError("Google Maps failed to load.");
      document.body.appendChild(script);
    } else if (window.google && window.google.maps) {
      window.initListingsMap();
    }

    return () => {
      window.initListingsMap = undefined;
    };
  }, [points]);

  if (points.length === 0) return null;

  return (
    <div className="relative rounded-xl border border-gold/40 overflow-hidden shadow-elegant bg-card">
      {loadError ? (
        <div className="h-[420px] md:h-[520px] w-full grid place-items-center p-8 text-center">
          <div>
            <p className="font-semibold text-foreground">Map unavailable</p>
            <p className="mt-1 text-sm text-muted-foreground">{loadError}</p>
          </div>
        </div>
      ) : (
        <div
          ref={mapRef}
          title="Map of Los Angeles restaurant and real estate listings"
          className="h-[420px] md:h-[520px] w-full"
        />
      )}
    </div>
  );
}
