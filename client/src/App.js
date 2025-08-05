
import React, { useState } from 'react';
function App() {
  const [dialect, setDialect] = useState('postgresql');
  const [schema, setSchema] = useState('');
  const [query, setQuery] = useState('');
  const [sql, setSQL] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const handleConvert = async () => {
    if (!query.trim()) {
      showToastMessage('Please enter a query', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dialect,
          schema,
          query,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSQL(data.sql);
      showToastMessage('SQL generated successfully!');
    } catch (error) {
      console.error('Error generating SQL:', error);
      setSQL('-- Failed to generate SQL\n-- Error: ' + error.message);
      showToastMessage('Failed to generate SQL', 'error');
    }
    setLoading(false);
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      showToastMessage('SQL copied to clipboard!');
    } catch (error) {
      showToastMessage('Failed to copy SQL', 'error');
    }
  };
  const handleClear = () => {
    setQuery('');
    setSchema('');
    setSQL('');
  };
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    toast: {
      position: 'fixed',
      top: '16px',
      right: '16px',
      zIndex: 50,
      padding: '12px 24px',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transform: 'translateX(0)',
      transition: 'all 0.3s ease'
    },
    toastSuccess: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    toastError: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    header: {
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb'
    },
    headerContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 16px'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logo: {
      width: '32px',
      height: '32px',
      background: 'linear-gradient(to right, #2563eb, #4f46e5)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logoText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px'
    },
    brandName: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#111827'
    },
    nav: {
      display: 'none',
      gap: '32px',
      '@media (min-width: 768px)': {
        display: 'flex'
      }
    },
    navLink: {
      color: '#6b7280',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'color 0.2s ease',
      ':hover': {
        color: '#111827'
      }
    },
    hero: {
      position: 'relative',
      backgroundColor: 'white',
      padding: '80px 0'
    },
    heroContainer: {
      maxWidth: '896px',
      margin: '0 auto',
      textAlign: 'center',
      padding: '0 16px'
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '24px',
      lineHeight: '1.1',
      '@media (min-width: 768px)': {
        fontSize: '4rem'
      }
    },
    gradientText: {
      background: 'linear-gradient(to right, #2563eb, #4f46e5)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    heroSubtitle: {
      fontSize: '20px',
      color: '#6b7280',
      marginBottom: '32px',
      maxWidth: '512px',
      margin: '0 auto 32px auto'
    },
    heroButton: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '12px 32px',
      backgroundColor: '#2563eb',
      color: 'white',
      fontWeight: '500',
      borderRadius: '8px',
      textDecoration: 'none',
      transition: 'background-color 0.2s ease',
      border: 'none',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#1d4ed8'
      }
    },
    features: {
      padding: '80px 0',
      backgroundColor: '#f9fafb'
    },
    featuresContainer: {
      maxWidth: '1152px',
      margin: '0 auto',
      padding: '0 16px'
    },
    featuresHeader: {
      textAlign: 'center',
      marginBottom: '64px'
    },
    featuresTitle: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '16px'
    },
    featuresSubtitle: {
      fontSize: '18px',
      color: '#6b7280'
    },
    featuresGrid: {
      display: 'grid',
      gap: '32px',
      '@media (min-width: 768px)': {
        gridTemplateColumns: 'repeat(3, 1fr)'
      }
    },
    featureCard: {
      backgroundColor: 'white',
      padding: '32px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid #f3f4f6',
      transition: 'box-shadow 0.2s ease',
      ':hover': {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }
    },
    featureIcon: {
      width: '32px',
      height: '32px',
      color: '#2563eb',
      marginBottom: '16px'
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '12px'
    },
    featureDescription: {
      color: '#6b7280',
      lineHeight: '1.6'
    },
    demo: {
      padding: '80px 0',
      backgroundColor: 'white'
    },
    demoContainer: {
      maxWidth: '896px',
      margin: '0 auto',
      padding: '0 16px'
    },
    demoHeader: {
      textAlign: 'center',
      marginBottom: '48px'
    },
    demoTitle: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '16px'
    },
    demoSubtitle: {
      fontSize: '18px',
      color: '#6b7280'
    },
    demoCard: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '16px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      overflow: 'hidden'
    },
    configSection: {
      padding: '24px',
      backgroundColor: '#f9fafb',
      borderBottom: '1px solid #e5e7eb'
    },
    configContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      '@media (min-width: 640px)': {
        flexDirection: 'row'
      }
    },
    configSelect: {
      flex: 1
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.2s ease',
      ':focus': {
        borderColor: '#2563eb',
        boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
      }
    },
    buttonGroup: {
      display: 'flex',
      gap: '8px'
    },
    clearButton: {
      padding: '8px 16px',
      color: '#6b7280',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#f9fafb'
      }
    },
    inputSection: {
      padding: '24px'
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    textareaContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      outline: 'none',
      resize: 'none',
      fontSize: '14px',
      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
      transition: 'all 0.2s ease',
      ':focus': {
        borderColor: '#2563eb',
        boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
      }
    },
    queryTextarea: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    convertButton: {
      width: '100%',
      padding: '12px 32px',
      backgroundColor: '#2563eb',
      color: 'white',
      fontWeight: '500',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      ':hover': {
        backgroundColor: '#1d4ed8'
      },
      ':disabled': {
        opacity: 0.5,
        cursor: 'not-allowed'
      },
      '@media (min-width: 640px)': {
        width: 'auto'
      }
    },
    spinner: {
      width: '16px',
      height: '16px',
      border: '2px solid transparent',
      borderTop: '2px solid currentColor',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    outputSection: {
      borderTop: '1px solid #e5e7eb'
    },
    outputContainer: {
      padding: '24px'
    },
    outputHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    outputTitle: {
      fontSize: '18px',
      fontWeight: '500',
      color: '#111827'
    },
    copyButton: {
      padding: '8px 16px',
      color: '#2563eb',
      border: '1px solid #bfdbfe',
      borderRadius: '8px',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      ':hover': {
        backgroundColor: '#eff6ff'
      }
    },
    codeBlock: {
      backgroundColor: '#111827',
      borderRadius: '8px',
      padding: '16px',
      overflowX: 'auto'
    },
    code: {
      fontSize: '14px',
      color: '#f3f4f6',
      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
      whiteSpace: 'pre-wrap'
    },
    footer: {
      backgroundColor: '#111827',
      color: 'white',
      padding: '48px 0'
    },
    footerContainer: {
      maxWidth: '1152px',
      margin: '0 auto',
      padding: '0 16px'
    },
    footerContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      '@media (min-width: 768px)': {
        flexDirection: 'row'
      }
    },
    footerLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px',
      '@media (min-width: 768px)': {
        marginBottom: 0
      }
    },
    footerBrand: {
      fontSize: '20px',
      fontWeight: '600'
    },
    footerText: {
      color: '#9ca3af',
      fontSize: '14px'
    }
  };
  // Add CSS keyframes for spinner animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return (
    <div style={styles.container}>
      {/* Toast Notification */}
      {showToast && (
        <div style={{
          ...styles.toast,
          ...(toastType === 'success' ? styles.toastSuccess : styles.toastError)
        }}>
          {toastMessage}
        </div>
      )}
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.headerContent}>
            <div style={styles.logoContainer}>
              <div style={styles.logo}>
                <span style={styles.logoText}>NL</span>
              </div>
              <h1 style={styles.brandName}>NL2SQL Pro</h1>
            </div>
            <nav style={styles.nav}>
              <a href="#features" style={styles.navLink}>Features</a>
              <a href="#demo" style={styles.navLink}>Demo</a>
              <a href="#" style={styles.navLink}>Docs</a>
            </nav>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <h2 style={styles.heroTitle}>
            Natural Language to
            <span style={styles.gradientText}> SQL</span>
          </h2>
          <p style={styles.heroSubtitle}>
            Transform your plain English queries into optimized SQL statements instantly. 
            No SQL knowledge required.
          </p>
          <a href="#demo" style={styles.heroButton}>
            Try Demo
            <svg style={{ marginLeft: '8px', width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" style={styles.features}>
        <div style={styles.featuresContainer}>
          <div style={styles.featuresHeader}>
            <h3 style={styles.featuresTitle}>Why Choose NL2SQL Pro?</h3>
            <p style={styles.featuresSubtitle}>Powerful features designed for developers and analysts</p>
          </div>
          
          <div style={styles.featuresGrid}>
            {[
              {
                icon: (
                  <svg style={styles.featureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "AI-Powered Intelligence",
                description: "Advanced language models understand complex queries and generate optimized SQL with intelligent context awareness."
              },
              {
                icon: (
                  <svg style={styles.featureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Schema Integration",
                description: "Provide your database schema for contextually accurate queries that respect your table structures and relationships."
              },
              {
                icon: (
                  <svg style={styles.featureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Lightning Fast",
                description: "Get instant results with sub-second response times. No waiting, no complexity - just pure efficiency."
              }
            ].map((feature, index) => (
              <div key={index} style={styles.featureCard}>
                <div>
                  {feature.icon}
                </div>
                <h4 style={styles.featureTitle}>{feature.title}</h4>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Demo Section */}
      <section id="demo" style={styles.demo}>
        <div style={styles.demoContainer}>
          <div style={styles.demoHeader}>
            <h3 style={styles.demoTitle}>Try It Live</h3>
            <p style={styles.demoSubtitle}>Experience the power of natural language to SQL conversion</p>
          </div>
          <div style={styles.demoCard}>
            {/* Configuration */}
            <div style={styles.configSection}>
              <div style={styles.configContainer}>
                <div style={styles.configSelect}>
                  <label style={styles.label}>SQL Dialect</label>
                  <select
                    value={dialect}
                    onChange={(e) => setDialect(e.target.value)}
                    style={styles.select}
                  >
                    <option value="postgresql">PostgreSQL</option>
                    <option value="mysql">MySQL</option>
                    <option value="sqlite">SQLite</option>
                    <option value="mssql">SQL Server</option>
                  </select>
                </div>
                <div style={styles.buttonGroup}>
                  <button
                    onClick={handleClear}
                    style={styles.clearButton}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
            {/* Input Section */}
            <div style={styles.inputSection}>
              <div style={styles.inputContainer}>
                {/* Schema Input */}
                <div style={styles.textareaContainer}>
                  <label style={styles.label}>
                    Database Schema <span style={{ color: '#9ca3af' }}>(optional)</span>
                  </label>
                  <textarea
                    value={schema}
                    onChange={(e) => setSchema(e.target.value)}
                    placeholder={`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  age INTEGER,
  created_at TIMESTAMP
);`}
                    style={styles.textarea}
                    rows={7}
                  />
                </div>
                {/* Query Input */}
                <div style={styles.textareaContainer}>
                  <label style={styles.label}>
                    Natural Language Query
                  </label>
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Show me all users who are older than 18, ordered by when they joined"
                    style={{ ...styles.textarea, ...styles.queryTextarea }}
                    rows={3}
                  />
                </div>
                {/* Convert Button */}
                <button
                  onClick={handleConvert}
                  disabled={loading}
                  style={styles.convertButton}
                >
                  {loading ? (
                    <>
                      <div style={styles.spinner}></div>
                      Converting...
                    </>
                  ) : (
                    <>
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Convert to SQL
                    </>
                  )}
                </button>
              </div>
            </div>
            {/* Output Section */}
            {sql && (
              <div style={styles.outputSection}>
                <div style={styles.outputContainer}>
                  <div style={styles.outputHeader}>
                    <h4 style={styles.outputTitle}>Generated SQL</h4>
                    <button
                      onClick={handleCopy}
                      style={styles.copyButton}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </button>
                  </div>
                  <div style={styles.codeBlock}>
                    <pre style={styles.code}>{sql}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerContent}>
            <div style={styles.footerLogo}>
              <div style={styles.logo}>
                <span style={styles.logoText}>NL</span>
              </div>
              <span style={styles.footerBrand}>NL2SQL Pro</span>
            </div>
            <p style={styles.footerText}>
              © {new Date().getFullYear()} NL2SQL Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
