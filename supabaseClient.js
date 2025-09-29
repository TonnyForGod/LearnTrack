import { createClient } from '@supabase/supabase-js'

// ⚠️ REPLACE THESE WITH YOUR ACTUAL SUPABASE CREDENTIALS ⚠️
const supabaseUrl = 'https://ibhusesudujlyfluspzq.supabase.co'  // ← Your actual Project URL
const supabaseAnonKey = ''  // ← Your actual anon key

import { createClient } from '@supabase/supabase-js'

// ⚠️ REPLACE WITH YOUR ACTUAL CREDENTIALS ⚠️
const supabaseUrl = 'https://ibhusesudujlyfluspzq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.esb_publishable_Aru02HFUDK24gbpceV6AEQ_uTVNYVpO'

console.log('🔧 Supabase Client Initialized')
console.log('URL:', supabaseUrl)
console.log('Is Supabase URL:', supabaseUrl.includes('supabase.co'))

export const supabase = createClient(supabaseUrl, supabaseKey)
