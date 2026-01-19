import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import CelebrationPage from './components/CelebrationPage';
import LetterPage from './components/LetterPage';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [page, setPage] = useState('login'); // login, celebration, letter

  const handleLoginSuccess = () => {
    setPage('celebration');
  };

  const handleFinishCelebration = () => {
    setPage('letter');
  };

  return (
    <div className="app-container" style={{ width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      <AnimatePresence mode='wait'>
        {page === 'login' && (
          <motion.div
            key="login"
            exit={{ opacity: 0, y: -50 }}
            style={{ width: '100%', height: '100%' }}
            transition={{ duration: 0.5 }}
          >
            <LoginPage onLogin={handleLoginSuccess} />
          </motion.div>
        )}
        {page === 'celebration' && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ width: '100%', height: '100%' }}
            transition={{ duration: 0.8 }}
          >
            <CelebrationPage onNext={handleFinishCelebration} />
          </motion.div>
        )}
        {page === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ width: '100%', height: '100%' }}
            transition={{ duration: 1 }}
          >
            <LetterPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
