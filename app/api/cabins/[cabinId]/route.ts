import { getBookedDatesByCabinId, getCabin } from '@/src/lib/data-service';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { cabinId: number };
  },
) {
  const { cabinId } = params;

  // This is where you would fetch the cabin data from your database
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: 'Cabin not found' }, { status: 404 });
  }
}
