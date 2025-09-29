import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate, Link } from 'react-router-dom'
import './NewSignup.css'

export default function NewSignup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    userType: 'student',
    department: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.department.trim()) {
      setError('Department is required')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      console.log('🚀 Starting signup process...')
      console.log('Form data:', { 
        email: formData.email, 
        userType: formData.userType,
        hasPassword: !!formData.password 
      })

      // Direct Supabase signup call
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            user_type: formData.userType,
            full_name: formData.fullName,
            department: formData.department
          }
        }
      })

      console.log('📨 Supabase response:', { data, error })

      if (error) {
        console.error('❌ Signup error:', error)
        
        // User-friendly error messages
        if (error.message.includes('User already registered')) {
          setError('An account with this email already exists. Please sign in instead.')
        } else if (error.message.includes('Invalid email')) {
          setError('Please enter a valid email address.')
        } else if (error.message.includes('Email rate limit')) {
          setError('Too many attempts. Please try again in a few minutes.')
        } else {
          setError(`Signup failed: ${error.message}`)
        }
      } else {
        console.log('✅ Signup successful!', data)
        setSuccess(true)
        
        // Auto-create user profile in database
        if (data.user) {
          try {
            const { error: profileError } = await supabase
              .from('users')
              .insert([
                {
                  id: data.user.id,
                  email: data.user.email,
                  full_name: formData.fullName,
                  user_type: formData.userType,
                  department: formData.department
                }
              ])

            if (profileError) {
              console.warn('⚠️ Profile creation warning:', profileError)
              // Don't show this error to user - it's not critical
            } else {
              console.log('✅ User profile created successfully')
            }
          } catch (profileErr) {
            console.warn('⚠️ Profile creation error (non-critical):', profileErr)
          }
        }

        // Redirect to dashboard after a brief delay
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      }
    } catch (err) {
      console.error('💥 Unexpected error:', err)
      setError('An unexpected error occurred. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="new-signup-container">
      <div className="new-signup-card">
        <div className="signup-header">
          <h1>Join LearnTrack</h1>
          <p>Create your University of Mpumalanga account</p>
        </div>

        {/* Debug Info - Remove in production */}
        <div className="debug-info">
          <small>Supabase URL: {supabase.supabaseUrl}</small>
          <small>Using Supabase: {supabase.supabaseUrl.includes('supabase.co') ? '✅' : '❌'}</small>
        </div>

        {error && (
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <div className="error-text">
              <strong>Error</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="success-message">
            <div className="success-icon">🎉</div>
            <div className="success-text">
              <strong>Account Created Successfully!</strong>
              <p>Redirecting you to your dashboard...</p>
            </div>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">University Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.name@ump.ac.za"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="userType">I am a *</label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Computer Science"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="At least 6 characters"
                  minLength="6"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter your password"
                  disabled={loading}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="signup-button"
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        )}

        <div className="signup-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
