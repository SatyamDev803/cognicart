// src/app/auth/callback/page.jsx
"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithToken } = useAuth(); // We will create this function next

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      const performLogin = async () => {
        const result = await loginWithToken(token);
        if (result.success) {
          router.push('/dashboard');
        } else {
          // Handle error, maybe redirect to login with an error message
          router.push('/login?error=auth_failed');
        }
      };
      performLogin();
    } else {
      // No token found, redirect to login
      router.push('/login?error=no_token');
    }
  }, [searchParams, router, loginWithToken]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Authenticating, please wait...</p>
    </div>
  );
}

// Wrap the component in Suspense because useSearchParams requires it
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallback />
    </Suspense>
  );
}