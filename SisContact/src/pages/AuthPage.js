// src/pages/AuthPage.js
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import styles from './AuthPage.module.css'; // Importação correta do CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.buttonsForm}>
        <div className={styles.btnColor} style={{ left: isLogin ? "0px" : "104px" }}></div>
        <button
          id="btnSignin"
          onClick={() => setIsLogin(true)}
          className={isLogin ? styles.active : ''}
        >
          Entrar
        </button>
        <button
          id="btnSignup"
          onClick={() => setIsLogin(false)}
          className={!isLogin ? styles.active : ''}
        >
          Cadastrar
        </button>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export default AuthPage;
