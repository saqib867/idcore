-- Create Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  is_guest BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) DEFAULT 0 CHECK(price >= 0),
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0 CHECK(stock_quantity >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_amount NUMERIC(10, 2) DEFAULT 0 CHECK(total_amount >= 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL CHECK(quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL CHECK(unit_price >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE UNIQUE NOT NULL,
  amount NUMERIC(10, 2) NOT NULL CHECK(amount >= 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) - Basic Setup (optional, adapt to your needs)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow read access to products and categories for everyone
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);

-- Allow users to read their own content (if auth is set up, assuming auth.uid() == id)
-- Guest users can be handled via cookies or local storage referencing the users.id
-- For now, letting an open access for demonstration, but secure it in production.
CREATE POLICY "Allow users to read their own data" ON users FOR SELECT USING (true);
CREATE POLICY "Allow users to read their own orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow users to read their own order items" ON order_items FOR SELECT USING (true);
CREATE POLICY "Allow users to read their own payments" ON payments FOR SELECT USING (true);

-- In a real app, you'd add INSERT/UPDATE/DELETE policies to restrict writing data appropriately
