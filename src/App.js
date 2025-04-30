import React from 'react';
import Header from './components/Header';
import AboutPage from './components/AboutPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AboutPage />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 ExploreRoute. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
