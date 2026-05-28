"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
];

export default function Hero() {
  const [selectedImage, setSelectedImage] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const randomImage =
      heroImages[Math.floor(Math.random() * heroImages.length)];

    setSelectedImage(randomImage);

    const timer = setTimeout(() => {
      setHeroVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden">
        {selectedImage && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${selectedImage})`,
              opacity: heroVisible ? 1 : 0,
            }}
          />
        )}
        <div
          className="absolute inset-0 bg-black/45 transition-opacity duration-1000"
          style={{ opacity: heroVisible ? 1 : 0 }}
        />

        <div className="relative z-10 text-center">
          <img
            src="/images/Logo.svg"
            alt="NightClub"
            className={`mx-auto w-[420px] max-w-[90vw] md:w-[600px] ${
              heroVisible ? "animate-drop-bounce" : "opacity-0"
            }`}
          />

          <p
            className="mt-3 text-lg uppercase tracking-[0.9em] text-white transition-all duration-700"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(-20px)",
              transitionDelay: heroVisible ? "400ms" : "0ms",
            }}
          >
            Have a good time
          </p>

          <div
            className="my-8 flex justify-center transition-all duration-700"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(-20px)",
              transitionDelay: heroVisible ? "580ms" : "0ms",
            }}
          >
            <img src="/bottom_line.png" alt="" aria-hidden="true" width={682} />
          </div>

          <div
            className="flex justify-center gap-4 transition-all duration-500"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: heroVisible ? "780ms" : "0ms",
            }}
          >
            <Link
              href="/events"
              className="border border-white px-6 py-3 text-sm font-bold uppercase hover:border-(--color-pink) hover:text-(--color-pink)"
            >
              View Events
            </Link>

            <Link
              href="/book-table"
              className="bg-gradient-to-r from-(--color-pink) to-purple-600 px-8 py-3 text-sm font-bold uppercase text-white shadow-[0_0_18px_rgba(168,85,247,0.5)] transition-all duration-300 hover:from-purple-600 hover:to-purple-600 hover:shadow-[0_0_28px_rgba(168,85,247,0.8)]"
            >
              Book Table
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}