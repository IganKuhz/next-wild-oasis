import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string(),
  nationality: z.string().or(z.null()),
  nationalID: z.string().or(z.null()),
  countryFlag: z.string().or(z.null()),
  created_at: z.string().or(z.null()),
});

export const newUserSchema = userSchema.pick({
  email: true,
  fullName: true,
  nationalID: true,
});
export type Guest = z.infer<typeof userSchema>;
export type NewGuest = z.infer<typeof newUserSchema>;

// Cabin schema and types
export const cabinSchema = z.object({
  id: z.number(),
  name: z.string(),
  maxCapacity: z.number(),
  regularPrice: z.number(),
  discount: z.number(),
  description: z.string(),
  image: z.string(),
  created_at: z.string(),
});
export const cabinsSchema = z.array(
  cabinSchema.pick({
    id: true,
    name: true,
    maxCapacity: true,
    regularPrice: true,
    discount: true,
    image: true,
  }),
);
export type Cabins = z.infer<typeof cabinsSchema>;
export type Cabin = z.infer<typeof cabinSchema>;

//
// Settings schema and types
export const settingsSchema = z.object({
  minBookingLength: z.number(),
  maxBookingLength: z.number(),
  maxGuestsPerBooking: z.number(),
  breakfastPrice: z.number(),
});
export type Settings = z.infer<typeof settingsSchema>;

//
// Booked dates schema and types
export const bookedDateSchema = z.object({
  id: z.number(),
  cabinId: z.number(),
  date: z.string(),
});

//
// Country schema and types
export const countrySchema = z.object({
  name: z.string(),
  flag: z.string(),
  independent: z.boolean(),
});
export const countriesSchema = z.array(
  countrySchema.pick({
    name: true,
    flag: true,
  }),
);
export type Country = z.infer<typeof countrySchema>;
export type Countries = z.infer<typeof countriesSchema>;

export const bookingStatusSchema = z.enum([
  'unconfirmed',
  'checked-in',
  'checked-out',
]);

export const bookingSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  numNights: z.number(),
  numGuests: z.number(),
  totalPrice: z.number(),
  guestId: z.number(),
  cabinId: z.number(),
  cabinPrice: z.number(),
  observations: z.string().or(z.null()),
  extraPrice: z.number(),
  maxCapacity: z.number(),
  hasBreakfast: z.boolean(),
  isPaid: z.boolean(),
  status: bookingStatusSchema.optional(),
  cabins: cabinSchema.pick({ name: true, image: true }),
});
export const bookingsSchema = z.array(
  bookingSchema.pick({
    id: true,
    created_at: true,
    startDate: true,
    endDate: true,
    numNights: true,
    numGuests: true,
    totalPrice: true,
    guestId: true,
    cabinId: true,
    cabins: true,
  }),
);
export const editBookingSchema = bookingSchema.pick({
  cabinId: true,
  startDate: true,
  endDate: true,
  numGuests: true,
  observations: true,
});

export const bookingFormDataSchema = bookingSchema.pick({
  cabinId: true,
  startDate: true,
  endDate: true,
  numNights: true,
  cabinPrice: true,
});

export type Booking = z.infer<typeof bookingSchema>;
export type Bookings = z.infer<typeof bookingsSchema>;
export type BookingForm = z.infer<typeof bookingFormDataSchema>;
