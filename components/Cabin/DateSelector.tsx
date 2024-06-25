'use client';

import { Cabin, Settings } from '@/src/types';
import {
  Interval,
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useReservation } from './ReservationContext';

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
  return (
    range.from &&
    range.to &&
    datesArr.some(date =>
      isWithinInterval(date, { start: range.from, end: range.to } as Interval),
    )
  );
}

type DateSelectorProps = {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
};

function DateSelector({ settings, bookedDates, cabin }: DateSelectorProps) {
  // RESERVATION IS A CLIENT-SIDE CONTEXT
  const { range, setRange, resetRange } = useReservation();
  const displayRange =
    isAlreadyBooked(range!, bookedDates) ?
      {
        from: undefined,
        to: undefined,
      }
    : range;

  // CABIN CALCS
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange?.to!, displayRange?.from!);
  const cabinPrice = numNights * (regularPrice - discount);
  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className='flex flex-col justify-between'>
      <DayPicker
        className='place-self-center pt-12'
        mode='range'
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout='dropdown'
        numberOfMonths={2}
        disabled={(curDate: Date) =>
          // Disable dates in the past or already booked
          isPast(curDate) || bookedDates.some(date => isSameDay(date, curDate))
        }
      />

      <div className='flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800'>
        <div className='flex items-baseline gap-6'>
          <p className='flex items-baseline gap-2'>
            {discount > 0 ?
              <>
                <span className='text-2xl'>${regularPrice - discount}</span>
                <span className='font-semibold text-primary-700 line-through'>
                  ${regularPrice}
                </span>
              </>
            : <span className='text-2xl'>${regularPrice}</span>}
            <span className=''>/night</span>
          </p>
          {numNights ?
            <>
              <p className='bg-accent-600 px-3 py-2 text-2xl'>
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className='text-lg font-bold uppercase'>Total</span>{' '}
                <span className='text-2xl font-semibold'>${cabinPrice}</span>
              </p>
            </>
          : null}
        </div>

        {range?.from || range?.to ?
          <button
            className='border border-primary-800 px-4 py-2 text-sm font-semibold hover:bg-accent-600'
            onClick={() => resetRange()}
          >
            Clear
          </button>
        : null}
      </div>
    </div>
  );
}

export default DateSelector;
