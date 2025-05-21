'use client';

import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { useLoginMutation } from '@/lib/redux/slices/authApi';
import { Input, Button } from 'antd';
import type { InputRef } from 'antd';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
  const inputRef = useRef<InputRef>(null);
  
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, []);

  const handleLogin = async () => await login(password);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleLogin()
  };

  if (!isSuccess) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '73.8vh'
      }}>
        <div style={{ width: '300px', textAlign: 'center' }}>
          <h2 style={{ color: '#F2C94C', marginBottom: '20px' }}>ADM</h2>
          <Input.Password
            ref={inputRef}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ marginBottom: '15px' }}
          />
          <Button 
            type="primary" 
            onClick={handleLogin} 
            loading={isLoading}
            style={{ background: '#F2C94C', borderColor: '#F2C94C', color: 'black' }}
          >
            Login
          </Button>
          {isError && <p style={{ color: 'red', marginTop: '10px' }}>Invalid password</p>}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
