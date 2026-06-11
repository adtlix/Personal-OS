import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rzmmsuinuaycxjlukadk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bW1zdWludWF5Y3hqbHVrYWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMzYxMDEsImV4cCI6MjA5NjYxMjEwMX0.QlSZ6JvE_u2NbmFIOgO3rqtK0fZn0RYbbn-TCcwmjns"
);
