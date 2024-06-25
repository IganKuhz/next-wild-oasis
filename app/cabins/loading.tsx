import Spinner from '@/components/Spinner';

export default function Loading() {
  return (
    <div className='grid place-content-center'>
      <Spinner />
      <p className='text-lg text-primary-200'>Loading cabins...</p>
    </div>
  );
}
