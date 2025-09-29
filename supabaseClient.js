import { createClient } from '@supabase/supabase-js'

// ⚠️ REPLACE THESE WITH YOUR ACTUAL SUPABASE CREDENTIALS ⚠️
const supabaseUrl = 'https://ibhusesudujlyfluspzq.supabase.co'  // ← Your actual Project URL
const supabaseAnonKey = 'esb_publishable_Aru02HFUDK24gbpceV6AEQ_uTVNYVpO'  // ← Your actual anon key

console.log('🔐 Supabase Client Initialized with URL:', supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit'
  }
})
