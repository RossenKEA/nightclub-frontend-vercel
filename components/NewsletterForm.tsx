"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "@/lib/api";

const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function NewsletterForm() {
  const [feedback, setFeedback] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  async function onSubmit(data: NewsletterFormData) {
    setFeedback("");

    const res = await fetch(`${API_URL}/newsletters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 409) {
      setFeedback("This email is already subscribed.");
      return;
    }

    if (!res.ok) {
      setFeedback("Could not subscribe. Please try again.");
      return;
    }

    reset();
    setFeedback("You have been subscribed.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl">
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          {...register("email")}
          placeholder="Your Email"
          className="flex-1 border border-white/30 bg-black p-4 text-white outline-none focus:border-(--color-pink)"
        />

        <button
          disabled={isSubmitting}
          className="border-y border-white px-8 py-4 font-bold uppercase hover:text-(--color-pink) disabled:opacity-50"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </div>

      {errors.email && (
        <p className="mt-3 text-(--color-pink)">{errors.email.message}</p>
      )}

      {feedback && <p className="mt-3 font-bold text-(--color-pink)">{feedback}</p>}
    </form>
  );
}