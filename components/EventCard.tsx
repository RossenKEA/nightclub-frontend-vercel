import { API_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export type Event = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  doorsOpen: string;
  location: string;
  asset: { url: string; alt: string };
};

type EventCardProps = {
  event: Event;
  variant?: "default" | "featured";
};

export default function EventCard({ event, variant = "default" }: EventCardProps) {
  const imageUrl = `${API_URL}${event.asset.url}`;
  const date = new Date(event.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const doorsOpen = new Date(event.doorsOpen).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (variant === "featured") {
    return (
      <Link href={`/events/${event.slug}`}>
        <article className="group relative overflow-hidden">
          <div className="relative h-80 w-full overflow-hidden">
            {/* Pink corner triangles */}
            <div className="absolute left-0 top-0 z-10 h-10 w-10 bg-(--color-pink) [clip-path:polygon(0_0,100%_0,0_100%)]" />
            <div className="absolute bottom-0 right-0 z-10 h-10 w-10 bg-(--color-pink) [clip-path:polygon(100%_0,100%_100%,0_100%)]" />

            <Image
              src={imageUrl}
              alt={event.asset.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            {/* Book Now — fader ind ved hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="bg-(--color-pink) px-8 py-3 font-bold uppercase tracking-widest text-white">
                Book Now
              </span>
            </div>

            {/* Tekst overlay — glider op fra bunden ved hover */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/85 p-5 transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="mb-2 font-bold uppercase tracking-wider text-white">
                {event.title}
              </h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-white/80">
                {event.excerpt}
              </p>
            </div>
          </div>

          {/* Pink info bar */}
          <div className="flex items-center justify-between bg-(--color-pink) px-4 py-3 text-white">
            <h3 className="text-sm font-bold normal-case tracking-normal">
              {event.title}
            </h3>

            <span className="text-sm font-normal normal-case tracking-normal">
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              ·{" "}
              {new Date(event.doorsOpen).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/events/${event.slug}`}>
      <article className="group border border-white/10 rounded-xl overflow-hidden transition-colors hover:border-pink-500/50">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={event.asset.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold uppercase tracking-wider">
            {event.title}
          </h2>

          <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1 text-sm font-bold uppercase tracking-wider text-(--color-pink)">
            <span>{date}</span>
            <span>Doors: {doorsOpen}</span>
            <span>{event.location}</span>
          </div>

          <p className="mb-6 text-white/70">{event.excerpt}</p>

          <div className="flex justify-center md:justify-start">
            <span className="border-y border-white px-6 py-2 text-sm font-bold uppercase tracking-widest transition-colors group-hover:text-(--color-pink)">
              Read More
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}