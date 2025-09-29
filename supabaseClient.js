import { createClient } from '@supabase/supabase-js'

// ⚠️ REPLACE THESE WITH YOUR ACTUAL SUPABASE CREDENTIALS ⚠️
const supabaseUrl = 'https://ibhusesudujlyfluspzq.supabase.co'  // ← Your actual Project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaHVzZXN1ZHVqbHlmbHVzcHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwOTgzNDksImV4cCI6MjA3NDY3NDM0OX0.GiNvkUqHpnGF2v5yHzHuOgXeWs15Xr1Y4iEefowWSzo'  // ← Your actual anon key

console.log('🔐 Supabase Client Initialized with URL:', supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit'
  }
})
