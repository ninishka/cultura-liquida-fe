'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { Suspense } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === process.env.RESEND_API_KEY) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      alert('Wrong password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ margin: '20px' }}>
        <h1>Password</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} style={{ margin: '20px' }}>
          Login
        </button>
      </div>
    );
  }

  return <Suspense>{children}</Suspense>;
}
