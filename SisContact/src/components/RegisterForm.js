// src/components/RegisterForm.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from '../pages/AuthPage.module.css';

function RegisterForm() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password, confirmPassword); 
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <i className="fas fa-user" style={{ color: 'black', marginRight: '8px' }}></i>
      </div>
      <div className={styles.inputGroup}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <i className="fas fa-envelope" style={{ color: 'black', marginRight: '8px' }}></i>
      </div>
      <div className={styles.inputGroup}>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <i className="fas fa-lock" style={{ color: 'black', marginRight: '8px' }}></i>
      </div>
      <div className={styles.inputGroup}>
        <input
          type="password"
          placeholder="Confirme a Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <i className="fas fa-lock" style={{ color: 'black', marginRight: '8px' }}></i>
      </div>
      <div className={styles.divCheck}>
        <input type="checkbox" />
        <span>Eu aceito os termos e condições</span>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default RegisterForm;
