import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../configSupabase/config';
import { checkUserSession, signOutUser } from '../configSupabase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const { isAuthenticated, user, error } = await checkUserSession();
      setIsAuthenticated(isAuthenticated);
      setUser(user);
      if (error) console.error('Auth init error:', error);
      setLoading(false);
    };
    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const { success, message } = await signOutUser();
    if (!success) console.error('Logout error:', message);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};