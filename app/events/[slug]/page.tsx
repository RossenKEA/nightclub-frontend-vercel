import Image from "next/image";
import Link from "next/link";
import { API_URL, getEvent } from "@/lib/api";
import { getComments } from "@/lib/api";
import CommentForm from "@/components/CommentForm";
import PageHero from "@/components/PageHero";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);
  const heroImageUrl = `${API_URL}${event.heroAsset.url}`;
  const comments = await getComments(event.id.toString());

  const eventDate = new Date(event.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const doorsOpen = new Date(event.doorsOpen).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <main className="bg-black text-white">
      {/* Top title banner */}
      <PageHero title={event.title || event.name || "Event"} />

      <section className="mx-auto max-w-5xl px-6 py-16">
        {/* Main image */}
        <div className="relative mb-12 h-[420px] w-full overflow-hidden">
  <Image
    src={heroImageUrl}
    alt={event.heroAsset.alt}
    fill
    className="object-cover"
  />
</div>

        {/* Event info grid */}
        <div className="grid grid-cols-2 gap-y-8 border-b border-white/40 pb-10 text-center md:grid-cols-4">
          <Info label="Date:" value={eventDate} />
          <Info label="Doors Open:" value={doorsOpen} />
          <Info label="Location:" value={event.location} />
          <Info label="Category:" value={event.category} />
          <div className="col-span-2 flex justify-center gap-35 md:col-span-4">
            <Info label="Age Limit:" value={event.ageLimit} />
            <Info label="Entrance:" value={`${event.price}`} />
          </div>
        </div>

        {/* Lineup */}
        <section className="py-20 text-center">
          <SectionTitle>Line Up</SectionTitle>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-2xl font-bold uppercase tracking-[0.15em] text-(--color-pink)">
            {event.lineup?.map((artist: string, index: number) => (
              <span key={artist}>
                {artist}
                {index < event.lineup.length - 1 && (
                  <span className="ml-4 text-white">|</span>
                )}
              </span>
            ))}
          </div>
        </section>

        {/* Program */}
        <section className="mb-20 text-center">
          <SectionTitle>Program</SectionTitle>

          <div className="mx-auto mt-10 max-w-2xl rounded-lg border border-(--color-pink) p-8 text-left">
            {event.schedule?.map((item: any) => (
              <div
                key={`${item.time}-${item.title}`}
                className="grid grid-cols-[80px_1fr] gap-6 border-b border-white/20 py-5 last:border-b-0"
              >
                <span className="text-xl font-bold">{item.time}</span>
                <span className="text-xl font-bold uppercase tracking-widest">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Description */}
        <section className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 text-3xl font-bold">
            Welcome to {event.title || event.name}
          </h2>

          <p className="leading-7 text-white/80">{event.description}</p>

          <Link
            href={`/book-table?eventId=${event.id}`}
            className="mt-12 inline-block border-y border-white px-8 py-4 font-bold uppercase tracking-widest hover:text-(--color-pink)"
          >
            Book Now
          </Link>
        </section>

        <section className="mt-24">
  <h2 className="mb-10 text-3xl font-bold uppercase">
    {comments.length} Comments
  </h2>

  <div className="space-y-8">
    {comments.map((comment: any) => (
      <article
        key={comment.id}
        className="border-b border-white/10 pb-6"
      >
        <div className="mb-2 flex items-center gap-3">
          <h3 className="font-bold">
            {comment.name}
          </h3>

          <span className="text-sm text-(--color-pink)">
            {new Date(comment.date).toLocaleDateString()}
          </span>
        </div>

        <p className="text-white/80">
          {comment.content}
        </p>
      </article>
    ))}
  </div>

  <CommentForm eventId={event.id} />
  </section>
  </section>
  </main>
  );
}

function Info({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div>
      <h3 className="font-bold uppercase text-(--color-pink)">{label}</h3>
      <p>{value}</p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="inline-block border-b border-white pb-2 text-3xl font-bold uppercase tracking-[0.15em]">
      {children}
    </h2>
  );
}