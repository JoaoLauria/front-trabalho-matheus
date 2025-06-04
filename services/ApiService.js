// Serviço para lidar com chamadas à API
const API_BASE_URL = 'http://localhost:8000';

export const ApiService = {
  // Buscar todas as categorias
  fetchCategorias: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar categorias: ${response.status}`);
      }
      const data = await response.json();
      // Garantir que sempre retorne um array
      return Array.isArray(data) ? data : (data.results || []);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
  },

  // Buscar produtos com filtros opcionais
  fetchProdutos: async (categoriaId = '', busca = '') => {
    try {
      let url = `${API_BASE_URL}/products/?`;
      
      if (categoriaId) {
        url += `category=${categoriaId}&`;
      }
      
      if (busca) {
        url += `search=${encodeURIComponent(busca)}&`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ao buscar produtos: ${response.status}`);
      }
      const data = await response.json();
      // Garantir que sempre retorne um array
      return Array.isArray(data) ? data : (data.results || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  },

  // Buscar adicionais de um produto específico
  fetchAdicionais: async (produtoId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${produtoId}/additionals/`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar adicionais: ${response.status}`);
      }
      const data = await response.json();
      // Garantir que sempre retorne um array
      return Array.isArray(data) ? data : (data.results || []);
    } catch (error) {
      console.error(`Erro ao buscar adicionais para o produto ${produtoId}:`, error);
      return [];
    }
  },

  // Criar um novo pedido
  criarPedido: async (pedidoData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Erro ao criar pedido: ${response.status} ${JSON.stringify(errorData)}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  }
};

export default ApiService;
