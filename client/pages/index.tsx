// import { HomepageBlock, Layout } from "../components";
import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';
import { ErrorData, Product, ProductResponseData, Store } from 'interfaces';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { config } from '../constants';

const rules = [
  'On posting a review on the product you will get 100 BANG TOKENS',

  'Invite a friend and earn 50 BANG TOKENS (Referral link will be available on account preference page)',

  'Update account details by adding your Twitter ID, Instagram ID, Nationality and earn 10 BANG TOKENS each',
];

const Home = ({ store }: { store: Store }) => {
  useEffect(() => {
    axios
      .get(config.api + '/products')
      .then((response: AxiosResponse) => {
        const data: ProductResponseData = response.data;
        store.setProducts(data.data);
      })
      .catch((error: AxiosError) => {
        const data: ErrorData = error?.response?.data;
      });
  }, []);

  if (!store.products) return <p>No Products</p>;

  return (
    <div>
      <Navbar store={store} />
      <div className='space-y-3 py-10'>
        <header className='mb-4'>
          <div className='max-w-7xl mx-auto px-8'>TASKS</div>
        </header>
        <div className='max-w-7xl mx-auto px-8'>
          <ul className='flex flex-col space-y-2'>
            {rules.map((rule, idx) => (
              <li key={idx} className=''>{`${idx + 1}) ${rule}`}</li>
            ))}
          </ul>
        </div>
        <header className='mb-4'>
          <div className='max-w-7xl mx-auto px-8'>PRODUCTS</div>
        </header>
        <main>
          <div className='max-w-7xl mx-auto px-8'>
            <ul role='list' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
              {store.products.map(product => (
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
