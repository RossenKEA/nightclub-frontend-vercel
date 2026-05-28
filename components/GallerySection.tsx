"use client";

import Image from "next/image";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type GalleryItem = {
  id: number;
  description: string;
  asset: {
    url: string;
    alt: string;
  };
};

type GallerySectionProps = {
  gallery: GalleryItem[];
};

export default function GallerySection({ gallery }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = activeIndex !== null ? gallery[activeIndex] : null;

  function closeLightbox() {
    setActiveIndex(null);
  }

  function showPrevious() {
    if (activeIndex === null) return;
    setActiveIndex(activeIndex === 0 ? gallery.length - 1 : activeIndex - 1);
  }

  function showNext() {
    if (activeIndex === null) return;
    setActiveIndex(activeIndex === gallery.length - 1 ? 0 : activeIndex + 1);
  }

  return (
    <section className="py-24">
      <div className="mx-auto mb-14 max-w-7xl px-6 text-center">
        <h2 className="text-4xl font-bold uppercase tracking-[0.15em]">
          Night Club Gallery
        </h2>
        <div className="mt-3 flex justify-center">
            <img src="/bottom_line2.png" alt="" aria-hidden="true" width={450} />
        </div>
      </div>

      {[
        { items: [...gallery, ...gallery], trackClass: "gallery-track", mt: "" },
        { items: [...gallery, ...gallery], trackClass: "gallery-track-reverse", mt: "mt-4" },
      ].map(({ items, trackClass, mt }, rowIndex) => (
        <div key={rowIndex} className={`overflow-x-clip ${mt}`}>
          <div className={trackClass}>
            {items.map((item, index) => (
              <div
                key={index}
                className="relative mr-4 shrink-0"
                style={{ width: "320px", height: "256px" }}
              >
                <Image
                  src={`${API_URL}${item.asset.url}`}
                  alt={item.asset.alt}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <button
                  type="button"
                  onClick={() => setActiveIndex(index % gallery.length)}
                  className="absolute inset-0 bg-black/0 transition duration-500 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-(--color-pink)"
                  aria-label={item.asset.alt}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {activeItem && activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95">
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-8 top-8 z-10 text-4xl font-bold text-white transition-colors hover:text-(--color-pink)"
            aria-label="Close"
          >
            ×
          </button>

          {/* Three-image carousel */}
          <div className="flex w-full items-center justify-center">
            {/* Prev image */}
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous image"
              className="relative hidden h-64 w-44 shrink-0 overflow-hidden opacity-40 transition hover:opacity-60 md:block"
            >
              <Image
                src={`${API_URL}${gallery[(activeIndex - 1 + gallery.length) % gallery.length].asset.url}`}
                alt=""
                fill
                className="object-cover"
                sizes="176px"
              />
              <span className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white">
                ‹
              </span>
            </button>

            {/* Active image */}
            <div className="relative mx-4 h-[420px] w-full max-w-2xl shrink-0 overflow-hidden">
              <Image
                src={`${API_URL}${activeItem.asset.url}`}
                alt={activeItem.asset.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
              {/* Pink corner triangle bottom-right */}
              <div className="absolute bottom-0 right-0 h-10 w-10 bg-(--color-pink) [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
            </div>

            {/* Next image */}
            <button
              type="button"
              onClick={showNext}
              aria-label="Next image"
              className="relative hidden h-64 w-44 shrink-0 overflow-hidden opacity-40 transition hover:opacity-60 md:block"
            >
              <Image
                src={`${API_URL}${gallery[(activeIndex + 1) % gallery.length].asset.url}`}
                alt=""
                fill
                className="object-cover"
                sizes="176px"
              />
              <span className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white">
                ›
              </span>
            </button>
          </div>

          {/* Info section */}
          <div className="mx-auto mt-6 w-full max-w-2xl px-6">
            <h3 className="text-xl font-bold uppercase tracking-wider text-white">
              Night Club Party
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              There are many variations of passages of Lorem Ipsum available, but the majority have
              suffered alteration in some form, by injected humour, or randomised words which
              don&apos;t look even slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn&apos;t anything embarrassing hidden in the middle
              of text.
            </p>
            <div className="mt-4 flex justify-end">
              <span className="border-t border-white pt-2 text-sm font-bold uppercase tracking-widest text-white">
                Read More
              </span>
            </div>
          </div>

          {/* Mobile nav buttons */}
          <div className="mt-6 flex gap-6 md:hidden">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous image"
              className="flex h-10 w-10 items-center justify-center border border-white/30 text-2xl text-white hover:border-(--color-pink) hover:text-(--color-pink)"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next image"
              className="flex h-10 w-10 items-center justify-center border border-white/30 text-2xl text-white hover:border-(--color-pink) hover:text-(--color-pink)"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
