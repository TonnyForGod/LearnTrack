import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import './App.css'
import TestSignup from './pages/TestSignup'
import { supabase } from './lib/supabaseClient'  // Add this import

function App() {
  // Add this temporary test useEffect
  useEffect(() => {
    console.log('🔍 App component mounted - checking Supabase configuration:')
    console.log('Supabase URL:', supabase.supabaseUrl)
    console.log('Is Supabase URL (should be true):', supabase.supabaseUrl.includes('supabase.co'))

    // Test the connection by getting the session
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('❌ Supabase connection test failed:', error)
      } else {
        console.log('✅ Supabase connection test passed, session:', data.session ? 'present' : 'absent')
      }
    })

    // Test a direct auth call
    const testAuth = async () => {
      const { data, error } = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'testpassword123'
      })
      console.log('Direct auth test:', error ? `❌ ${error.message}` : '✅ Auth test passed')
    }
    
    testAuth()
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test-signup" element={<TestSignup />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
