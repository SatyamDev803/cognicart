"use client";
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import apiClient from '@/lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const initializeAuth = async () => {
      // Optimization: Don't try to fetch a user on public-facing pages.
      if (['/login', '/register', '/'].includes(pathname)) {
        setUser(null);
        setLoading(false);
        return;
      }
      
      try {
        const response = await apiClient.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        // If the /me call fails, there's no valid session.
        setUser(null);
      }
      setLoading(false);
    };
    initializeAuth();
  }, [pathname]); // Re-run this logic every time the page URL changes.

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      await apiClient.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const userProfileResponse = await apiClient.get('/auth/me');
      setUser(userProfileResponse.data);

      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      setUser(null);
      setLoading(false);
      return { success: false, message: error.response?.data?.detail || "Login failed" };
    }
  }, []);
  
  const logout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      window.location.href = '/';
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
        await apiClient.post('/auth/register', { name, email, password });
        return await login(email, password);
    } catch (error) {
        console.error("Registration failed:", error);
        setLoading(false);
        return { success: false, message: error.response?.data?.detail || "Registration failed" };
    }
  }, [login]);
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);