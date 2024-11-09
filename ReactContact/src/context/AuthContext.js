// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setIsAuthenticated(true);
      setUser(storedUser);
      setError('');
    } else {
      setError('E-mail ou senha inválidos');
    }
  };

  const register = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email) {
      setError('Usuário já registrado');
      return;
    }

    const newUser = { email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsAuthenticated(true);
    setUser(newUser);
    setError('');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
