import { auth } from '@/src/lib/auth';
import { getBookedDatesByCabinId, getSettings } from '@/src/lib/data-service';
import { Cabin } from '@/src/types';
import LoginMessage from '../LoginMessage';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

export default async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <>
      <div className='grid min-h-[400px] grid-cols-2 border border-primary-800'>
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
        {session?.user ?
          <ReservationForm
            cabin={cabin!}
            user={session.user}
          />
        : <LoginMessage />}
      </div>
    </>
  );
}
