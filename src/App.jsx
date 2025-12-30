// Top-level app layout and routing; edit routes or global wrappers here.
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  useEffect(() => {
    document.documentElement.style.setProperty('--font-family', 'var(--font-base)');
    document.documentElement.style.setProperty('--blog-font', 'var(--font-base)');
  }, []);

  return (
    <div className="app-shell">
      <ScrollToTop />
      <ScrollToHash />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<div style={{ padding: '20px' }}>Loading…</div>}>
              <BlogIndex />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<div style={{ padding: '20px' }}>Loading…</div>}>
              <BlogPostPage />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
