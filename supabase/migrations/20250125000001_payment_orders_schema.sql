-- Tạo bảng payment_orders để lưu trạng thái đơn hàng
CREATE TABLE IF NOT EXISTS payment_orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tạo bảng payment_notifications để gửi real-time updates
CREATE TABLE IF NOT EXISTS payment_notifications (
  id SERIAL PRIMARY KEY,
  order_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('approved', 'rejected')),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Tạo index để tối ưu query
CREATE INDEX IF NOT EXISTS idx_payment_orders_customer_status ON payment_orders(customer_name, status);
CREATE INDEX IF NOT EXISTS idx_payment_notifications_order_id ON payment_notifications(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_notifications_customer_read ON payment_notifications(customer_name, read);

-- Enable Row Level Security
ALTER TABLE payment_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_notifications ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho payment_orders
CREATE POLICY "Allow all operations on payment_orders" ON payment_orders
  FOR ALL USING (true);

-- Tạo policy cho payment_notifications  
CREATE POLICY "Allow all operations on payment_notifications" ON payment_notifications
  FOR ALL USING (true);

-- Tạo function để tự động cập nhật updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Tạo trigger để tự động cập nhật updated_at khi có thay đổi
CREATE TRIGGER update_payment_orders_updated_at 
  BEFORE UPDATE ON payment_orders 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();