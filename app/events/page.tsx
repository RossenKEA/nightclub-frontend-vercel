import Link from "next/link";
import Image from "next/image";
import { API_URL, getEvents } from "@/lib/api";
import PageHero from "@/components/PageHero";

type SearchParams = Promise<{
  page?: string;
}>;

export default async function EventsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;
  const eventsPerPage = 3;

  const events = await getEvents();

  const totalPages = Math.ceil(events.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = events.slice(startIndex, startIndex + eventsPerPage);

  return (
    <main className="bg-black text-white">
      <PageHero title="Events" />

      <section className="mx-auto max-w-7xl px-0 py-16">
        <div className="grid">
          {paginatedEvents.map((event: any, index: number) => (
            <EventRow
              key={event.id}
              event={event}
              reversed={index % 2 === 1}
            />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </section>
    </main>
  );
}

function EventRow({
  event,
  reversed,
}: {
  event: any;
  reversed: boolean;
}) {
  const imageUrl = `${API_URL}${event.asset.url}`;

  return (
    <article className="grid md:grid-cols-2">
      <div
        className={`relative ${reversed ? "md:order-2" : ""}`}
        style={{ height: "360px" }}
      >
        <Image
          src={imageUrl}
          alt={event.asset.alt}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center bg-black px-8 py-8 md:px-12">
        <h2 className="mb-3 text-xl font-bold uppercase tracking-wide">
          {event.title}
        </h2>

        <p className="mb-4 text-sm font-bold uppercase">
          <span className="text-(--color-pink)">
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            -{" "}
            {new Date(event.date).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>{" "}
          <span className="text-white/70">|</span>{" "}
          <span>{event.location}</span>
        </p>

        <p className="mb-8 max-w-xl text-sm leading-6 text-white/80">
          {event.excerpt}
        </p>

        <Link
          href={`/events/${event.slug}`}
          className="self-center md:self-end inline-block border-y border-white px-10 py-3 text-sm font-bold uppercase tracking-wider hover:text-(--color-pink)"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <nav className="mt-16 flex justify-center gap-4 text-sm font-bold">
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;

        return (
          <Link
            key={pageNumber}
            href={`/events?page=${pageNumber}`}
            className={pageNumber === currentPage ? "text-(--color-pink)" : "text-white"}
          >
            {pageNumber}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link href={`/events?page=${currentPage + 1}`}>næste &gt;</Link>
      )}
    </nav>
  );
}