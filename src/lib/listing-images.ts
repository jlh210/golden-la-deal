import images from "@/content/listing-images.json";

/** Keep legacy URLs intact; use responsive copies only for rendered images. */
export function listingImageProps(source: string, sizes = "(max-width: 767px) 100vw, 640px") {
  const image = images[source as keyof typeof images];
  if (!image) return { src: source };
  const full = image.variants[image.variants.length - 1];
  return {
    src: full.url,
    srcSet: image.variants.map((v) => `${v.url} ${v.width}w`).join(", "),
    sizes,
    width: full.width,
    height: full.height,
  };
}
