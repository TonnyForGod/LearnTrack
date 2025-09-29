import { createClient } from '@supabase/supabase-js'

// Use your actual Supabase credentials directly (temporarily for testing)
const supabaseUrl = 'https://ibhusesudujlyfluspzq.supabase.co'  // Replace with your actual URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaHVzZXN1ZHVqbHlmbHVzcHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwOTgzNDksImV4cCI6MjA3NDY3NDM0OX0.GiNvkUqHpnGF2v5yHzHuOgXeWs15Xr1Y4iEefowWSzo'         // Replace with your actual anon key

console.log('🔧 Supabase Client Initialized:', { 
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey 
})

// Create Supabase client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit'
  }
})
