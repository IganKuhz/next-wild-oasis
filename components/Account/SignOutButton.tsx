import { signOutAction } from '@/actions';
import { LogOut } from 'lucide-react';

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className='flex w-full items-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100'>
        <LogOut className='h-5 w-5 text-primary-600' />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
