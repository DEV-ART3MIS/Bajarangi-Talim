import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('bt_token') || null);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: 'login', // 'login' or 'register'
    preselectedPlan: null,
  });

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await api.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            // invalid token
            localStorage.removeItem('bt_token');
            setToken(null);
            setUser(null);
          }
        } catch (err) {
          console.warn('Auth check failed:', err);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.success && res.token) {
      localStorage.setItem('bt_token', res.token);
      setToken(res.token);
      setUser(res.user);
      closeAuthModal();
      return { success: true, message: res.message, user: res.user };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    if (res.success && res.token) {
      localStorage.setItem('bt_token', res.token);
      setToken(res.token);
      setUser(res.user);
      closeAuthModal();
      return { success: true, message: res.message, user: res.user };
    }
    return { success: false, message: res.message || 'Registration failed' };
  };

  const oauthLogin = async (oauthData) => {
    const res = await api.oauthLogin(oauthData);
    if (res.success && res.token) {
      localStorage.setItem('bt_token', res.token);
      setToken(res.token);
      setUser(res.user);
      closeAuthModal();
      return { success: true, message: res.message, user: res.user };
    }
    return { success: false, message: res.message || 'OAuth authentication failed' };
  };

  const logout = () => {
    localStorage.removeItem('bt_token');
    setToken(null);
    setUser(null);
  };

  const updateUserState = (updatedUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
  };

  const openAuthModal = (mode = 'login', preselectedPlan = null) => {
    setAuthModal({
      isOpen: true,
      mode,
      preselectedPlan,
    });
  };

  const closeAuthModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        authModal,
        login,
        register,
        oauthLogin,
        logout,
        updateUserState,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

