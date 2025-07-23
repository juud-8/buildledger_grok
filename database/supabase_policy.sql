-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY user_access ON users
  FOR ALL
  USING (auth.uid() = id);

-- Policies for clients table
CREATE POLICY client_access ON clients
  FOR ALL
  USING (user_id = auth.uid());

-- Policies for invoices table
CREATE POLICY invoice_access ON invoices
  FOR ALL
  USING (user_id = auth.uid());

-- Policies for invoice_items table
CREATE POLICY invoice_item_access ON invoice_items
  FOR ALL
  USING (
    invoice_id IN (
      SELECT id FROM invoices WHERE user_id = auth.uid()
    )
  );

-- Policies for quotes table
CREATE POLICY quote_access ON quotes
  FOR ALL
  USING (user_id = auth.uid());

-- Policies for quote_items table
CREATE POLICY quote_item_access ON quote_items
  FOR ALL
  USING (
    quote_id IN (
      SELECT id FROM quotes WHERE user_id = auth.uid()
    )
  );

-- Policies for expenses table
CREATE POLICY expense_access ON expenses
  FOR ALL
  USING (user_id = auth.uid());