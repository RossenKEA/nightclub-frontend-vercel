import { getEvents, getTestimonials } from "@/lib/api";
import FeaturedEventsSlider from "@/components/FeaturedEventsSlider";
import NewsletterForm from "@/components/NewsletterForm";
import Hero from "@/components/Hero";
import GallerySectionServer from "@/components/GallerySectionServer";
import MusicPlayer from "@/components/MusicPlayer";
import VideoPlayer from "@/components/VideoPlayer";
import TestimonialsSlideshow from "@/components/TestimonialsSlideshow";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const [events, testimonials] = await Promise.all([
    getEvents(),
    getTestimonials(),
  ]);

  return (
  <main>
      <Hero />
  <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-20">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold uppercase tracking-[0.15em]">
            Welcome In Nightclub
          </h2>
          <div className="mt-3 flex justify-center">
            <img src="/bottom_line2.png" alt="" aria-hidden="true" width={450} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {["/images/thumb1.jpg", "/images/reastaurant_1.jpg", "/images/thumb2.jpg"].map((src) => (
            <div key={src} className="group relative h-72 overflow-hidden border border-white/10 md:h-112">
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Pink corner triangles */}
              <div className="absolute left-0 top-0 h-12 w-12 bg-(--color-pink) [clip-path:polygon(0_0,100%_0,0_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 right-0 h-12 w-12 bg-(--color-pink) [clip-path:polygon(100%_0,100%_100%,0_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Text — fades in from right */}
              <div className="absolute inset-0 flex translate-x-8 flex-col items-center justify-center px-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <h3 className="mb-4 text-xl font-bold uppercase tracking-wider text-white">
                  Night Club
                </h3>
                <p className="text-center text-sm leading-relaxed text-white/80">
                  There are many variations of passages of Lorem Ipsum available, but the majority
                  have suffered alteration in some form, by injected humour, or randomised words
                  which don&apos;t look even slightly believable.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[url('/images/bgpurple.png')] bg-cover bg-center px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold uppercase tracking-[0.15em]">
            Featured Events
          </h2>
          <div className="mt-3 flex justify-center">
            <img src="/bottom_line2.png" alt="" aria-hidden="true" width={450} />
          </div>
        </div>

        <FeaturedEventsSlider events={events} />
        </div>
      </section>

      <GallerySectionServer />

      <MusicPlayer />

      <VideoPlayer />

      <TestimonialsSlideshow testimonials={testimonials} />

      <section className="px-6 py-20 text-center">
  <h2 className="mb-6 text-3xl font-bold uppercase tracking-wider">
    Want The Latest Night Club News
  </h2>

  <p className="mx-auto mb-8 max-w-xl text-white/70">
    Subscribe to our newsletter and never miss an <span className="text-(--color-pink)">Event</span>
  </p>

  <NewsletterForm />
      </section>
  </main>
  );
}