'use client';

import { deleteBooking } from '@/actions';
import { Booking } from '@/src/types';
import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';

type ReservationListProps = {
  bookings: Booking[];
};

export default function ReservationList({ bookings }: ReservationListProps) {
  const [optimisticBooking, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter(booking => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId: Booking['id']) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className='space-y-6'>
      {optimisticBooking?.map(booking => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
