import Link from 'next/link';
import { useRouter } from 'next/router';
import { ErrorData, OrderResponseData, Product, Review, ReviewResponseData, Store } from 'interfaces';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { config } from '../../constants';
import { Navbar } from '../../components/Navbar';
import { Reviews } from '../../components/Reviews';
import { useForm } from 'react-hook-form';

const ProductPage = ({ store }: { store: Store }) => {
  const router = useRouter();
  const { productId }: { productId: string } = router.query as any;

  const { handleSubmit: handleSubmitForm } = useForm({});

  const [product, setProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleOrder = handleSubmitForm(async () => {
    setNotification(null);
    if (product) {
      axios
        .post(
          config.api + '/order',
          {
            price: product.price,
          },
          { headers: { Authorization: `Bearer ${store.tokenCookie}` } }
        )
        .then((response: AxiosResponse) => {
          const data: OrderResponseData = response.data;
          setNotification(`You have ordered ${product.name}!`);
          store.getDetails();
          console.log(data);
        })
        .catch((error: AxiosError) => {
          const data: ErrorData = error?.response?.data;
          setNotification(`Insufficent balance!`);
        });
    }
  });

  useEffect(() => {
    if (store.products) {
      for (let i = 0; i < store.products.length; i++) {
        if (store.products[i]._id === productId) {
          setProduct(store.products[i]);
          break;
        }
      }
    }
  }, [store.products]);

  return (
    <div>
      <Navbar store={store} />
      {product ? (
        <div>
          <div className='flex'>
            <div className='flex-none w-48 relative'>
              <img src={product.image} alt='' className='absolute inset-0 w-full h-full object-cover' />
            </div>
            <form className='flex-auto p-6' onSubmit={handleOrder}>
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
                    Buy Now
                  </button>
                </div>
              </div>
              <p className='text-sm text-gray-500'>Free shipping on all continental US orders.</p>
            </form>
          </div>
        </div>
      ) : (
        <p>Something went wrong.</p>
      )}
      {notification && <p className='my-2 text-red'>{notification}</p>}
      <Reviews productId={productId} store={store} />
    </div>
  );
};

export default ProductPage;
