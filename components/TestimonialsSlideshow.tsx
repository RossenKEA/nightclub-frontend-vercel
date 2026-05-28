"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/api";


type Testimonial = {
  id: number;
  name: string;
  content: string;
  asset: { url: string; width: number; height: number; alt: string };
  facebook: string;
  twitter: string;
  snapchat: string;
};

export default function TestimonialsSlideshow({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startInterval() {
    intervalRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % testimonials.length);
    }, 5000);
  }

  useEffect(() => {
    if (testimonials.length === 0) return;
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials.length]);

  function goTo(index: number) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrent(index);
    startInterval();
  }

  if (testimonials.length === 0) return null;

  const t = testimonials[current];

  return (
    <section className="bg-[url('/images/footer-bg.png')] bg-cover bg-center py-24">
      <div className="flex flex-col items-center text-center">
        {/* Profile image — square, like the design */}
        <div className="relative mb-6 h-40 w-40 overflow-hidden">
          <Image
            src={`${API_URL}${t.asset.url}`}
            alt={t.asset.alt}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>

        {/* Name */}
        <p className="mb-4 text-sm font-bold uppercase tracking-wider">
          {t.name}
        </p>

        {/* Content */}
        <p className="mx-auto mb-8 max-w-2xl text-white/70 leading-relaxed">
          {t.content}
        </p>

        {/* Social icons */}
        <div className="mb-8 flex gap-3">
          {t.facebook && (
            <a
              href={t.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center border border-white/30 transition-colors hover:border-(--color-pink) hover:text-(--color-pink)"
            >
              <FacebookIcon />
            </a>
          )}
          {t.twitter && (
            <a
              href={t.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="flex h-10 w-10 items-center justify-center border border-white/30 transition-colors hover:border-(--color-pink) hover:text-(--color-pink)"
            >
              <TwitterIcon />
            </a>
          )}
            <a
              href={t.snapchat || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Snapchat"
              className="flex h-10 w-10 items-center justify-center border border-white/30 transition-colors hover:border-(--color-pink) hover:text-(--color-pink)"
            >
              <SnapchatIcon />
            </a>
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-3 w-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--color-pink) ${
                i === current ? "bg-(--color-pink)" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function SnapchatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2C8.5 2 6 4.5 6 8v.5c-.5.2-1 .3-1.5.3-.3 0-.5.2-.5.5s.2.7.5.9c.5.2 1 .4 1.5.5.3.8.8 1.5 1.5 2-.7.4-1.5.6-2.3.6-.3 0-.5.2-.5.5 0 .5.8 1 2.3 1.3.1.3.2.6.4.8-.2.1-.4.1-.6.1-.5 0-1-.1-1.4-.3-.1 0-.2-.1-.3-.1-.3 0-.6.2-.6.5 0 .5.5 1 1.5 1.3 1 .3 2 .5 3 .5.8.6 1.8 1 2.9 1s2.1-.4 2.9-1c1 0 2-.2 3-.5 1-.3 1.5-.8 1.5-1.3 0-.3-.3-.5-.6-.5-.1 0-.2 0-.3.1-.4.2-.9.3-1.4.3-.2 0-.4 0-.6-.1.2-.2.3-.5.4-.8 1.5-.3 2.3-.8 2.3-1.3 0-.3-.2-.5-.5-.5-.8 0-1.6-.2-2.3-.6.7-.5 1.2-1.2 1.5-2 .5-.1 1-.3 1.5-.5.3-.2.5-.5.5-.9s-.2-.5-.5-.5c-.5 0-1-.1-1.5-.3V8c0-3.5-2.5-6-6-6z" />
    </svg>
  );
}
