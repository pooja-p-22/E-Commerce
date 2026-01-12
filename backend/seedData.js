const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');
const connectDB = require('./db-connect/db');

dotenv.config();

const categories = [
  { name: 'Fruits', slug: 'fruits', image: '/Fruits-Bg.jpg' },
  { name: 'Vegetables', slug: 'vegetables', image: '/Grocery-Bg.jpg' },
  { name: 'Dairy', slug: 'dairy', image: '/DiaryBg.jpg' },
  { name: 'Grocery', slug: 'grocery', image: '/Grocery-Bg2.jpg' },
  { name: 'Snacks', slug: 'snacks', image: '/Snacks-Bg.jpg' },
  { name: 'Beverages', slug: 'beverages', image: '/Tea.jpg' }
];

const products = [
  {
    name: 'Fresh Apples',
    brand: 'FreshFarm',
    description: 'Crisp and sweet red apples, perfect for snacking',
    images: ['/apple.jpg'],
    unitPrice: 120,
    unitType: 'kg',
    stockQuantity: 50,
    isOrganic: true,
    categorySlug: 'fruits'
  },
  {
    name: 'Ripe Bananas',
    brand: 'TropicalFresh',
    description: 'Sweet and nutritious bananas, rich in potassium',
    images: ['/banana.jpg'],
    unitPrice: 60,
    unitType: 'kg',
    stockQuantity: 75,
    isOrganic: false,
    categorySlug: 'fruits'
  },
  {
    name: 'Fresh Oranges',
    brand: 'CitrusFresh',
    description: 'Juicy oranges packed with vitamin C',
    images: ['/orange.jpg'],
    unitPrice: 80,
    unitType: 'kg',
    stockQuantity: 40,
    isOrganic: true,
    categorySlug: 'fruits'
  },
  {
    name: 'Fresh Pineapple',
    brand: 'TropicalFresh',
    description: 'Sweet and tangy pineapple, rich in enzymes',
    images: ['/pineapple.jpg'],
    unitPrice: 100,
    unitType: 'unit',
    stockQuantity: 20,
    isOrganic: false,
    categorySlug: 'fruits'
  },
  {
    name: 'Fresh Strawberries',
    brand: 'BerryFresh',
    description: 'Sweet and juicy strawberries, perfect for desserts',
    images: ['/strawberry.jpg'],
    unitPrice: 200,
    unitType: 'kg',
    stockQuantity: 30,
    isOrganic: true,
    categorySlug: 'fruits'
  },
  {
    name: 'Fresh Blueberries',
    brand: 'BerryFresh',
    description: 'Antioxidant-rich blueberries, great for health',
    images: ['/blueberry.jpg'],
    unitPrice: 250,
    unitType: 'kg',
    stockQuantity: 25,
    isOrganic: true,
    categorySlug: 'fruits'
  },
  {
    name: 'Fresh Watermelon',
    brand: 'TropicalFresh',
    description: 'Refreshing watermelon, perfect for summer',
    images: ['/watermelon.jpg'],
    unitPrice: 40,
    unitType: 'kg',
    stockQuantity: 35,
    isOrganic: false,
    categorySlug: 'fruits'
  },
  {
    name: 'Fresh Mango',
    brand: 'TropicalFresh',
    description: 'Sweet and tropical mangoes, rich in vitamins',
    images: ['/mango.jpg'],
    unitPrice: 180,
    unitType: 'kg',
    stockQuantity: 25,
    isOrganic: true,
    categorySlug: 'fruits'
  },
  {
    name: 'Fresh Guava',
    brand: 'TropicalFresh',
    description: 'Sweet and aromatic guavas, high in vitamin C',
    images: ['/guava.jpg'],
    unitPrice: 90,
    unitType: 'kg',
    stockQuantity: 30,
    isOrganic: false,
    categorySlug: 'fruits'
  },
  {
    name: 'Fresh Carrots',
    brand: 'VeggieFresh',
    description: 'Crunchy orange carrots, great for cooking and snacking',
    images: ['/carrot.jpg'],
    unitPrice: 45,
    unitType: 'kg',
    stockQuantity: 60,
    isOrganic: true,
    categorySlug: 'vegetables'
  },
  {
    name: 'Fresh Tomatoes',
    brand: 'VeggieFresh',
    description: 'Red ripe tomatoes, perfect for salads and cooking',
    images: ['/tomato.jpg'],
    unitPrice: 35,
    unitType: 'kg',
    stockQuantity: 80,
    isOrganic: false,
    categorySlug: 'vegetables'
  },
  {
    name: 'Fresh Lettuce',
    brand: 'GreenLeaf',
    description: 'Crisp lettuce leaves, ideal for salads',
    images: ['/lettuce.jpg'],
    unitPrice: 25,
    unitType: 'unit',
    stockQuantity: 30,
    isOrganic: true,
    categorySlug: 'vegetables'
  },
  {
    name: 'Fresh Corn',
    brand: 'VeggieFresh',
    description: 'Sweet corn kernels, perfect for cooking',
    images: ['/corn.jpg'],
    unitPrice: 50,
    unitType: 'kg',
    stockQuantity: 40,
    isOrganic: false,
    categorySlug: 'vegetables'
  },
  {
    name: 'Fresh Broccoli',
    brand: 'GreenFresh',
    description: 'Nutritious broccoli florets, rich in vitamins',
    images: ['/Brocoli.jpg'],
    unitPrice: 80,
    unitType: 'kg',
    stockQuantity: 35,
    isOrganic: true,
    categorySlug: 'vegetables'
  },
  {
    name: 'Fresh Onions',
    brand: 'VeggieFresh',
    description: 'Fresh red onions, essential for cooking',
    images: ['/onion.jpg'],
    unitPrice: 30,
    unitType: 'kg',
    stockQuantity: 100,
    isOrganic: false,
    categorySlug: 'vegetables'
  },
  {
    name: 'Fresh Cauliflower',
    brand: 'GreenFresh',
    description: 'Fresh cauliflower heads, great for curries',
    images: ['/CauliFlower.jpg'],
    unitPrice: 60,
    unitType: 'kg',
    stockQuantity: 25,
    isOrganic: true,
    categorySlug: 'vegetables'
  },
  {
    name: 'Fresh Potatoes',
    brand: 'FarmFresh',
    description: 'Fresh potatoes, perfect for various dishes',
    images: ['/potato.jpg'],
    unitPrice: 25,
    unitType: 'kg',
    stockQuantity: 150,
    isOrganic: false,
    categorySlug: 'vegetables'
  },
  {
    name: 'Fresh Milk',
    brand: 'DairyBest',
    description: 'Pure and fresh cow milk, rich in calcium',
    images: ['/milk.jpg'],
    unitPrice: 55,
    unitType: 'liter',
    stockQuantity: 100,
    isOrganic: false,
    categorySlug: 'dairy'
  },
  {
    name: 'Greek Yogurt',
    brand: 'HealthyDairy',
    description: 'Creamy Greek yogurt with probiotics',
    images: ['/yogurt.jpg'],
    unitPrice: 85,
    unitType: 'unit',
    stockQuantity: 45,
    isOrganic: true,
    categorySlug: 'dairy'
  },
  {
    name: 'Cheddar Cheese',
    brand: 'CheeseWorld',
    description: 'Aged cheddar cheese with rich flavor',
    images: ['/cheese.jpg'],
    unitPrice: 250,
    unitType: 'unit',
    stockQuantity: 25,
    isOrganic: false,
    categorySlug: 'dairy'
  },
  {
    name: 'Dark Chocolate',
    brand: 'CocoaRich',
    description: 'Premium dark chocolate, rich and creamy',
    images: ['/chocolate.jpg'],
    unitPrice: 150,
    unitType: 'unit',
    stockQuantity: 40,
    isOrganic: true,
    categorySlug: 'dairy'
  },
  {
    name: 'Pure Ghee',
    brand: 'DairyBest',
    description: 'Pure clarified butter, traditional and healthy',
    images: ['/ghee.jpg'],
    unitPrice: 320,
    unitType: 'unit',
    stockQuantity: 30,
    isOrganic: true,
    categorySlug: 'dairy'
  },
  {
    name: 'Fresh Butter',
    brand: 'CreamyDairy',
    description: 'Fresh creamy butter, perfect for cooking',
    images: ['/butter.jpg'],
    unitPrice: 180,
    unitType: 'unit',
    stockQuantity: 35,
    isOrganic: false,
    categorySlug: 'dairy'
  },
  {
    name: 'Vanilla Ice Cream',
    brand: 'FrozenDelight',
    description: 'Creamy vanilla ice cream, perfect dessert',
    images: ['/icecream.jpg'],
    unitPrice: 200,
    unitType: 'unit',
    stockQuantity: 20,
    isOrganic: false,
    categorySlug: 'dairy'
  },
  {
    name: 'Whipped Cream',
    brand: 'DairyBest',
    description: 'Light and fluffy whipped cream for desserts',
    images: ['/whipped.jpg'],
    unitPrice: 120,
    unitType: 'unit',
    stockQuantity: 25,
    isOrganic: true,
    categorySlug: 'dairy'
  },
  {
    name: 'Basmati Rice',
    brand: 'GrainMaster',
    description: 'Premium long-grain basmati rice',
    images: ['/rice.jpg'],
    unitPrice: 150,
    unitType: 'kg',
    stockQuantity: 200,
    isOrganic: false,
    categorySlug: 'grocery'
  },
  {
    name: 'Whole Wheat Pasta',
    brand: 'HealthyGrains',
    description: 'Nutritious whole wheat pasta',
    images: ['/pasta.jpg'],
    unitPrice: 95,
    unitType: 'pack',
    stockQuantity: 75,
    isOrganic: true,
    categorySlug: 'grocery'
  },
  {
    name: 'Table Salt',
    brand: 'PureSalt',
    description: 'Pure refined table salt for cooking',
    images: ['/salt.jpg'],
    unitPrice: 20,
    unitType: 'kg',
    stockQuantity: 100,
    isOrganic: false,
    categorySlug: 'grocery'
  },
  {
    name: 'Whole Wheat Flour',
    brand: 'GrainMaster',
    description: 'Fresh whole wheat flour, perfect for rotis',
    images: ['/wheat.jpg'],
    unitPrice: 45,
    unitType: 'kg',
    stockQuantity: 80,
    isOrganic: true,
    categorySlug: 'grocery'
  },
  {
    name: 'All Purpose Flour (Maida)',
    brand: 'FlourMills',
    description: 'Fine all-purpose flour for baking and cooking',
    images: ['/maida.jpg'],
    unitPrice: 40,
    unitType: 'kg',
    stockQuantity: 70,
    isOrganic: false,
    categorySlug: 'grocery'
  },
  {
    name: 'Coffee Powder',
    brand: 'RoastMaster',
    description: 'Premium ground coffee powder, rich aroma',
    images: ['/coffee.jpg'],
    unitPrice: 280,
    unitType: 'pack',
    stockQuantity: 40,
    isOrganic: true,
    categorySlug: 'grocery'
  },
  {
    name: 'Tea Leaves',
    brand: 'TeaMaster',
    description: 'Premium black tea leaves, fresh and aromatic',
    images: ['/tealeaves.jpg'],
    unitPrice: 150,
    unitType: 'pack',
    stockQuantity: 60,
    isOrganic: true,
    categorySlug: 'grocery'
  },
  {
    name: 'Mixed Spices',
    brand: 'SpiceKing',
    description: 'Aromatic mixed spices for Indian cooking',
    images: ['/spices.jpg'],
    unitPrice: 120,
    unitType: 'pack',
    stockQuantity: 50,
    isOrganic: false,
    categorySlug: 'grocery'
  },
  {
    name: 'Mixed Nuts',
    brand: 'NutHouse',
    description: 'Premium mixed nuts for healthy snacking',
    images: ['/nuts.jpg'],
    unitPrice: 320,
    unitType: 'pack',
    stockQuantity: 40,
    isOrganic: true,
    categorySlug: 'snacks'
  },
  {
    name: 'Potato Chips',
    brand: 'CrunchyBites',
    description: 'Crispy potato chips with sea salt',
    images: ['/chips.jpg'],
    unitPrice: 45,
    unitType: 'pack',
    stockQuantity: 90,
    isOrganic: false,
    categorySlug: 'snacks'
  },
  {
    name: 'Chocolate Cookies',
    brand: 'SweetTreats',
    description: 'Delicious chocolate chip cookies',
    images: ['/cookies.jpg'],
    unitPrice: 65,
    unitType: 'pack',
    stockQuantity: 55,
    isOrganic: false,
    categorySlug: 'snacks'
  },
  {
    name: 'Chocolate Cake',
    brand: 'SweetTreats',
    description: 'Rich and moist chocolate cake',
    images: ['/cake.jpg'],
    unitPrice: 180,
    unitType: 'unit',
    stockQuantity: 25,
    isOrganic: false,
    categorySlug: 'snacks'
  },
  {
    name: 'Steamed Momos',
    brand: 'StreetFood',
    description: 'Delicious steamed momos with spicy filling',
    images: ['/momos.jpg'],
    unitPrice: 80,
    unitType: 'pack',
    stockQuantity: 30,
    isOrganic: false,
    categorySlug: 'snacks'
  },
  {
    name: 'Apple Pie',
    brand: 'SweetTreats',
    description: 'Fresh baked apple pie with crispy crust',
    images: ['/pie.jpg'],
    unitPrice: 220,
    unitType: 'unit',
    stockQuantity: 15,
    isOrganic: true,
    categorySlug: 'snacks'
  },

  {
    name: 'Chocolate Muffin',
    brand: 'BakeryFresh',
    description: 'Soft and fluffy chocolate muffins',
    images: ['/muffin.jpg'],
    unitPrice: 60,
    unitType: 'unit',
    stockQuantity: 40,
    isOrganic: false,
    categorySlug: 'snacks'
  },
  {
    name: 'Cream Biscuits',
    brand: 'CrunchyBites',
    description: 'Crispy cream biscuits, perfect with tea',
    images: ['/biscuit.jpg'],
    unitPrice: 35,
    unitType: 'pack',
    stockQuantity: 60,
    isOrganic: false,
    categorySlug: 'snacks'
  },
  {
    name: 'Fresh Apple Juice',
    brand: 'FreshJuice',
    description: 'Pure apple juice with no added sugar',
    images: ['/apple-juice.jpg'],
    unitPrice: 85,
    unitType: 'liter',
    stockQuantity: 40,
    isOrganic: true,
    categorySlug: 'beverages'
  },
  {
    name: 'Banana Smoothie',
    brand: 'SmoothieCo',
    description: 'Creamy banana smoothie drink',
    images: ['/Banana-juice.jpg'],
    unitPrice: 75,
    unitType: 'liter',
    stockQuantity: 35,
    isOrganic: false,
    categorySlug: 'beverages'
  },
  {
    name: 'Fresh Orange Juice',
    brand: 'CitrusFresh',
    description: 'Freshly squeezed orange juice',
    images: ['/orange-juice.jpg'],
    unitPrice: 90,
    unitType: 'liter',
    stockQuantity: 45,
    isOrganic: true,
    categorySlug: 'beverages'
  },
  {
    name: 'Watermelon Juice',
    brand: 'TropicalFresh',
    description: 'Refreshing watermelon juice',
    images: ['/watermelon-juice.jpg'],
    unitPrice: 70,
    unitType: 'liter',
    stockQuantity: 30,
    isOrganic: false,
    categorySlug: 'beverages'
  },
  {
    name: 'Green Tea',
    brand: 'TeaMaster',
    description: 'Premium green tea leaves',
    images: ['/Tea.jpg'],
    unitPrice: 120,
    unitType: 'pack',
    stockQuantity: 60,
    isOrganic: true,
    categorySlug: 'beverages'
  },
  {
    name: 'Coca Cola',
    brand: 'CocaCola',
    description: 'Refreshing cola drink, ice cold',
    images: ['/coke.jpg'],
    unitPrice: 40,
    unitType: 'unit',
    stockQuantity: 100,
    isOrganic: false,
    categorySlug: 'beverages'
  },
  {
    name: 'Chocolate Milkshake',
    brand: 'SmoothieCo',
    description: 'Creamy chocolate milkshake, rich and delicious',
    images: ['/milkshake.jpg'],
    unitPrice: 95,
    unitType: 'unit',
    stockQuantity: 30,
    isOrganic: false,
    categorySlug: 'beverages'
  },
  {
    name: 'Tender Coconut Water',
    brand: 'TropicalPure',
    description: 'Fresh tender coconut water, naturally sweet',
    images: ['/TenderCoconut.jpg'],
    unitPrice: 50,
    unitType: 'unit',
    stockQuantity: 40,
    isOrganic: true,
    categorySlug: 'beverages'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories created:', createdCategories.length);
    
    // Create category map for easy lookup
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });
    
    // Add category IDs to products
    const productsWithCategories = products.map(product => ({
      ...product,
      category: categoryMap[product.categorySlug]
    }));
    
    // Remove categorySlug as it's not in the schema
    productsWithCategories.forEach(product => {
      delete product.categorySlug;
    });
    
    // Create products
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log('Products created:', createdProducts.length);
    
    console.log('Database seeded successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();