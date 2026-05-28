"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import type { Event } from "@/lib/types";

export default function FeaturedEventsSlider({ events }: { events: Event[] }) {
  const [index, setIndex] = useState(0);

  if (events.length === 0) return null;

  // Desktop shows 2 at a time; mobile shows 1
  const desktopPages = Math.ceil(events.length / 2);
  const mobilePages = events.length;

  function prev() {
    setIndex((i) => (i - 1 + mobilePages) % mobilePages);
  }

  function next() {
    setIndex((i) => (i + 1) % mobilePages);
  }

  // Which two events to show on desktop (pairs)
  const desktopPageIndex = Math.floor(index / 2);
  const desktopSlice = events.slice(desktopPageIndex * 2, desktopPageIndex * 2 + 2);

  // Which single event on mobile
  const mobileEvent = events[index];

  return (
    <div>
      {/* Mobile: one card + nav */}
      <div className="lg:hidden">
        <EventCard event={mobileEvent} variant="featured" />
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous event"
            className="flex h-10 w-10 items-center justify-center border border-white/30 text-2xl text-white transition-colors hover:border-(--color-pink) hover:text-(--color-pink)"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {events.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to event ${i + 1}`}
                className={`h-3 w-3 transition-colors ${i === index ? "bg-(--color-pink)" : "bg-white/30"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next event"
            className="flex h-10 w-10 items-center justify-center border border-white/30 text-2xl text-white transition-colors hover:border-(--color-pink) hover:text-(--color-pink)"
          >
            ›
          </button>
        </div>
      </div>

      {/* Desktop: two cards side by side + nav */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 gap-6">
          {desktopSlice.map((event) => (
            <EventCard key={event.id} event={event} variant="featured" />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 2))}
            aria-label="Previous events"
            className="flex h-10 w-10 items-center justify-center border border-white/30 text-2xl text-white transition-colors hover:border-(--color-pink) hover:text-(--color-pink)"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {Array.from({ length: desktopPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i * 2)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-3 w-3 transition-colors ${desktopPageIndex === i ? "bg-(--color-pink)" : "bg-white/30"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min((desktopPages - 1) * 2, i + 2))}
            aria-label="Next events"
            className="flex h-10 w-10 items-center justify-center border border-white/30 text-2xl text-white transition-colors hover:border-(--color-pink) hover:text-(--color-pink)"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
