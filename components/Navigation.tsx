import { auth } from '@/src/lib/auth';
import Link from 'next/link';

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className='z-10 text-xl'>
      <ul className='flex items-center gap-8'>
        <li>
          <Link
            href='/cabins'
            className='transition-colors hover:text-accent-400'
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href='/about'
            className='transition-colors hover:text-accent-400'
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ?
            <Link
              href='/account'
              className='flex items-center gap-2 transition-colors hover:text-accent-400'
            >
              <img
                src={session?.user?.image!}
                alt={session?.user?.name!}
                referrerPolicy='no-referrer'
                className='h-8 w-8 rounded-full'
              />
              <span>Guest area</span>
            </Link>
          : <Link
              href='/account'
              className='transition-colors hover:text-accent-400'
            >
              <span>Guest area</span>
            </Link>
          }
        </li>
      </ul>
    </nav>
  );
}
