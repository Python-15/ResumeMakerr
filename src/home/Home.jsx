import React from 'react'
import Header from '@/components/header/Header'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/dashboard')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <section className="hero">
          <h1>Welcome to Resume Builder</h1>
          <p>Create professional resumes effortlessly</p>
          <button onClick={handleGetStarted} className="cta-button">Get Started</button>
        </section>
        <section className="features">
          <h2>Features</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Easy to Use</h3>
              <p>Our intuitive interface makes resume building a breeze.</p>
            </div>
            <div className="feature-item">
              <h3>Export Options</h3>
              <p>Download your resume in PDF.</p>
            </div>
          </div>
        </section>
        <footer className="footer">
          <p>&copy; Resume Builder. All rights reserved By Aaditya Kumar.</p>
        </footer>
      </div>
    </>
  )
}

export default Home