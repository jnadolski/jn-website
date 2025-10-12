import { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import TerminalBootScreen from './components/TerminalBootScreen';

function App() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Warm-up call to the backend to prevent cold starts on Render
    fetch('https://jennyos-backend.onrender.com/')
      .then(response => {
        if (response.ok) {
          console.log('Backend warm-up successful!');
        } else {
          console.warn('Backend warm-up failed:', response.status);
        }
      })
      .catch(error => console.error('Backend warm-up error:', error));

    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isBooting ? <TerminalBootScreen /> : <Desktop />}
    </>
  );
}

export default App;
