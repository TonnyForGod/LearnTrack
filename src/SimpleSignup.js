import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const SimpleSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('Testing Supabase connection...');
      
      // First test if we can reach Supabase
      const { data: testData, error: testError } = await supabase.auth.getSession();
      console.log('Connection test:', testError ? `❌ ${testError.message}` : '✅ Connected');
      
      if (testError) {
        setMessage(`Connection failed: ${testError.message}`);
        setLoading(false);
        return;
      }

      // Try to sign up
      console.log('Attempting signup...');
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            user_type: 'student',
            department: 'Computer Science'
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        setMessage(`Error: ${error.message}`);
      } else {
        console.log('Signup successful:', data);
        setMessage('✅ Account created successfully! Check your email for verification.');
        
        // Clear form
        setEmail('');
        setPassword('');
        setFullName('');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setMessage(`Unexpected error: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>University of Mpumalanga - LearnTrack</p>
        
        {/* Connection Info */}
        <div style={styles.debug}>
          <h4>Connection Status:</h4>
          <p>Supabase URL: {supabase.supabaseUrl}</p>
          <p>Status: {supabase.supabaseUrl.includes('supabase.co') ? '✅ Valid URL' : '❌ Invalid URL'}</p>
        </div>

        {message && (
          <div style={{
            ...styles.message,
            ...(message.includes('✅') ? styles.success : styles.error)
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              disabled={loading}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@ump.ac.za"
              required
              disabled={loading}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
              minLength="6"
              disabled={loading}
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={styles.footer}>
          <p>Already have an account? <a href="/login" style={styles.link}>Sign In</a></p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  card: {
    background: 'white',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '10px'
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '20px'
  },
  debug: {
    background: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  message: {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  success: {
    background: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb'
  },
  error: {
    background: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333'
  },
  input: {
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px'
  },
  button: {
    background: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #eee'
  },
  link: {
    color: '#007bff',
    textDecoration: 'none'
  }
};

export default SimpleSignup;
