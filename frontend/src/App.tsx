import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Landing from './Landing';
import Projects from './Projects';
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
  const location = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let title = "Jennifer Nadolski";
    switch (location.pathname) {
      case "/":
        title += " | Portfolio";
        break;
      case "/projects":
        title += " | Projects";
        break;

      case "/about":
        title += " | About";
        break;
      case "/login":
        title += " | Login";
        break;
      case "/dashboard":
        title += " | Dashboard";
        break;
      default:
        title += " | Page Not Found";
    }
    document.title = title;
  }, [location]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer32 = new Uint32Array(imageData.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xffffffff;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      drawNoise();
      animationFrameId = requestAnimationFrame(loop);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  /*
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const gradientBg = document.getElementById('gradient-bg');
      const noiseOverlay = document.getElementById('noise-overlay');

      if (gradientBg) {
        gradientBg.style.transform = `translateY(${scrollY * 0.5}px)`;
      }

      if (noiseOverlay) {
        noiseOverlay.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  */

  return (
    <div className="App">
      <div id="gradient-bg"></div>
      <canvas id="noise-overlay" ref={canvasRef}></canvas>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<AnimatedSection><Landing /></AnimatedSection>} />
          <Route path="/login" element={<Login />} />
          <Route path="/projects" element={<AnimatedSection><Projects /></AnimatedSection>} />
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
  );
}

export default App;