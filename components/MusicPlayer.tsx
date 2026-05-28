"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/api";

const tracks = [
  {
    id: 1,
    title: "Euphoria",
    artist: "Night Club",
    src: "/audio/euphoria.mp3",
    imagePath: "/file-bucket/gallery5_big.jpg",
    imageAlt: "Guitarist on dark club stage",
  },
  {
    id: 2,
    title: "Fashion Red Tape",
    artist: "Night Club",
    src: "/audio/fashion-red-tape.mp3",
    imagePath: "/file-bucket/gallery3_big.jpg",
    imageAlt: "Female singer under blue and pink lights",
  },
  {
    id: 3,
    title: "Black Box Funky",
    artist: "Night Club",
    src: "/audio/black-box-funky.mp3",
    imagePath: "/file-bucket/gallery8_big.jpg",
    imageAlt: "Saxophonist under blue stage lights",
  },
];

const displayTracks = [...tracks, tracks[0], tracks[1]];

function formatTime(secs: number) {
  if (!isFinite(secs) || isNaN(secs)) return "00:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldAutoPlayRef = useRef(false);

  const currentTrack = tracks[currentIndex];
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    setDuration(0);
    audio.load();
    if (shouldAutoPlayRef.current) {
      audio.play().catch(() => {});
    }
  }, [currentIndex]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  function getNextIndex(from: number) {
    if (isShuffle) {
      let next = from;
      while (next === from && tracks.length > 1) {
        next = Math.floor(Math.random() * tracks.length);
      }
      return next;
    }
    return (from + 1) % tracks.length;
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      shouldAutoPlayRef.current = true;
      audio.play().catch(() => {});
    }
  }

  function handlePrev() {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    shouldAutoPlayRef.current = isPlaying;
    setCurrentIndex((i) => (i - 1 + tracks.length) % tracks.length);
  }

  function handleNext() {
    shouldAutoPlayRef.current = isPlaying;
    setCurrentIndex((i) => getNextIndex(i));
  }

  function handleTrackEnd() {
    shouldAutoPlayRef.current = true;
    setCurrentIndex((i) => getNextIndex(i));
  }

  function selectTrack(index: number) {
    if (index === currentIndex) {
      togglePlay();
      return;
    }
    shouldAutoPlayRef.current = true;
    setCurrentIndex(index);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    const value = Number(e.target.value);
    if (audio) audio.currentTime = value;
    setCurrentTime(value);
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          e.currentTarget.volume = volume;
        }}
        onEnded={handleTrackEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={currentTrack.src} type="audio/mpeg" />
      </audio>

      {/* Title */}
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold uppercase tracking-[0.15em]">
          Night Club Track
        </h2>
        <div className="mt-3 flex justify-center">
            <img src="/bottom_line2.png" alt="" aria-hidden="true" width={450} />
          </div>
      </div>

      {/* Main player */}
      <div className="flex flex-col gap-0 lg:flex-row lg:items-stretch">
        {/* Artist image — hidden on mobile, shown on desktop */}
        <div className="relative hidden h-72 w-72 shrink-0 overflow-hidden lg:block">
          <Image
            src={`${API_URL}${currentTrack.imagePath}`}
            alt={currentTrack.imageAlt}
            fill
            className="object-cover"
            sizes="288px"
          />
          <div className="absolute left-0 top-0 z-10 h-10 w-10 bg-(--color-pink) [clip-path:polygon(0_0,100%_0,0_100%)]" />
          <div className="absolute bottom-0 right-0 z-10 h-10 w-10 bg-(--color-pink) [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
        </div>

        {/* Controls */}
        <div className="flex flex-1 flex-col justify-center gap-7 bg-black px-8">
          <h3 className="text-center text-sm font-bold uppercase tracking-wide text-white lg:text-left">
            {currentTrack.title}
          </h3>

          {/* Progress bar */}
          <div className="relative h-1 w-full bg-(--color-pink)">
            <div
              className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white"
              style={{ left: `calc(${progressPercent}% - 8px)` }}
            />

            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="Seek"
            />
          </div>

          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <span className="text-xs font-bold text-white lg:w-28">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex items-center gap-5">
              <button type="button" onClick={handlePrev} aria-label="Previous">
                <SkipPrevIcon />
              </button>

              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white text-white"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <button type="button" onClick={handleNext} aria-label="Next">
                <SkipNextIcon />
              </button>

              <button
                type="button"
                onClick={() => setIsShuffle((s) => !s)}
                aria-label="Toggle shuffle"
                aria-pressed={isShuffle}
                className={isShuffle ? "text-(--color-pink)" : "text-white"}
              >
                <ShuffleIcon />
              </button>
            </div>

            <div className="flex w-36 items-center gap-3 text-white">
              <VolumeIcon />

              <div className="relative h-1 flex-1 bg-(--color-pink)">
                <div
                  className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white"
                  style={{ left: `calc(${volume * 100}% - 6px)` }}
                />

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track gallery — mobile: single large image; desktop: thumbnails row */}
      <div className="mt-0">
        {/* Mobile single-image view */}
        <div className="lg:hidden">
          <div className="relative w-full overflow-hidden aspect-video">
            <Image
              src={`${API_URL}${tracks[currentIndex].imagePath}`}
              alt={tracks[currentIndex].imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute left-0 top-0 z-10 h-10 w-10 bg-(--color-pink) [clip-path:polygon(0_0,100%_0,0_100%)]" />
            <div className="absolute bottom-0 right-0 z-10 h-10 w-10 bg-(--color-pink) [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-(--color-pink) text-(--color-pink)">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </div>
            </button>
          </div>
          <p className="mt-3 text-center text-sm font-bold uppercase tracking-wider text-white">
            {tracks[currentIndex].title}
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous track"
              className="flex h-10 w-10 items-center justify-center border border-white/30 text-2xl text-white transition-colors hover:border-(--color-pink) hover:text-(--color-pink)"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next track"
              className="flex h-10 w-10 items-center justify-center border border-white/30 text-2xl text-white transition-colors hover:border-(--color-pink) hover:text-(--color-pink)"
            >
              ›
            </button>
          </div>
        </div>

        {/* Desktop thumbnails row */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous track"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/30 text-2xl text-white transition-colors hover:border-(--color-pink) hover:text-(--color-pink) focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--color-pink)"
          >
            ‹
          </button>

          <div className="flex flex-1 gap-2 overflow-hidden">
            {displayTracks.map((track, index) => {
              const trackIndex = index % tracks.length;
              const isActive = trackIndex === currentIndex;
              return (
                <button
                  key={`${track.id}-${index}`}
                  type="button"
                  onClick={() => selectTrack(trackIndex)}
                  aria-label={`Play ${track.title}`}
                  className={`group relative aspect-square flex-1 min-w-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--color-pink) ${
                    isActive ? "ring-1 ring-inset ring-(--color-pink)" : ""
                  }`}
                >
                  <Image
                    src={`${API_URL}${track.imagePath}`}
                    alt={track.imageAlt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="20vw"
                  />
                  <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/50" />
                  {isActive && (
                    <>
                      <div className="absolute left-0 top-0 z-10 h-8 w-8 bg-(--color-pink) [clip-path:polygon(0_0,100%_0,0_100%)]" />
                      <div className="absolute bottom-0 right-0 z-10 h-8 w-8 bg-(--color-pink) [clip-path:polygon(100%_0,100%_100%,0_100%)]" />

                      <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-(--color-pink) text-(--color-pink)">
                          {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </div>
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next track"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/30 text-2xl text-white transition-colors hover:border-(--color-pink) hover:text-(--color-pink) focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--color-pink)"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function SkipPrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
    </svg>
  );
}

function SkipNextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10" transform="scale(-1,1)">
      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
    </svg>
  );
}

function ShuffleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
      <path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
    </svg>
  );
}
