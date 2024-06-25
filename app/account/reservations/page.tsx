import ReservationList from '@/components/Account/ReservationList';
import { auth } from '@/src/lib/auth';
import { getBookings } from '@/src/lib/data-service';
import { Booking } from '@/src/types';

export const metadata = {
  title: 'Your Reservations',
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session?.user.guestId!);

  return (
    <div className='h-[calc(100dvh-195px)] overflow-y-scroll'>
      <h2 className='mb-7 text-2xl font-semibold text-accent-400'>
        Your reservations
      </h2>

      {bookings?.length === 0 ?
        <p className='text-lg'>
          You have no reservations yet. Check out our{' '}
          <a
            className='text-accent-500 underline'
            href='/cabins'
          >
            luxury cabins &rarr;
          </a>
        </p>
      : <ReservationList bookings={bookings as Booking[]} />}
    </div>
  );
}
