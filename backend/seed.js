import { configDotenv } from 'dotenv'
import { Product } from './src/models/product.model.js'

configDotenv({})

import mongoose from 'mongoose'
import { faker } from '@faker-js/faker';

const categories = ["Mens", "Women", "Kids", "Footwear", "Accessories", "Bags", "Jewelry", "Watches", "Sportswear", "Winterwear", "Ethnic Wear", "Innerwear", "Beauty"];

const namesByCategory = {
  'Mens': ['Shirt', 'Formal Trousers', 'Polo T-Shirt', 'Blazer', 'Chinos', 'Denim Jacket'],
  'Women': ['Kurti', 'Maxi Dress', 'Blouse', 'Palazzo Pants', 'Crop Top', 'Skirt'],
  'Kids': ['Kids T-Shirt', 'Kids Shorts', 'Kids Dungaree', 'Kids Pajama Set', 'Kids Hoodie'],
  'Footwear': ['Running Shoes', 'Sneakers', 'Sandals', 'Loafers', 'Boots', 'Flip Flops'],
  'Accessories': ['Sunglasses', 'Belt', 'Wallet', 'Cap', 'Scarf', 'Tie'],
  'Bags': ['Backpack', 'Tote Bag', 'Sling Bag', 'Duffel Bag', 'Laptop Bag'],
  'Jewelry': ['Necklace', 'Earrings', 'Bracelet', 'Ring', 'Pendant Set'],
  'Watches': ['Analog Watch', 'Digital Watch', 'Smart Watch', 'Chronograph Watch'],
  'Sportswear': ['Track Jacket', 'Gym Shorts', 'Compression Tee', 'Joggers', 'Sports Bra'],
  'Winterwear': ['Wool Sweater', 'Puffer Jacket', 'Thermal Set', 'Muffler', 'Fleece Hoodie'],
  'Ethnic Wear': ['Saree', 'Kurta Pajama', 'Lehenga', 'Sherwani', 'Anarkali Suit'],
  'Innerwear': ['Boxer Briefs', 'Vest', 'Bra', 'Thermal Innerwear', 'Cotton Briefs'],
  'Beauty': ['Face Serum', 'Lipstick', 'Moisturizer', 'Perfume', 'Sunscreen']
};

const imageMap = {
  'Mens': 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400',
  'Women': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
  'Kids': 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400',
  'Footwear': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
  'Accessories': 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400',
  'Bags': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
  'Jewelry': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  'Watches': 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
  'Sportswear': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
  'Winterwear': 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400',
  'Ethnic Wear': 'https://images.unsplash.com/photo-1610189844302-6c4bad4b6d70?w=400',
  'Innerwear': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
  'Beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'
};

const generateProducts = (count) => {
  const products = []

  for (let i = 0; i < count; i++) {
    const category = faker.helpers.arrayElement(categories)
    products.push({
      name: faker.helpers.arrayElement(namesByCategory[category]),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 500, max: 5000 })),
      category: category,
      image: imageMap[category],
      isFeatured: false,
      createdAt: faker.date.past(),
    });
  }

  return products
}


const seeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongodb connected`)

    await Product.deleteMany({})
    console.log(`🗑️ product deleted`)

    const products = generateProducts(10000)

    await Product.insertMany(products)
    console.log(`successfully added 10000 products`)

    process.exit(0)
  } catch (error) {
    console.log(`error from seeding, ${error}`)
    process.exit(1)
  }
}


seeDatabase()