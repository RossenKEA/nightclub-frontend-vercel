"use client";

export default function EventsError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
      <div>
        <h1 className="mb-4 text-4xl font-bold uppercase tracking-wider text-(--color-pink)">
          Could not load events
        </h1>

        <p className="mx-auto mb-8 max-w-md text-white/70">
          Something went wrong while loading the events page.
        </p>

        <button
          type="button"
          onClick={reset}
          className="border-y border-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:text-(--color-pink)"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}