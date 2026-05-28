"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [feedback, setFeedback] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setFeedback("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contact_messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      setFeedback("Your message could not be sent. Please try again.");
      return;
    }

    reset();
    setFeedback("Your message has been sent.");
  }

  return (
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    <div>
      <input
        {...register("name")}
        placeholder="Your Name"
        className="form-field"
      />
      {errors.name && (
        <p className="mt-2 text-(--color-pink)">{errors.name.message}</p>
      )}
    </div>

    <div>
      <input
        {...register("email")}
        placeholder="Your Email"
        className="form-field"
      />
      {errors.email && (
        <p className="mt-2 text-(--color-pink)">{errors.email.message}</p>
      )}
    </div>

    <div>
      <textarea
        {...register("message")}
        placeholder="Your Comment"
        rows={10}
        className="form-field resize-y"
      />
      {errors.message && (
        <p className="mt-2 text-(--color-pink)">{errors.message.message}</p>
      )}
    </div>

    <div className="flex justify-end">
      <button
        type="submit"
        disabled={isSubmitting}
        className="border-y border-white px-12 py-3 text-sm font-bold uppercase tracking-wider hover:text-(--color-pink) disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </div>

    {feedback && <p className="font-bold text-(--color-pink)">{feedback}</p>}
  </form>
);
}