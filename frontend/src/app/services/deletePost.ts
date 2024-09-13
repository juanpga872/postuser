const API_URL = 'http://localhost:3060/api/posts';

// Función para eliminar un post
const deletePost = async (postId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: 'DELETE', // Método para eliminar el post
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Verificamos si la respuesta es satisfactoria
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al eliminar el post');
  }
};

export default deletePost;
