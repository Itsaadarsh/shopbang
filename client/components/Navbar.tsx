import Image from 'next/image';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/outline';

import { Store } from 'interfaces';

export const Navbar = ({ store }: { store: Store }) => {
  return (
    <div className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between h-16'>
          <div className='flex justify-between items-center'>
            <Link href='/'>
              <a>
                <div className='mt-px group block h-16 w-28 relative'>SHOP BANG</div>
              </a>
            </Link>
          </div>
          <p>Bang Token: {store.user ? store.user.bangToken : 0}</p>
          <div className='flex space-x-px md:space-x-8 items-center'>
            {!store.usernameCookie && (
              <Link href='/account/login'>
                <a className='group -m-2 p-2 flex items-center'>
                  <UserCircleIcon
                    className='flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                  <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                    Log in
                  </span>
                </a>
              </Link>
            )}
            {store.usernameCookie && (
              <div className='group -m-2 p-2  text-left dropdown flex items-center z-40'>
                <span className='rounded-md shadow-sm'>
                  <button
                    className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800'
                    type='button'
                    aria-haspopup='true'
                    aria-expanded='true'
                    aria-controls='headlessui-menu-items-117'
                  >
                    <a className='group -m-2 p-2 flex items-center'>
                      <UserCircleIcon
                        className='flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'
                        aria-hidden='true'
                      />
                      <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                        {store.usernameCookie}
                      </span>
                    </a>
                    <svg className='w-5 h-5 ml-2 -mr-1' viewBox='0 0 20 20' fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </span>
                <div className='opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95'>
                  <div
                    className='absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-40'
                    aria-labelledby='headlessui-menu-button-1'
                    id='headlessui-menu-items-117'
                    role='menu'
                  >
                    <div className='px-4 py-3'>
                      <p className='text-sm leading-5'>Signed in as</p>
                      <p className='text-sm font-medium leading-5 text-gray-900 truncate'>
                        {store.usernameCookie}
                      </p>
                    </div>
                    <div className='py-1'>
                      <Link href='/account/preferences'>
                        <a
                          tabIndex={0}
                          className='text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left'
                          role='menuitem'
                        >
                          Account preferences
                        </a>
                      </Link>
                    </div>
                    <div className='py-1'>
                      <a
                        onClick={store.logout}
                        tabIndex={3}
                        className='text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left'
                        role='menuitem'
                      >
                        Log out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
