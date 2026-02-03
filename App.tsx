
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Workflow from './components/Workflow';
import TrustSnippet from './components/TrustSnippet';
import Features from './components/Features';
import Mission from './components/Mission';
import SuccessState from './components/SuccessState';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="flex-grow">
        {!isSubmitted ? (
          <>
            <Hero />
            <Workflow />
            <TrustSnippet />
            <Features />
            <Mission onSubmit={handleFormSubmit} />
          </>
        ) : (
          <SuccessState onBack={() => setIsSubmitted(false)} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
