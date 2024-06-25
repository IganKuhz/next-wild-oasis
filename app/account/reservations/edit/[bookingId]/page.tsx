import { updateBooking } from '@/actions';
import SubmitButton from '@/components/SubmitButton';
import { getBooking, getCabin } from '@/src/lib/data-service';
import { Booking } from '@/src/types';

export default async function Page({
  params,
}: {
  params: { bookingId: Booking['id'] };
}) {
  const { bookingId } = params;
  const { numGuests, observations, cabinId } = (await getBooking(bookingId))!;
  const { maxCapacity } = (await getCabin(cabinId))!;

  return (
    <div>
      <h2 className='mb-7 text-2xl font-semibold text-accent-400'>
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateBooking}
        className='flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg'
      >
        <input
          type='hidden'
          name='bookingId'
          value={bookingId}
        />
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            defaultValue={numGuests}
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
            defaultValue={observations!}
            className='w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm'
          />
        </div>

        <div className='flex items-center justify-end gap-6'>
          <SubmitButton
            pendingText='Updating...'
            labelText='Update reservation'
          />
        </div>
      </form>
    </div>
  );
}
