export interface Addition {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'SMASH BURGERS' | 'CHICKEN COLLECTION' | 'SALADS' | 'APPETIZERS' | 'SAUCES' | 'ADDITIONS';
  price: number;
  priceLarge?: number; // for items like onion rings (60 / 80 EGP)
  description: string;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  defaultIngredients?: string[];
  isSauceOrAddition?: boolean;
}

export const MENU_ADDITIONS: Addition[] = [
  { id: 'extra-cheese', name: 'Extra Cheese', price: 20 },
  { id: 'extra-bacon', name: 'Extra Bacon', price: 20 },
  { id: 'extra-crispy-chicken', name: 'Extra Crispy Chicken', price: 40 },
  { id: 'extra-mushroom', name: 'Extra Mushroom', price: 30 },
  { id: 'jalapeno', name: 'Jalapeño', price: 25 },
];

export const MENU_SAUCES: Addition[] = [
  { id: 'bb-sauce', name: 'BB Sauce', price: 25 },
  { id: 'ranch', name: 'Ranch', price: 30 },
  { id: 'buffalo', name: 'Buffalo', price: 25 },
  { id: 'bbq', name: 'BBQ', price: 20 },
  { id: 'cheddar', name: 'Cheddar', price: 30 },
  { id: 'spicy-sauce', name: 'Spicy Sauce', price: 35 },
];

export const MENU_ITEMS: Product[] = [
  // SMASH BURGERS
  {
    id: 'bb-classic',
    name: 'BB Classic',
    category: 'SMASH BURGERS',
    price: 180,
    description: 'Double smashed 100% Angus beef patties, double American cheddar, signature BB secret sauce, dill pickles, grilled onions on toasted brioche.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
    popular: true,
    defaultIngredients: ['Double Angus Patty', 'American Cheddar', 'BB Secret Sauce', 'Dill Pickles', 'Grilled Onions', 'Brioche Bun'],
  },
  {
    id: 'truffle-smash',
    name: 'Truffle Smash',
    category: 'SMASH BURGERS',
    price: 200,
    description: 'Double smashed Angus beef, rich white truffle aioli, melted Swiss cheese, caramelized balsamic onions, roasted wild mushrooms.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1000&auto=format&fit=crop',
    popular: true,
    defaultIngredients: ['Double Angus Patty', 'Truffle Aioli', 'Swiss Cheese', 'Caramelized Onions', 'Wild Mushrooms'],
  },
  {
    id: 'chipotle-smash',
    name: 'Chipotle Smash',
    category: 'SMASH BURGERS',
    price: 220,
    description: 'Double smashed Angus beef, smoked chipotle mayo, melted pepper jack cheese, crispy fried onion strings, spicy jalapeños.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop',
    spicy: true,
    defaultIngredients: ['Double Angus Patty', 'Chipotle Mayo', 'Pepper Jack Cheese', 'Crispy Onion Strings', 'Jalapeños'],
  },
  {
    id: 'mexicali-smash',
    name: 'Mexicali Smash',
    category: 'SMASH BURGERS',
    price: 200,
    description: 'Double smashed Angus beef patty, fresh house guacamole cream, melted cheddar, pico de gallo, smoky chipotle drizzle.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?q=80&w=1000&auto=format&fit=crop',
    defaultIngredients: ['Double Angus Patty', 'House Guacamole', 'Melted Cheddar', 'Pico de Gallo', 'Chipotle Drizzle'],
  },
  {
    id: 'ranchavoo-smash',
    name: 'Ranchavoo Smash',
    category: 'SMASH BURGERS',
    price: 200,
    description: 'Double smashed Angus beef, creamy house garlic ranch, fresh avocado slices, crispy smoked bacon strip, sharp melted cheddar.',
    image: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?q=80&w=1000&auto=format&fit=crop',
    defaultIngredients: ['Double Angus Patty', 'Garlic Ranch', 'Fresh Avocado', 'Smoked Bacon', 'Sharp Cheddar'],
  },

  // CHICKEN COLLECTION
  {
    id: 'bb-chicken',
    name: 'BB Chicken',
    category: 'CHICKEN COLLECTION',
    price: 180,
    description: 'Hand-breaded golden crispy chicken breast, signature BB house sauce, crisp dill pickles, shredded iceberg lettuce, butter-toasted brioche.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=1000&auto=format&fit=crop',
    popular: true,
    defaultIngredients: ['Crispy Chicken Breast', 'BB House Sauce', 'Dill Pickles', 'Shredded Lettuce', 'Brioche Bun'],
  },
  {
    id: 'buffalo-chicken',
    name: 'Buffalo Chicken',
    category: 'CHICKEN COLLECTION',
    price: 200,
    description: 'Crispy fried chicken fillet smothered in fiery cayenne buffalo glaze, cool house buttermilk ranch, blue cheese crumbles, crisp lettuce.',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1000&auto=format&fit=crop',
    spicy: true,
    defaultIngredients: ['Buffalo Chicken Breast', 'Cayenne Glaze', 'House Ranch', 'Blue Cheese Crumbles', 'Shredded Lettuce'],
  },
  {
    id: 'chickenito',
    name: 'Chickenito',
    category: 'CHICKEN COLLECTION',
    price: 200,
    description: 'Crispy chicken breast topped with gooey melted cheddar, smoky crispy bacon, hot jalapeños, and smoky honey BBQ ranch sauce.',
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?q=80&w=1000&auto=format&fit=crop',
    spicy: true,
    defaultIngredients: ['Crispy Chicken Breast', 'Melted Cheddar', 'Smoked Bacon', 'Jalapeños', 'BBQ Ranch'],
  },

  // SALADS
  {
    id: 'bb-salad',
    name: 'BB Salad',
    category: 'SALADS',
    price: 180,
    description: 'Fresh farm green mix, sweet cherry tomatoes, sliced avocado, charred sweet corn, crispy bacon bits, served with signature BB dressing.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop',
    defaultIngredients: ['Mixed Greens', 'Cherry Tomatoes', 'Avocado', 'Charred Corn', 'Bacon Bits', 'BB Dressing'],
  },
  {
    id: 'caesar-salad',
    name: 'Caesar Salad',
    category: 'SALADS',
    price: 170,
    description: 'Crisp romaine hearts, shaved aged parmesan cheese, house-baked garlic butter croutons, creamy classic Caesar dressing.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1000&auto=format&fit=crop',
    defaultIngredients: ['Romaine Hearts', 'Shaved Parmesan', 'Garlic Croutons', 'Caesar Dressing'],
  },

  // APPETIZERS
  {
    id: 'mozzarella-sticks',
    name: 'Mozzarella Sticks',
    category: 'APPETIZERS',
    price: 70,
    description: 'Golden Italian herb breaded mozzarella sticks with an irresistible stretchy cheese pull, served with warm house marinara.',
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    category: 'APPETIZERS',
    price: 60,
    priceLarge: 80,
    description: 'Thick-cut sweet onions double-dipped in crispy beer batter, fried golden brown and served with BB dipping sauce.',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'sweet-corn',
    name: 'Sweet Corn',
    category: 'APPETIZERS',
    price: 150,
    description: 'Char-grilled sweet yellow corn cob slathered in chili lime compound butter, cotija cheese, and smoked paprika.',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'bb-beef-chaos',
    name: 'BB Beef Chaos',
    category: 'APPETIZERS',
    price: 190,
    description: 'Signature Chaos Tray! Golden seasoned fries loaded with smashed Angus beef crumbles, rich melted cheddar cheese sauce, pickled jalapeños, and BB house sauce.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=1000&auto=format&fit=crop',
    popular: true,
    spicy: true,
  },
  {
    id: 'bb-chicken-chaos',
    name: 'BB Chicken Chaos',
    category: 'APPETIZERS',
    price: 170,
    description: 'Loaded fries tray piled high with crispy buffalo chicken bites, warm cheddar cheese sauce, cool buttermilk ranch, and fresh chopped scallions.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=1000&auto=format&fit=crop',
    popular: true,
    spicy: true,
  },

  // SAUCES
  {
    id: 'sauce-bb',
    name: 'BB Sauce',
    category: 'SAUCES',
    price: 25,
    description: 'Our proprietary smoky-sweet secret smash sauce with pickle relish and subtle spice.',
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?q=80&w=1000&auto=format&fit=crop',
    isSauceOrAddition: true,
  },
  {
    id: 'sauce-ranch',
    name: 'Ranch Sauce',
    category: 'SAUCES',
    price: 30,
    description: 'Creamy buttermilk ranch crafted in-house with fresh herbs and roasted garlic.',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=1000&auto=format&fit=crop',
    isSauceOrAddition: true,
  },
  {
    id: 'sauce-buffalo',
    name: 'Buffalo Sauce',
    category: 'SAUCES',
    price: 25,
    description: 'Classic fiery cayenne pepper hot sauce with rich butter kick.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
    isSauceOrAddition: true,
  },
  {
    id: 'sauce-bbq',
    name: 'BBQ Sauce',
    category: 'SAUCES',
    price: 20,
    description: 'Rich hickory smoked sweet & savory barbecue sauce.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=1000&auto=format&fit=crop',
    isSauceOrAddition: true,
  },
  {
    id: 'sauce-cheddar',
    name: 'Cheddar Dip',
    category: 'SAUCES',
    price: 30,
    description: 'Warm liquid cheddar cheese dip for ultimate burger or fries dipping.',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1000&auto=format&fit=crop',
    isSauceOrAddition: true,
  },
  {
    id: 'sauce-spicy',
    name: 'Spicy Sauce',
    category: 'SAUCES',
    price: 35,
    description: 'Ghost pepper infused intense habanero drizzle for true heat seekers.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop',
    isSauceOrAddition: true,
  },
];
