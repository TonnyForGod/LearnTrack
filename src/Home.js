import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="home">
      <nav className="navbar">
        <div className="nav-brand">LearnTrack</div>
        <div className="nav-links">
          {user ? (
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link primary">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <main className="hero">
        <h1>Welcome to LearnTrack</h1>
        <p>Your one-stop platform for academic growth at University of Mpumalanga</p>
        
        {user ? (
          <div className="hero-actions">
            <Link to="/dashboard" className="cta-button">
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="hero-actions">
            <Link to="/register" className="cta-button">
              Get Started
            </Link>
            <Link to="/login" className="cta-button secondary">
              Sign In
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
