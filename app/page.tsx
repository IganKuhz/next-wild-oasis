import Image from 'next/image';
import background from '../public/bg.png';

export default function Page() {
  return (
    <main className='mt-24'>
      <Image
        src={background}
        fill
        placeholder='blur'
        quality={75}
        className='object-cover object-top'
        alt='Mountains and forests with two cabins'
      />

      <div className='relative z-10 text-center'>
        <h1 className='mb-10 text-3xl font-normal tracking-tight text-primary-50 md:text-7xl'>
          Welcome to paradise.
        </h1>
        <a
          href='/cabins'
          className='text-md bg-accent-500 px-8 py-6 font-semibold text-primary-800 transition-all hover:bg-accent-600 md:text-lg'
        >
          Explore luxury cabins
        </a>
      </div>
    </main>
  );
}
