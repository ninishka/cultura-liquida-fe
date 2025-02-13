'use client';

import { useState } from 'react';
import { useLoginMutation } from '@/lib/redux/slices/authApi';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
  
  const handleLogin = async () => {
    await login(password);
  };

  if (!isSuccess) {
    return (
      <div style={{ margin: '20px' }}>
        <h1>Password</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={isLoading} style={{ margin: '20px' }}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {isError && <p style={{ color: 'red' }}>Invalid password</p>}
      </div>
    );
  }

  return <>{children}</>;
}
