// import { HomepageBlock, Layout } from "../components";
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';
import { ErrorData, Product, ProductResponseData, Store } from 'interfaces';
import axios, { AxiosError, AxiosResponse } from 'axios';
import api from 'constants';

const Home = ({ store }: { store: Store }) => {
  const [products, setProducts] = useState<Product[] | null>(null);

  axios
    .get(api + '/products')
    .then((response: AxiosResponse) => {
      const data: ProductResponseData = response.data;
      setProducts(data.data);
    })
    .catch((error: AxiosError) => {
      const data: ErrorData = error?.response?.data;
    });

  if (!products) return <p>No Products</p>;

  return (
    <div>
      <Navbar store={store} />
      <div className='py-10'>
        <header className='mb-4'>
          <div className='max-w-7xl mx-auto px-8'></div>
        </header>
        <main>
          <div className='max-w-7xl mx-auto px-8'>
            <ul role='list' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
