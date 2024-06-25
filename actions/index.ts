'use server';

import { auth, signIn, signOut } from '@/src/lib/auth';
import { getBookings } from '@/src/lib/data-service';
import { supabase } from '@/src/lib/supabase';
import { Booking, BookingForm } from '@/src/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error('You must be signed in to update your profile');
  }

  const nationalID = formData.get('nationalID')?.toString()!;
  const [nationality, countryFlag] = formData
    .get('nationality')!
    .toString()
    .split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error('Invalid national ID number');
  }

  const updatedFields = {
    nationalID,
    nationality,
    countryFlag,
  };

  const { data, error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }

  revalidatePath('/account');
}

export async function createBooking(
  bookingData: BookingForm,
  formData: FormData,
) {
  const session = await auth();
  if (!session) {
    throw new Error('You must be signed in to create the booking');
  }

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations')?.slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  };

  const { error } = await supabase.from('bookings').insert([newBooking]);

  if (error) {
    throw new Error('Booking could not be created');
  }

  revalidatePath('/account/reservations');
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect('/cabins/thankyou');
}

export async function deleteBooking(bookingId: Booking['id']) {
  // For testing
  // await new Promise(res => setTimeout(res, 3000));
  // throw new Error('Booking could not be deleted');

  const session = await auth();
  if (!session) {
    throw new Error('You must be signed in to delete the booking');
  }

  const guestBookings = await getBookings(session?.user.guestId!);
  const guestBookingIds = guestBookings?.map(booking => booking.id);

  if (!guestBookingIds?.includes(bookingId)) {
    throw new Error('Booking does not exist');
  }

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }

  revalidatePath('/account/reservations');
}

export async function updateBooking(formData: FormData) {
  const bookingId = Number(formData.get('bookingId'));

  // 1. Get the current user session
  const session = await auth();
  if (!session) {
    throw new Error('You must be signed in to delete the booking');
  }

  // 2. Get the guest's bookings
  const guestBookings = await getBookings(session.user.guestId!);
  const guestBookingIds = guestBookings?.map(booking => booking.id);

  // 3. Check if the booking exists
  if (!guestBookingIds?.includes(bookingId)) {
    throw new Error('Booking does not exist');
  }

  // 4. Update the booking
  const updatedFields = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations')?.slice(0, 1000),
  };

  // 5. Update the booking in the database
  const { error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', bookingId)
    .select()
    .single();

  // 6. Handle errors
  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  // 7. Revalidate the reservations page
  revalidatePath('/account/reservations/');
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // 8. Redirect to the reservations page
  redirect('/account/reservations');
}

export async function signInAction() {
  await signIn('google', {
    redirectTo: '/account',
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: '/',
  });
}
