import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
  {
    name: "Premium Wireless Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
    price: 299.99,
  },
  {
    name: "Mechanical Gaming Keyboard",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop&q=60",
    price: 159.99,
  },
  {
    name: "Smart Watch Pro",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=60",
    price: 249.99,
  },
  {
    name: "4K Ultra HD Camera",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60",
    price: 899.99,
  },
  {
    name: "Minimalist Backpack",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60",
    price: 79.99,
  },
  {
    name: "Wireless Gaming Mouse",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&auto=format&fit=crop&q=60",
    price: 89.99,
  },
  {
    name: "Smart Home Speaker",
    image:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=60",
    price: 159.99,
  },
  {
    name: "LED Gaming Monitor",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60",
    price: 449.99,
  },
];

const seedProductsToDatabase = async () => {
  try {
    await sql`TRUNCATE TABLE products RESTART IDENTITY`;
    for (const product of SAMPLE_PRODUCTS) {
      await sql`
        INSERT INTO products (name, image, price) 
        VALUES (${product.name}, ${product.image}, ${product.price})
        `;
    }

    console.log("Products seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding products: ${error}`);
    process.exit(1);
  }
};

seedProductsToDatabase();
