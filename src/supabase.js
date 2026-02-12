import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ebiphhyulkzbbkxxgxhf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViaXBoaHl1bGt6YmJreHhneGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MTIxMzYsImV4cCI6MjA4NjQ4ODEzNn0.p1ZJpCByAnEBrmQYUhOfc9dKLAIzkzI2M1e8Jvpafh4'
);

export default supabase;
