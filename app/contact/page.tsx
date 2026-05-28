import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
  return (
    <main className="bg-black text-white">
      <PageHero title="Contact us" />

      <section className="mx-auto max-w-xl px-6 py-24">
        <ContactForm />
      </section>
    </main>
  );
}