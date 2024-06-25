'use client';

import { createBooking } from '@/actions';
import { Cabin } from '@/src/types';
import { differenceInDays } from 'date-fns';
import { User } from 'next-auth';
import SubmitButton from '../SubmitButton';
import { useReservation } from './ReservationContext';

type ReservationFormProps = {
  cabin: Cabin;
  user: User;
};

function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  // CHANGE
  const startDate = range?.from!.toISOString()!;
  const endDate = range?.to!.toISOString()!;
  const numNights = differenceInDays(endDate!, startDate!);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    cabinId: id,
    startDate,
    endDate,
    numNights,
    cabinPrice,
  };

  const createBookingData = createBooking.bind(null, bookingData);

  return (
    <div className='scale-[1.01]'>
      <div className='flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300'>
        <p>Logged in as</p>

        <div className='flex items-center gap-4'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image!}
            alt={user.name!}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createBookingData}
        action={async formData => {
          createBookingData(formData);
          resetRange();
        }}
        className='flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg'
      >
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm'
            required
          >
            <option
              value=''
              key=''
            >
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(x => (
              <option
                value={x}
                key={x}
              >
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex items-center justify-end gap-6'>
          {!(startDate && endDate) ?
            <p className='text-base text-primary-300'>
              Start by selecting dates
            </p>
          : <SubmitButton
              pendingText='Reserving...'
              labelText='Reserve now'
            />
          }
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
