import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Landing from './Landing';
import Projects from './Projects';
import Gallery from './Gallery';
import About from './About';
import Header from './Header';
import Footer from './Footer';
import useFadeInOnScroll from './hooks/useFadeInOnScroll'; // Import the hook
import './App.css';

// Wrapper component for fade-in animation
const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { elementRef, isVisible } = useFadeInOnScroll();
  return (
    <div ref={elementRef} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<AnimatedSection><Landing /></AnimatedSection>} />
            <Route path="/login" element={<Login />} />
            <Route path="/projects" element={<AnimatedSection><Projects /></AnimatedSection>} />
            <Route path="/gallery" element={<AnimatedSection><Gallery /></AnimatedSection>} />
            <Route path="/about" element={<AnimatedSection><About /></AnimatedSection>} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
