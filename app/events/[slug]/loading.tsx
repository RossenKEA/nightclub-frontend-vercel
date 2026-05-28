export default function EventLoading() {
  return (
    <main className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <img
        src="/images/gif.gif"
        alt="Loading"
        className="max-h-[80vh] w-auto"
      />

      <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-(--color-pink)">
        Loading Event
      </p>
    </main>
  );
}