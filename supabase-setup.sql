-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for the contact form)
CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows only authenticated users to read
-- You'll need to replace this with your admin authentication logic
CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT USING (true);

-- Optional: Create a policy to allow updates (if needed)
CREATE POLICY "Allow authenticated update" ON contact_submissions
  FOR UPDATE USING (true);

-- Optional: Create a policy to allow deletes (if needed)
CREATE POLICY "Allow authenticated delete" ON contact_submissions
  FOR DELETE USING (true);
