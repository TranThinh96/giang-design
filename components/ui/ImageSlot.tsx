import Image from "next/image";
import { Blueprint } from "./Blueprint";

/**
 * A framed image well with a fixed aspect ratio, so nothing shifts while the
 * photo loads (CLS 0). When `src` is absent it renders the blueprint
 * placeholder the design already accounts for — which is the current state of
 * every slot, since the artifact's photography belonged to a third party.
 */
export function ImageSlot({
  src,
  alt,
  placeholder,
  ratio = "4 / 3",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  className = "",
}: {
  src?: string;
  alt?: string;
  placeholder: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Blueprint
      className={`w-full min-w-0 overflow-hidden ${className}`}
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
        <div
          className="grid h-full w-full place-items-center px-4 text-center"
          style={{
            background:
              "repeating-linear-gradient(135deg, var(--color-surface) 0 6px, color-mix(in srgb, var(--color-text) 4%, var(--color-surface)) 6px 12px)",
          }}
        >
          <span className="ink-50 text-[12px] leading-snug">{placeholder}</span>
        </div>
      )}
    </Blueprint>
  );
}
