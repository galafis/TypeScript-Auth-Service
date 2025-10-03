import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [protectedData, setProtectedData] = useState('');

  const API_BASE_URL = 'http://localhost:3000/api/auth'; // Assuming backend runs on localhost:3000

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setToken('');
    setProtectedData('');

    const endpoint = isLogin ? `${API_BASE_URL}/login` : `${API_BASE_URL}/register`;
    const body = isLogin ? { email, password } : { username, email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        if (isLogin && data.token) {
          setToken(data.token);
          localStorage.setItem('jwtToken', data.token);
        }
      } else {
        setMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Failed to connect to the authentication service.');
    }
  };

  const handleProtectedData = async () => {
    setMessage('');
    setProtectedData('');
    const storedToken = localStorage.getItem('jwtToken');

    if (!storedToken) {
      setMessage('No token found. Please log in first.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/data/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        setProtectedData(data.message);
      } else {
        setMessage(data.message || 'Failed to fetch protected data.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Failed to connect to the protected data service.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TypeScript Auth Service Demo</h1>
        <p>A demonstration of the authentication and authorization service.</p>
      </header>
      <main className="App-main">
        <div className="auth-form-container">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
          {message && <p className="message">{message}</p>}
          {token && <p className="token">Token: {token.substring(0, 30)}...</p>}
        </div>

        <div className="protected-data-container">
          <h2>Protected Data Access</h2>
          <button onClick={handleProtectedData}>Get Protected Data</button>
          {protectedData && <p className="protected-data">{protectedData}</p>}
        </div>
      </main>
    </div>
  );
}

export default App;

