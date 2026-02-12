import { useState, useEffect } from 'react';
import Header from './sections/Header';
import Footer from './sections/Footer';
import BackToTop from './components/ui/custom/BackToTop';

// Pages
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import './App.css';

// Simple router using hash
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Check hash on load
    const hash = window.location.hash.replace('#/', '') || 'home';
    setCurrentPage(hash);

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#/', '') || 'home';
      setCurrentPage(newHash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'services':
        return <ServicesPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {/* Main Content */}
      <main>
        {renderPage()}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default App;
