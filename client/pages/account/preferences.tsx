import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { config } from '../../constants';
import { ErrorData, Store, UpdateResponseData } from 'interfaces';

interface Request {
  twitterId: string;
  instagramId: string;
  nationality: string;
}

const AccountPreferencesPage = ({ store }: { store: Store }) => {
  const router = useRouter();

  const { register: registerForm, handleSubmit: handleSubmitForm } = useForm<Request>({});

  // axios
  const handleUpdate = handleSubmitForm(async (formData: Request) => {
    axios
      .patch(
        config.api + '/user',
        {
          key: ['twitterId', 'instagramId', 'nationality'],
          value: [formData.twitterId, formData.instagramId, formData.nationality],
        },
        { headers: { Authorization: `Bearer ${store.tokenCookie}` } }
      )
      .then((response: AxiosResponse) => {
        const data: UpdateResponseData = response.data;
        store.getDetails();
        console.log(data);
        router.push('/');
      })
      .catch((error: AxiosError) => {
        const data: ErrorData = error?.response?.data;
      });
  });

  /// update this
  return (
    <div className='bg-white min-h-screen flex justify-center items-center'>
      <div className='w-full max-w-lg'>
        <form onSubmit={handleUpdate}>
          <div>
            <h1 className='text-2xl font-bold'>Update your account</h1>
          </div>
          <div className='mt-5'>
            <p className='my-2'>Username</p>
            <input
              className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
              type='text'
              placeholder='Username'
              value={store.user?.username}
              disabled={true}
            />
          </div>
          <div className='my-3'>
            <p className='my-2'>Email</p>
            <input
              className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
              type='email'
              placeholder='Email'
              value={store.user?.email}
              disabled={true}
            />
          </div>
          <div className='my-3'>
            <p className='my-2'>Phone Number</p>
            <input
              className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
              type='number'
              placeholder='Phone Number'
              value={store.user?.phoneno}
              disabled={true}
            />
          </div>
          <div className='my-3'>
            <p className='my-2'>Twitter ID</p>
            <input
              className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
              type='text'
              placeholder='Twitter'
              {...registerForm('twitterId', {
                required: false,
                value: store.user?.twitterId,
              })}
            />
          </div>
          <div className='my-3'>
            <p className='my-2'>Instagram ID</p>
            <input
              className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
              type='text'
              placeholder='Instagram'
              {...registerForm('instagramId', {
                required: false,
                value: store.user?.instagramId,
              })}
            />
          </div>
          <div className='my-3'>
            <p className='my-2'>Nationality</p>
            <input
              className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
              type='text'
              placeholder='Nationality'
              {...registerForm('nationality', {
                required: false,
                value: store.user?.nationality,
              })}
            />
          </div>
          <div className='my-3'>
            <p className='my-2'>Bang Token</p>
            <input
              className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
              type='text'
              placeholder='Bang Token'
              value={store.user?.bangToken}
              disabled={true}
            />
          </div>
          <div className='my-3'>
            <p className='my-2'>Referral Count</p>
            <input
              className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
              type='text'
              placeholder='Reffral Count'
              value={store.user?.referralCount}
              disabled={true}
            />
          </div>
          <div className='my-3'>
            <p className='my-2'>Referral Link</p>
            <input
              className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
              type='text'
              placeholder='Reffral Link'
              value={config.frontend + '/account/register/' + store.user?.id}
              disabled={true}
            />
          </div>
          <div className='my-5'>
            <button className='w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100'>
              Update Details
            </button>
          </div>
        </form>
        <p className='mt-5'>
          <Link href='/'>
            <a> Go Back</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AccountPreferencesPage;
