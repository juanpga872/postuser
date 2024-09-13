'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import loginUser from '../services/authService'; 
import LoginForm from '../ui/LoginForm';

interface UserLog {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>(''); 
  const router = useRouter(); 

  const handleLogin = async (user: UserLog) => {
    try {
      const data = await loginUser(user);
      localStorage.setItem('token', data.token);
  
      // Extraer user_id del objeto user
      const userId = data.user.id; // Aquí estamos accediendo a `user.id`
      localStorage.setItem('user_id', userId.toString()); // Asegúrate de convertirlo a string
  
      router.push('/home');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Iniciar sesión</Title>
        <LoginForm onSubmit={handleLogin} error={error} />
        <TextCenter>
          <LoginLink href="/register">¿No tienes una cuenta? Regístrate</LoginLink>
        </TextCenter>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;

// Estilos organizados
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const TextCenter = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const LoginLink = styled(Link)`
  color: #0070f3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Ajustes para los inputs dentro del formulario
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #0070f3;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;

  &:hover {
    background-color: #005bb5;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-align: center;
`;


