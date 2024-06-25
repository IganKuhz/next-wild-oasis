import { updateGuest } from '@/actions';
import { Guest } from '@/src/types';
import SubmitButton from '../SubmitButton';

type UpdateProfileFormProps = {
  guest: Guest;
  children: React.ReactNode;
};

function UpdateProfileForm({ guest, children }: UpdateProfileFormProps) {
  const { fullName, nationalID, email, countryFlag } = guest;

  return (
    <>
      <form
        action={updateGuest}
        className='flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg'
      >
        <div className='space-y-2'>
          <label>Full name</label>
          <input
            disabled
            defaultValue={fullName}
            name='fullName'
            className='w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
          />
        </div>

        <div className='space-y-2'>
          <label>Email address</label>
          <input
            disabled
            defaultValue={email}
            name='email'
            className='w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
          />
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <label htmlFor='nationality'>Where are you from?</label>
            <img
              src={countryFlag !== null ? countryFlag : ''}
              alt='Country flag'
              className='h-5 rounded-sm object-cover'
            />
          </div>

          {children}
        </div>

        <div className='space-y-2'>
          <label htmlFor='nationalID'>National ID number</label>
          <input
            defaultValue={nationalID!}
            name='nationalID'
            className='w-full rounded-sm bg-primary-200 px-5 py-3 uppercase text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
          />
        </div>

        <div className='flex items-center justify-end gap-6'>
          <SubmitButton
            pendingText='Updating...'
            labelText='Update profile'
          />
        </div>
      </form>
    </>
  );
}

export default UpdateProfileForm;
