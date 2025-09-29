// src/components/DebugAuth.js
import { useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function DebugAuth() {
  useEffect(() => {
    console.log('🔍 Current Auth Configuration:')
    console.log('- Supabase URL:', process.env.REACT_APP_SUPABASE_URL)
    console.log('- Current Domain:', window.location.origin)
    
    // Test the actual Supabase instance
    const testConnection = async () => {
      const { data, error } = await supabase.auth.getSession()
      console.log('Connection test:', { data, error })
    }
    
    testConnection()
  }, [])

  return null
}
