import Image from "next/image";

/**
 * An image well with a fixed aspect ratio, so nothing shifts while the photo
 * loads (CLS 0). When `src` is absent it renders a plain parchment field with
 * the slot's label — no frame, no pattern, nothing that would compete with a
 * real photograph once it lands.
 *
 * `elevated` applies the system's single drop-shadow. It belongs to product
 * renders resting on a surface, and to nothing else.
 */
export function ImageSlot({
  src,
  alt,
  placeholder,
  ratio = "4 / 3",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  elevated = false,
  radius = "lg",
  className = "",
}: {
  src?: string;
  alt?: string;
  placeholder: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  elevated?: boolean;
  radius?: "lg" | "sm" | "none";
  className?: string;
}) {
  const radiusClass =
    radius === "sm" ? "media-sm" : radius === "none" ? "media-square" : "";

  return (
    <div
      className={`media ${radiusClass} ${elevated ? "product-shadow" : ""} w-full min-w-0 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? placeholder}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="media-placeholder">{placeholder}</div>
      )}
    </div>
  );
}
