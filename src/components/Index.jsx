import React from 'react';
import './Index.css';
import Navbar from './Navbar';

function Index() {
  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src="/logo.jpeg" alt="Career Naksha Logo" className="logo-image" />
          <h1 className="logo-title">Career Naksha</h1>
        </div>
      </header>

      <main className="index-container">
        <Navbar />

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Empower Your Career</h1>
            <p className="hero-description">
              Navigate your career journey with expert insights and guidance tailored to you.
            </p>
            <div className="hero-buttons">
              <button
                className="btn primary-btn"
                onClick={() => console.log('Explore Now Clicked')}>
                Explore Now
              </button>
              <button
                className="btn secondary-btn"
                onClick={() => console.log('Learn More Clicked')}>
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="features-container">
            <h2 className="features-title">Our Features</h2>
            <p className="features-subtitle">
              Unlock tools and resources to shape your career with confidence.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <h3>Personalized Assessments</h3>
                <p>Discover your strengths with in-depth career profiling.</p>
              </div>
              <div className="feature-card">
                <h3>Expert Guidance</h3>
                <p>Connect with industry leaders to gain career insights.</p>
              </div>
              <div className="feature-card">
                <h3>Actionable Resources</h3>
                <p>Access curated tools to achieve your career goals.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Index;
