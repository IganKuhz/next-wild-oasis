import { eachDayOfInterval } from 'date-fns';
import {
  Booking,
  Cabin,
  Guest,
  NewGuest,
  bookingsSchema,
  cabinSchema,
  cabinsSchema,
  countriesSchema,
  editBookingSchema,
  newUserSchema,
  settingsSchema,
  userSchema,
} from '../types';
import { supabase } from './supabase';

// Get all cabins from the Supabase database
export async function getCabin(id: Guest['id']) {
  try {
    const { data } = await supabase
      .from('cabins')
      .select('*')
      .eq('id', id)
      .single();

    // For testing
    // await new Promise(res => setTimeout(res, 3000));

    const res = cabinSchema.safeParse(data);
    if (res.success) {
      return res.data;
    }
  } catch (error) {
    throw new Error('Cabin could not be loaded');
  }
}

// export async function getCabinPrice(id) {
//   const { data, error } = await supabase
//     .from('cabins')
//     .select('regularPrice, discount')
//     .eq('id', id)
//     .single();

//   if (error) {
//     console.error(error);
//   }

//   return data;
// }

export async function getCabins() {
  try {
    const { data, error } = await supabase
      .from('cabins')
      .select('id, name, maxCapacity, regularPrice, discount, image')
      .order('name');

    // For testing
    // await new Promise(res => setTimeout(res, 3000));

    const res = cabinsSchema.safeParse(data);
    if (res.success) {
      return res.data;
    }
  } catch (error) {
    throw new Error('Cabins could not be loaded');
  }
}

// Guests are uniquely identified by their email address
export async function getGuest(email: Guest['email']) {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();

  const res = userSchema.safeParse(data);
  // No error here! We handle the possibility of no guest in the sign in callback
  return res.data;
  // return data;
}

export async function getBooking(id: Booking['id']) {
  const { data, error, count } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  const res = editBookingSchema.safeParse(data);
  if (res.success) {
    return res.data;
  }
}

export async function getBookings(guestId: Guest['id']) {
  const { data, error, count } = await supabase
    .from('bookings')
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)',
    )
    .eq('guestId', guestId)
    .order('startDate');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  const res = bookingsSchema.safeParse(data);
  if (res.success) {
    return res.data;
  }
}

export async function getBookedDatesByCabinId(cabinId: Cabin['id']) {
  try {
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const todayStr: string = today.toISOString();

    // Getting all bookings
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('cabinId', cabinId)
      .or(`startDate.gte.${todayStr},status.eq.checked-in`);

    // For testing
    // await new Promise(res => setTimeout(res, 3000));

    // Converting to actual dates to be displayed in the date picker
    const bookedDates = data!
      .map(booking => {
        return eachDayOfInterval({
          start: new Date(booking.startDate!),
          end: new Date(booking.endDate!),
        });
      })
      .flat();

    return bookedDates;
  } catch (error) {
    throw new Error('Bookings could not get loaded');
  }
}

export async function getSettings() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    // For testing
    // await new Promise(res => setTimeout(res, 3000));

    const res = settingsSchema.safeParse(data);

    if (!res.success) {
      console.error(error);
      throw new Error('Settings could not be loaded');
    }

    return res.data;
  } catch (error) {
    throw new Error('Settings could not be loaded');
  }
}

export async function getCountries() {
  try {
    const resCountries = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag',
    );
    const data = await resCountries.json();
    const res = countriesSchema.safeParse(data);
    if (!res.success) {
      throw new Error('Settings could not be loaded');
    }

    return res.data;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: NewGuest) {
  const { data, error } = await supabase.from('guests').insert([newGuest]);

  const res = newUserSchema.safeParse(data);
  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return res.data;
}

// export async function createBooking(newBooking) {
//   const { data, error } = await supabase
//     .from('bookings')
//     .insert([newBooking])
//     // So that the newly created object gets returned!
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error('Booking could not be created');
//   }

//   return data;
// }

// /////////////
// // UPDATE

// // The updatedFields is an object which should ONLY contain the updated data
// export async function updateGuest(id, updatedFields) {
//   const { data, error } = await supabase
//     .from('guests')
//     .update(updatedFields)
//     .eq('id', id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error('Guest could not be updated');
//   }
//   return data;
// }

// export async function updateBooking(id, updatedFields) {
//   const { data, error } = await supabase
//     .from('bookings')
//     .update(updatedFields)
//     .eq('id', id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error('Booking could not be updated');
//   }
//   return data;
// }

// /////////////
// // DELETE

// export async function deleteBooking(id) {
//   const { data, error } = await supabase.from('bookings').delete().eq('id', id);

//   if (error) {
//     console.error(error);
//     throw new Error('Booking could not be deleted');
//   }
//   return data;
// }

export const randomID = () =>
  Math.random().toString(36).substring(2, 9).toLocaleUpperCase();
