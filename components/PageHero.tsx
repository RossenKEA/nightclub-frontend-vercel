type PageHeroProps = {
  title: string;
};

export default function PageHero({ title }: PageHeroProps) {
  return (
    <section className="relative flex h-40 items-center justify-center bg-[url('/images/footer-bg.png')] bg-cover bg-center">
      <div className="absolute inset-0" />

        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-[0.2em]">
            {title}
          </h1>

          <div className="mt-4 flex justify-center">
            <img src="/bottom_line2.png" alt="" aria-hidden="true" width={450} />
          </div>
      </div>
    </section>
  );
}