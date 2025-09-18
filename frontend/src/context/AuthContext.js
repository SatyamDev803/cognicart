// src/context/AuthContext.js
"use client";
// Add useCallback to the import
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import apiClient from '@/lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        try {
          const response = await apiClient.get('/auth/me');
          setUser(response.data);
        } catch (error) {
          console.error("Session restore failed", error);
          localStorage.removeItem('authToken');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  // Wrap the login function in useCallback
  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await apiClient.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const { access_token } = response.data;
      localStorage.setItem('authToken', access_token);
      setToken(access_token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      const userProfileResponse = await apiClient.get('/auth/me');
      setUser(userProfileResponse.data);

      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      localStorage.removeItem('authToken');
      setLoading(false);
      return { success: false, message: error.response?.data?.detail || "Login failed" };
    }
  }, []);

  // Wrap the loginWithToken function in useCallback
  const loginWithToken = useCallback(async (token) => {
    setLoading(true);
    try {
      localStorage.setItem('authToken', token);
      setToken(token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userProfileResponse = await apiClient.get('/auth/me');
      setUser(userProfileResponse.data);

      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Token login failed:", error);
      localStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
      setLoading(false);
      return { success: false };
    }
  }, []);

  // Wrap the register function in useCallback
  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      await apiClient.post('/auth/register', { name, email, password });
      setLoading(false);
      return await login(email, password);
    } catch (error) {
      console.error("Registration failed:", error);
      setLoading(false);
      return { success: false, message: error.response?.data?.detail || "Registration failed" };
    }
  }, [login]); // login is a dependency here

  // Wrap the logout function in useCallback
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
    delete apiClient.defaults.headers.common['Authorization'];
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, loginWithToken, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);