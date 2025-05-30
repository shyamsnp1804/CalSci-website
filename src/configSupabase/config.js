import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://czxnvqwbwszzfgecpkbi.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6eG52cXdid3N6emZnZWNwa2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MzA1MzgsImV4cCI6MjA2MzMwNjUzOH0.1E7zyHeqSQuNIrK-pgN2hakhFzT3KZYds0lVLNCGnhQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);