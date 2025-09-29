import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, signOut, loading } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to LearnTrack</h1>
        <button onClick={handleSignOut} className="sign-out-btn">
          Sign Out
        </button>
      </header>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Hello, {user.user_metadata?.full_name || user.email}!</h2>
          <p>User Type: {user.user_metadata?.user_type}</p>
          <p>Department: {user.user_metadata?.department}</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>My Courses</h3>
            <p>View and manage your enrolled courses</p>
            <button className="card-button">View Courses</button>
          </div>

          <div className="dashboard-card">
            <h3>Community</h3>
            <p>Connect with other students and lecturers</p>
            <button className="card-button">Join Community</button>
          </div>

          <div className="dashboard-card">
            <h3>Certificates</h3>
            <p>Track your learning achievements</p>
            <button className="card-button">View Certificates</button>
          </div>
        </div>
      </div>
    </div>
  )
}
