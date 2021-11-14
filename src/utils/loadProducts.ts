import productModel from '../models/products';
const products = [
  {
    name: 'Bang $1',
    tags: ['Bald', 'Backward Cap', 'Skull Tee', 'Red Jacket', 'Cargo Pants', 'Work Boots'],
    price: 60,
    image: 'https://meebits.larvalabs.com/meebitimages/characterimage?index=1&type=full',
  },
  {
    name: 'Bang $2',
    tags: ['Simple', 'Full Beard', 'Trucker Cap', 'Hoodie', 'Ripped Jeans', 'Canvas'],
    price: 45,
    image: 'https://meebits.larvalabs.com/meebitimages/characterimage?index=2&type=full',
  },
  {
    name: 'Bang $3',
    tags: ['Very Long', 'Aviators', 'Diagonal Tee', 'Camo', 'Skater'],
    price: 30,
    image: 'https://meebits.larvalabs.com/meebitimages/characterimage?index=3&type=full',
  },
  {
    name: 'Bang $4',
    tags: [
      'Buzzcut',
      'Headphones',
      'Round Glasses',
      'Bare Chest',
      'Athletic Shorts',
      'Basketball',
      'Gold Chain',
    ],
    price: 90,
    image: 'https://meebits.larvalabs.com/meebitimages/characterimage?index=13&type=full',
  },
];

const insertProducts = async () => {
  await productModel.insertMany(products);
};

export default insertProducts;
