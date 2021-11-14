import Link from 'next/link';
import { Product } from 'interfaces';

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div>
        <div className='flex'>
          <div className='flex-none w-48 relative'>
            <img src={product.image} alt='' className='absolute inset-0 w-full h-full object-cover' />
          </div>
          <form className='flex-auto p-6'>
            <div className='flex flex-wrap'>
              <h1 className='flex-auto text-xl font-semibold'>{product.name}</h1>
              <div className='text-xl font-semibold text-gray-500'>{product.price}</div>
              <div className='w-full flex-none text-sm font-medium text-gray-500 mt-2'>In stock</div>
            </div>

            <div className='flex space-x-3 mb-4 text-sm font-medium'>
              <div className='flex-auto flex space-x-3'>
                <button
                  className='w-1/2 flex items-center justify-center rounded-md bg-black text-white'
                  type='submit'
                >
                  Buy now
                </button>
              </div>
            </div>
            <p className='text-sm text-gray-500'>Free shipping on all continental US orders.</p>
          </form>
        </div>
      </div>
    </Link>
  );
};
