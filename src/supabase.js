import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ibhusesudujlyfluspzq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaHVzZXN1ZHVqbHlmbHVzcHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwOTgzNDksImV4cCI6MjA3NDY3NDM0OX0.GiNvkUqHpnGF2v5yHzHuOgXeWs15Xr1Y4iEefowWSzo'
export const supabase = createClient(supabaseUrl, supabaseKey)