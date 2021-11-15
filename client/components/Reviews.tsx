import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';

import { config } from '../constants';
import { ErrorData, Review, ReviewResponseData, Store } from 'interfaces';
import router from 'next/router';

interface Request {
  review: string;
}

export const Reviews = ({ store, productId }: { store: Store; productId: string }) => {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  const { register: registerForm, handleSubmit: handleSubmitForm } = useForm<Review>({});

  const getReviews = () => {
    axios
      .get(config.api + '/review/' + productId)
      .then((response: AxiosResponse) => {
        const data: ReviewResponseData = response.data;
        setReviews(data.data.reviews);
      })
      .catch((error: AxiosError) => {
        const data: ErrorData = error?.response?.data;
      });
  };

  // Post review
  const handlePostReview = handleSubmitForm(async (formData: Request) => {
    console.log(formData);
    axios
      .post(
        config.api + '/review/' + productId,
        {
          review: formData.review,
        },
        { headers: { Authorization: `Bearer ${store.tokenCookie}` } }
      )
      .then((response: AxiosResponse) => {
        router.push('/');
        getReviews();
      })
      .catch((error: AxiosError) => {
        const data: ErrorData = error?.response?.data;
      });
  });

  // Get reviews
  useEffect(() => {
    if (productId) {
      getReviews();
    }
  }, [productId]);

  return (
    <div>
      <form onSubmit={handlePostReview}>
        <div className='my-3'>
          <input
            className='px-4 w-full border-2 py-2 rounded-md text-sm outline-none'
            type='text'
            placeholder='Write your review here'
            {...registerForm('review', {
              required: true,
            })}
          />
        </div>
        <div className='my-5'>
          <button className='w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100'>
            Post Review
          </button>
        </div>
      </form>
      {reviews ? (
        <div>
          {reviews.map(review => (
            <div key={review._id}>
              <p>USERNAME : {review.username}</p>
              <p>REVIEW : {review.review}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No Reviews Found.</p>
      )}
    </div>
  );
};
