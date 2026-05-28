"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const videos = [
  { src: "/videos/video-dj-crowd1.mp4" },
  { src: "/videos/video-dj-crowd-2.mp4" },
  { src: "/videos/video-crowd.mp4" },
];

export default function VideoPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [hasError, setHasError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isPlayingRef.current) return;

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setShowCanvas(true);
    }

    video.src = videos[currentIndex].src;
    video.play().then(() => {
      setShowCanvas(false);
    }).catch(() => {
      setShowCanvas(false);
    });
  }, [currentIndex]);

  function handlePlay() {
    videoRef.current?.play();
    setIsPlaying(true);
    isPlayingRef.current = true;
  }

  function handlePrev() {
    setCurrentIndex((i) => (i - 1 + videos.length) % videos.length);
  }

  function handleNext() {
    setCurrentIndex((i) => (i + 1) % videos.length);
  }

  return (
    <section className="py-24 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold uppercase tracking-[0.15em]">
            Latest Video
          </h2>
          <div className="mt-3 flex justify-center">
            <img src="/bottom_line2.png" alt="" aria-hidden="true" width={450} />
          </div>
        </div>

        <div className="relative mx-auto max-w-5xl aspect-video">
          <div className="absolute left-0 top-0 z-10 h-10 w-10 bg-(--color-pink) [clip-path:polygon(0_0,100%_0,0_100%)]" />
          <div className="absolute bottom-0 right-0 z-10 h-10 w-10 bg-(--color-pink) [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
          {hasError ? (
            <img
              src="/images/novideo.png"
              alt="Video not available"
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                loop
                playsInline
                onPlay={() => { setIsPlaying(true); isPlayingRef.current = true; }}
                onPause={() => { setIsPlaying(false); isPlayingRef.current = false; }}
                onEnded={() => { setIsPlaying(false); isPlayingRef.current = false; }}
                onError={() => setHasError(true)}
              >
                <source src={videos[currentIndex].src} type="video/mp4" />
              </video>

              {/* Frozen frame canvas shown during src switch */}
              {showCanvas && (
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              {!showCanvas && (
                <button
                  type="button"
                  onClick={() => {
                    if (isPlaying) {
                      videoRef.current?.pause();
                    } else {
                      handlePlay();
                    }
                  }}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {!isPlaying && (
                    <>
                      <Image
                        src="/images/video_poster.jpg"
                        alt="Video poster"
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                      <img
                        src="/images/Play_btn.svg"
                        alt=""
                        aria-hidden="true"
                        className="relative z-10 h-20 w-20"
                      />
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous video"
            className="flex h-10 w-10 items-center justify-center border border-white/30 text-white transition-colors hover:border-(--color-pink) hover:text-(--color-pink) focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--color-pink)"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next video"
            className="flex h-10 w-10 items-center justify-center border border-white/30 text-white transition-colors hover:border-(--color-pink) hover:text-(--color-pink) focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--color-pink)"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
