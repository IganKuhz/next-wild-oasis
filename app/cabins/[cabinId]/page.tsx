import CabinDetails from '@/components/Cabin/CabinDetails';
import Reservation from '@/components/Cabin/Reservation';
import Spinner from '@/components/Spinner';
import { getCabin } from '@/src/lib/data-service';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { cabinId: number };
}) {
  const { name } = (await getCabin(params.cabinId))!;
  return {
    title: `Our Cabin ${name}`,
  };
}

// export async function generateStaticParams() {
//   const cabins = await getCabins();
//   const ids = cabins?.map(cabin => ({ cabinId: String(cabin.id) }));
//   return ids!;
// }

export default async function Page({
  params,
}: {
  params: { cabinId: string };
}) {
  const cabin = await getCabin(+params.cabinId);

  return (
    <div className='mx-auto mt-8 max-w-6xl'>
      <CabinDetails cabin={cabin!} />

      <div>
        <h2 className='mb-10 text-center text-5xl font-semibold text-accent-400'>
          Reserve {cabin?.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin!} />
        </Suspense>
      </div>
    </div>
  );
}
