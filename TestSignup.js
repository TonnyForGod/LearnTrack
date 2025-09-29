import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function TestSignup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult('Testing...')
    
    try {
      console.log('🔄 Starting signup...')
      
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: 'Test User',
            user_type: 'student',
            department: 'Testing'
          }
        }
      })

      console.log('📨 Signup response:', { data, error })

      if (error) {
        setResult(`❌ ERROR: ${error.message}`)
      } else {
        setResult(`✅ SUCCESS! User: ${data.user?.email}, Session: ${data.session ? 'Yes' : 'No'}`)
      }
    } catch (err) {
      setResult(`💥 EXCEPTION: ${err.message}`)
    }
    
    setLoading(false)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Simple Signup Test</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '0.75rem 1.5rem', background: '#007bff', color: 'white', border: 'none' }}
        >
          {loading ? 'Signing Up...' : 'Test Sign Up'}
        </button>
      </form>
      
      {result && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: '#f5f5f5', 
          borderRadius: '4px' 
        }}>
          <strong>Result:</strong>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  )
}
