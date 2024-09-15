// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import AuthPage from './pages/AuthPage'; // Página de login/cadastro
import ContactsPage from './pages/ContactsPage'; // Página de contatos


function App() {
  useEffect(() => {
    // Adiciona dados ao localStorage 
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com', password: '123456' }));
  }, []);

  return (
    <AuthProvider> {}
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
