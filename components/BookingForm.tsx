"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import type { Event } from "@/lib/types";

const bookingSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  guests: z.string().regex(/^[1-9]\d*$/, "Enter a valid number of guests"),
  table: z.string().min(1, "Choose a table"),
  eventId: z.string().min(1, "Choose an event"),
  comment: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

type Reservation = {
  id: number;
  table: string;
  eventId: number;
  date: string;
};

type BookingFormProps = {
  events: Event[];
};

const tableCapacities: Record<string, number> = {
  "1": 4,
  "2": 4,
  "3": 6,
  "4": 4,
  "5": 8,

  "6": 4,
  "7": 4,
  "8": 6,
  "9": 4,
  "10": 8,

  "11": 4,
  "12": 4,
  "13": 6,
  "14": 4,
  "15": 8,
};

export default function BookingForm({ events }: BookingFormProps) {
  const searchParams = useSearchParams();
  const preselectedEventId = searchParams.get("eventId");

  const [message, setMessage] = useState("");

  const [bookedTables, setBookedTables] = useState<string[]>([]);
  const [isLoadingTables, setIsLoadingTables] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      eventId: preselectedEventId || "",
    },
  });

  const selectedTable = watch("table");
  const selectedEventId = watch("eventId");

  useEffect(() => {
    if (preselectedEventId) {
      setValue("eventId", preselectedEventId);
    }
  }, [preselectedEventId, setValue]);
  useEffect(() => {
    async function fetchBookedTables() {
      if (!selectedEventId) {
        setBookedTables([]);
        return;
      }

      setIsLoadingTables(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations?eventId=${selectedEventId}`
        );

        if (!res.ok) {
          setMessage("Could not load booked tables.");
          setBookedTables([]);
          return;
        }

        const reservations: Reservation[] = await res.json();
        const tables = reservations.map((r) => r.table.toString());
        setBookedTables(tables);

        const currentTable = getValues("table");
        if (currentTable && tables.includes(currentTable)) {
          setValue("table", "");
        }
      } catch {
        setMessage("Could not load booked tables.");
        setBookedTables([]);
      } finally {
        setIsLoadingTables(false);
      }
    }

    fetchBookedTables();
  }, [selectedEventId, setValue, getValues]);

  async function onSubmit(data: BookingFormData) {
    setMessage("");

    const selectedEvent = events.find(
      (event) => event.id.toString() === data.eventId
    );

    if (!selectedEvent) {
      setMessage("Please choose a valid event.");
      return;
    }

    const maxGuests = tableCapacities[data.table];

    if (Number(data.guests) > maxGuests) {
      setMessage(
        `Table ${data.table} only supports a maximum of ${maxGuests} guests.`
      );
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          guests: data.guests,
          table: data.table,
          eventId: Number(data.eventId),
          date: selectedEvent.date,
          comment: data.comment,
        }),
      });

      if (!res.ok) {
        setMessage("This table may already be booked. Please choose another.");
        return;
      }

      reset();
      setMessage("Your table has been reserved.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {!selectedEventId && (
  <p className="mb-8 text-center text-white/60">
    Choose an event first to see which tables are available.
  </p>
)}
      <TableMap
        selectedTable={selectedTable}
        bookedTables={bookedTables}
        isLoadingTables={isLoadingTables}
        onSelectTable={(table) => setValue("table", table)}
      />
      {selectedEventId && (
        <p className="mt-6 text-center text-sm text-white/60">
          Unavailable tables are shown in pink.
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
        <h2 className="mb-8 text-3xl font-bold uppercase">Book a Table</h2>

        <div className="grid gap-5 md:grid-cols-2">
          <FieldError error={errors.name?.message}>
            <input
              {...register("name")}
              placeholder="Your Name"
              className="form-field"
            />
          </FieldError>

          <FieldError error={errors.email?.message}>
            <input
              {...register("email")}
              placeholder="Your Email"
              className="form-field"
            />
          </FieldError>

          <FieldError error={errors.table?.message}>
            <input
              {...register("table")}
              placeholder="Table Number"
              readOnly
              className="form-field"
            />
          </FieldError>

          <FieldError error={errors.guests?.message}>
            <input
              {...register("guests")}
              placeholder={
    selectedTable
      ? `Number of Guests (Max ${tableCapacities[selectedTable]})`
      : "Number of Guests"
  }
              className="form-field"
            />
          </FieldError>

          <FieldError error={errors.eventId?.message}>
            <select {...register("eventId")} className="form-field bg-black text-white">
              <option value="">Choose Event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </FieldError>

          <FieldError error={errors.phone?.message}>
            <input
              {...register("phone")}
              placeholder="Your Contact Number"
              className="form-field"
            />
          </FieldError>
        </div>

        <textarea
          {...register("comment")}
          placeholder="Your Comment"
          rows={8}
          className="form-field mt-5"
        />

        <div className="mt-5 flex justify-end">
          <button
            disabled={isSubmitting}
            className="border-y border-white px-10 py-3 text-sm font-bold uppercase tracking-wider hover:text-(--color-pink) disabled:opacity-50"
          >
            {isSubmitting ? "Reserving..." : "Reserve"}
          </button>
        </div>

        {message && <p className="mt-5 font-bold text-(--color-pink)">{message}</p>}
      </form>
    </section>
  );
}

function TableMap({
  selectedTable,
  bookedTables,
  isLoadingTables,
  onSelectTable,
}: {
  selectedTable?: string;
  bookedTables: string[];
  isLoadingTables: boolean;
  onSelectTable: (table: string) => void;
}) {
  const tableLayouts = [
    "s",
    "s",
    "m",
    "s",
    "l",

    "s",
    "s",
    "m",
    "s",
    "l",

    "s",
    "s",
    "m",
    "s",
    "l",
  ];

  return (
    <div>
      {isLoadingTables && (
        <p className="mb-8 text-center text-(--color-pink)">
          Loading booked tables...
        </p>
      )}

      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-5 md:gap-x-10 md:gap-y-14">
        {tableLayouts.map((size, index) => {
          const tableNumber = String(index + 1);
          const isBooked = bookedTables.includes(tableNumber);

          const image =
            size === "s"
              ? "/images/table-s.webp"
              : size === "m"
              ? "/images/table-m.webp"
              : "/images/table-l.webp";

          return (
            <button
              key={tableNumber}
              type="button"
              disabled={isBooked}
              onClick={() => {
                if (!isBooked) {
                  onSelectTable(tableNumber);
                }
              }}
              className={`group relative flex justify-center transition ${
                isBooked
                  ? "cursor-not-allowed opacity-30"
                  : selectedTable === tableNumber
                  ? "scale-105"
                  : "hover:scale-105"
              }`}
              aria-label={
                isBooked
                  ? `Table ${tableNumber} is already booked`
                  : `Choose table ${tableNumber}`
              }
            >
              <div className="relative">
                <Image
                  src={image}
                  alt={`Table ${tableNumber}`}
                  width={140}
                  height={140}
                  className={`h-auto w-auto transition ${
                    selectedTable === tableNumber && !isBooked
                      ? "brightness-125"
                      : "opacity-90"
                  }`}
                />

                <span
                  className={`absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-3xl font-bold ${
                    isBooked
                      ? "text-(--color-pink)"
                      : selectedTable === tableNumber
                      ? "text-(--color-pink)"
                      : "text-white"
                  }`}
                >
                  {tableNumber}
                </span>

                {isBooked && (
                  <span className="absolute left-1/2 top-[70%] -translate-x-1/2 text-xs font-bold uppercase text-pink-500">
                    Booked
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FieldError({
  error,
  children,
}: {
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {error && <p className="mt-2 text-sm text-(--color-pink)">{error}</p>}
    </div>
  );
}