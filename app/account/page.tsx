import { auth } from '@/src/lib/auth';

export const metadata = {
  title: 'Your Account',
};

export default async function Page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(' ')[0];
  return (
    <div>
      <h2 className='mb-7 text-2xl font-semibold text-accent-400'>
        Welcome, {firstName || 'guest'}
      </h2>
    </div>
  );
}
