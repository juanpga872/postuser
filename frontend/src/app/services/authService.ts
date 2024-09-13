interface UserLog {
  email: string;
  password: string;
}

// Función para iniciar sesión de un usuario
const loginUser = async ({ email, password }: UserLog) => {
  const response = await fetch('http://localhost:3060/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en el inicio de sesión');
  }

  return response.json();
};

export default loginUser
