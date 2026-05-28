import type { Event } from "./types";

export const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://nightclub-491m.onrender.com";

if (!API_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL");
}

export async function getEvents(): Promise<Event[]> {
    const res = await fetch(`${API_URL}/events`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Could not fetch events");
    }

    return res.json();
}

export async function getEvent(slug: string): Promise<Event> {
    const events = await getEvents();

    const event = events.find((event) => event.slug === slug);

    if (!event) {
        throw new Error("Event not found");
    }

    return event;
}

export async function getFeaturedEvents(): Promise<Event[]> {
    const events = await getEvents();

    return events.filter((event) => event.isFeatured);
}

export async function getComments(eventId: string) {
    const res = await fetch(
        `${API_URL}/comments?eventId=${eventId}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Could not fetch comments");
    }

    return res.json();
}

export async function postComment(data: any) {
    const res = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Could not post comment");
    }

    return res.json();
}

export async function getReservations(eventId?: string) {
    const url = eventId
        ? `${API_URL}/reservations?eventId=${eventId}`
        : `${API_URL}/reservations`;

    const res = await fetch(url, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Could not fetch reservations");
    }

    return res.json();
}

export async function getGallery() {
    const res = await fetch(`${API_URL}/gallery`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Could not fetch gallery");
    }

    return res.json();
}

export async function getTestimonials() {
    const res = await fetch(`${API_URL}/testimonials`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Could not fetch testimonials");
    }

    return res.json();
}

