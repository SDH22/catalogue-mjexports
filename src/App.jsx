import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/PremiumNavbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Products from './Components/Products';
import ProductDetail from './Components/ProductDetail';
import Collections from './Components/Collections';
import Inspiration from './Components/Inspiration';
import About from './Components/About';
import Contact from './Components/Contact';
import './App.css';

// Enhanced error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '50px', 
          textAlign: 'center',
          backgroundColor: '#fff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ color: 'red', fontSize: '2rem' }}>Something went wrong</h1>
          <details style={{ 
            whiteSpace: 'pre-wrap',
            textAlign: 'left',
            maxWidth: '800px',
            margin: '20px 0',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '5px'
          }}>
            <summary>Error Details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  console.log('App component rendered');

  return (
    <div className="App">
      <Navbar />
      
      <main className="main-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}

export default App;