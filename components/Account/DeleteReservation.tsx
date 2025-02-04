'use client';

import { Booking } from '@/src/types';
import { TrashIcon } from 'lucide-react';
import { useTransition } from 'react';
import SpinnerMini from '../SpinnerMini';

type DeleteReservationProps = {
  bookingId: Booking['id'];
  onDelete: (bookingId: Booking['id']) => void;
};

function DeleteReservation({ bookingId, onDelete }: DeleteReservationProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm('Are you sure you want to delete this reservation?'))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className='group flex flex-grow items-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-red-400 hover:text-primary-900'
    >
      {!isPending ?
        <>
          <TrashIcon className='h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800' />
          <span className='mt-1'>Delete</span>
        </>
      : <>
          <span className='mx-auto'>
            <SpinnerMini />
          </span>
        </>
      }
    </button>
  );
}

export default DeleteReservation;
