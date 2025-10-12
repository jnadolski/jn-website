import { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import TerminalBootScreen from './components/TerminalBootScreen';

function App() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
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
