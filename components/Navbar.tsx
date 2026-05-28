"use client";

import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/book-table", label: "Book Table" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  function closeMenu() {
    (menuRef.current as HTMLElement & { hidePopover(): void })?.hidePopover();
  }

  return (
    <header className="relative border border-(--color-pink) bg-black">
      <div className="absolute left-0 top-0 h-8 w-16 bg-(--color-pink) [clip-path:polygon(0_0,100%_0,55%_100%,0_100%)]" />
      <div className="absolute bottom-0 right-0 h-8 w-16 bg-(--color-pink) [clip-path:polygon(45%_0,100%_0,100%_100%,0_100%)]" />

      <nav className="mx-auto flex h-28 max-w-7xl items-center justify-between px-6 md:h-24 md:px-8">
        <Link href="/" className="relative z-10 leading-none">
          <img
            src="/images/Logo_main.svg"
            alt="NightClub"
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-12 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative text-lg font-bold uppercase tracking-wider ${
                  isActive ? "text-(--color-pink)" : "text-white"
                }`}
              >
                {isActive ? (
                  <>
                    {item.label}
                    <span className="absolute -bottom-6 left-1/2 h-[3px] w-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-(--color-pink) to-transparent blur-[0.5px]" />
                  </>
                ) : (
                  <span className="relative block overflow-hidden">
                    <span className="flex">
                      {item.label.split("").map((char, i) => (
                        <span
                          key={i}
                          className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full"
                          style={{ transitionDelay: `${i * 30}ms` }}
                        >
                          {char === " " ? " " : char}
                        </span>
                      ))}
                    </span>
                    <span className="absolute top-0 left-0 flex text-(--color-pink)">
                      {item.label.split("").map((char, i) => (
                        <span
                          key={i}
                          className="inline-block translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"
                          style={{ transitionDelay: `${i * 30}ms` }}
                        >
                          {char === " " ? " " : char}
                        </span>
                      ))}
                    </span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile burger - Popover API */}
        <button
          popoverTarget="mobile-menu"
          className="relative z-10 flex flex-col gap-2 md:hidden"
          aria-label="Open menu"
        >
          <span className="h-1 w-12 rounded bg-white" />
          <span className="h-1 w-12 rounded bg-white" />
          <span className="h-1 w-12 rounded bg-white" />
        </button>

        <div
          ref={menuRef}
          id="mobile-menu"
          popover="auto"
          className="m-0 h-screen w-screen flex-col items-center justify-center bg-transparent backdrop:bg-black/85 [&:popover-open]:flex md:hidden"
        >
          <button
            type="button"
            onClick={closeMenu}
            className="absolute right-6 top-6 text-4xl font-bold leading-none text-white transition-colors hover:text-(--color-pink)"
            aria-label="Close menu"
          >
            ×
          </button>

          <div className="flex flex-col items-center gap-10">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`text-2xl font-bold uppercase tracking-[0.2em] transition-colors hover:text-(--color-pink) ${
                    isActive ? "text-(--color-pink)" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}