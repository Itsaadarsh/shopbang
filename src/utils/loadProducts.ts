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
    tags: ['Buzzcut', 'Headphones', 'Round Glasses', 'Bare Chest', 'Basketball', 'Gold Chain'],
    price: 90,
    image: 'https://meebits.larvalabs.com/meebitimages/characterimage?index=13&type=full',
  },
  {
    name: 'Bang $5',
    tags: ['Blonde', 'Halter Top', 'Skirt', 'Skater'],
    price: 70,
    image: 'https://meebits.larvalabs.com/meebitimages/characterimage?index=6&type=full',
  },
  {
    name: 'Bang $6',
    tags: ['Bald', 'Gray', 'Snoutz Tee', 'Purple', 'Black'],
    price: 30,
    image: 'https://meebits.larvalabs.com/meebitimages/characterimage?index=45&type=full',
  },
  {
    name: 'Bang $7',
    tags: ['Spiky', 'Full', 'Specs', 'Hoodie', 'Jeans', 'Tops'],
    price: 65,
    image: 'https://meebits.larvalabs.com/meebitimages/characterimage?index=48&type=full',
  },
  {
    name: 'Bang $8',
    tags: ['Fade', 'Logo Tee', 'Ripped Jeans', 'Workboots'],
    price: 10,
    image: 'https://meebits.larvalabs.com/meebitimages/characterimage?index=33&type=full',
  },
  {
    name: 'Bang $9',
    tags: ['Long', 'Halter Top', 'Camo', 'Canvas'],
    price: 50,
    image: 'https://meebits.larvalabs.com/meebitimages/characterimage?index=12&type=full',
  },
  {
    name: 'Bang $10',
    tags: ['Buzzcut', 'Brimmed', 'Tee', 'Dark Gray', 'Skater'],
    price: 20,
    image: 'https://meebits.larvalabs.com/meebitimages/characterimage?index=14&type=full',
  },
];

const insertProducts = async () => {
  await productModel.insertMany(products);
};

export default insertProducts;
