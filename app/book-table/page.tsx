import { getEvents } from "@/lib/api";
import BookingForm from "@/components/BookingForm";
import PageHero from "@/components/PageHero";

export default async function BookTablePage() {
  const events = await getEvents();

  return (
    <main className="bg-black text-white">
      <PageHero title="Book Table" />

      <BookingForm events={events} />
    </main>
  );
}