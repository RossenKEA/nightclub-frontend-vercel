import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-[url('/images/footer-bg.png')] bg-cover bg-center text-white">
      <div className="relative mx-auto grid max-w-7xl gap-16 px-8 py-24 lg:grid-cols-3">
        <section className="text-center lg:text-left">
          <div className="mb-16">
            <h2 className="text-4xl font-black uppercase tracking-[0.15em]">
              Night<span className="text-(--color-pink)">Club</span>
            </h2>
            <p className="mt-3 text-xs uppercase tracking-[0.65em] text-white/80">
              Have a good time
            </p>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="mb-4 text-2xl font-bold uppercase tracking-wider text-(--color-pink)">
                Location
              </h3>
              <p className="font-bold">Kompagnistræde 278</p>
              <p className="font-bold">1265 København K</p>
            </div>

            <div>
              <h3 className="mb-4 text-2xl font-bold uppercase tracking-wider text-(--color-pink)">
                Opening Hours
              </h3>
              <p className="font-bold uppercase">Wed - Thu 10:30 PM to 3 AM</p>
              <p className="font-bold uppercase">Sat - Sun: 11 PM to 5 AM</p>
            </div>
          </div>
        </section>

        <section className="hidden lg:block">
          <h3 className="mb-14 text-2xl font-bold uppercase tracking-wider text-(--color-pink)">
            News
          </h3>

          <div className="space-y-12">
            <FooterNewsItem image="/images/footer-news-1.png" />
            <FooterNewsItem image="/images/footer-news-2.png" />
          </div>
        </section>

        <section className="hidden lg:block">
          <h3 className="mb-14 text-2xl font-bold uppercase tracking-wider text-(--color-pink)">
            Recent Posts
          </h3>

          <div className="space-y-14">
            <RecentPost />
            <RecentPost />
          </div>
        </section>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-8 pb-10 text-white/60 lg:flex-row">
        <p className="font-bold">Night Club - All Rights Reserved</p>

        <div className="text-center">
          <p className="mb-4 font-bold text-white">Stay Connected With Us</p>

          <div className="flex justify-center gap-6">
            <SocialLink label="Facebook" href="#">
              <FacebookIcon />
            </SocialLink>
            <SocialLink label="Snapchat" href="#">
              <SnapchatIcon />
            </SocialLink>
            <SocialLink label="Instagram" href="#">
              <InstagramIcon />
            </SocialLink>
          </div>
        </div>

        <p className="font-bold">Copyright © NightClub</p>
      </div>
    </footer>
  );
}

function FooterNewsItem({ image }: { image: string }) {
  return (
    <article className="flex gap-8">
      <img
        src={image}
        alt=""
        className="h-28 w-28 object-cover"
      />

      <div>
        <p className="max-w-xs text-lg font-medium leading-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting.
        </p>
        <p className="mt-4 font-bold text-(--color-pink)">April 17, 2026</p>
      </div>
    </article>
  );
}

function RecentPost() {
  return (
    <article className="flex gap-8">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 shrink-0 text-(--color-pink)">
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
        </svg>

      <div>
        <p className="max-w-sm text-lg font-medium leading-8">
          It is a long established fact that a reader will be distracted by the
          readable...
        </p>
        <p className="mt-4 font-bold text-pink-500">5 hours ago</p>
      </div>
    </article>
  );
}

function SocialLink({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center border-2 border-white text-white hover:border-(--color-pink) hover:text-(--color-pink)"
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function SnapchatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2C8.5 2 6 4.5 6 8v.5c-.5.2-1 .3-1.5.3-.3 0-.5.2-.5.5s.2.7.5.9c.5.2 1 .4 1.5.5.3.8.8 1.5 1.5 2-.7.4-1.5.6-2.3.6-.3 0-.5.2-.5.5 0 .5.8 1 2.3 1.3.1.3.2.6.4.8-.2.1-.4.1-.6.1-.5 0-1-.1-1.4-.3-.1 0-.2-.1-.3-.1-.3 0-.6.2-.6.5 0 .5.5 1 1.5 1.3 1 .3 2 .5 3 .5.8.6 1.8 1 2.9 1s2.1-.4 2.9-1c1 0 2-.2 3-.5 1-.3 1.5-.8 1.5-1.3 0-.3-.3-.5-.6-.5-.1 0-.2 0-.3.1-.4.2-.9.3-1.4.3-.2 0-.4 0-.6-.1.2-.2.3-.5.4-.8 1.5-.3 2.3-.8 2.3-1.3 0-.3-.2-.5-.5-.5-.8 0-1.6-.2-2.3-.6.7-.5 1.2-1.2 1.5-2 .5-.1 1-.3 1.5-.5.3-.2.5-.5.5-.9s-.2-.5-.5-.5c-.5 0-1-.1-1.5-.3V8c0-3.5-2.5-6-6-6z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}
