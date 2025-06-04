/**
 * URL base da API
 */
const API_BASE_URL = 'http://localhost:8000';

/**
 * Função auxiliar para processar respostas da API
 * @param {Response} response - Resposta da API
 * @returns {Object} Objeto contendo data e error
 */
const handleResponse = async (response) => {
  try {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        error: `Erro na requisição: ${response.status} ${JSON.stringify(errorData)}`,
        data: null 
      };
    }
    
    const responseData = await response.json();
    const data = Array.isArray(responseData) ? responseData : (responseData.results || responseData || []);
    return { data, error: null };
  } catch (error) {
    console.error('Erro ao processar resposta:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Serviço de API centralizado para comunicação com o backend
 * Todos os métodos seguem o padrão de retorno { data, error }
 */
export const ApiService = {
  /**
   * Métodos relacionados a usuários
   */
  users: {
    /**
     * Cria um novo usuário
     * @param {Object} userData - Dados do usuário
     * @returns {Promise<Object>} { data, error }
     */
    createUser: async (userData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
        
        return await handleResponse(response);
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return { data: null, error: error.message };
      }
    },
    
    /**
     * Autentica um usuário
     * @param {string} email - Email do usuário
     * @param {string} password - Senha do usuário
     * @returns {Promise<Object>} { data: { access }, error }
     */
    login: async (email, password) => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });
        
        return await handleResponse(response);
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        return { data: null, error: error.message };
      }
    },
  },
  
  /**
   * Métodos relacionados a categorias de produtos
   */
  categories: {
    /**
     * Busca todas as categorias
     * @returns {Promise<Object>} { data: Array<Category>, error }
     */
    getAllCategories: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories/`);
        return await handleResponse(response);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        return { data: null, error: error.message };
      }
    }
  },
  
  /**
   * Métodos relacionados a produtos
   */
  products: {
    /**
     * Busca produtos por categoria
     * @param {number} categoryId - ID da categoria
     * @returns {Promise<Object>} { data: Array<Product>, error }
     */
    getProductsByCategory: async (categoryId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/?category=${categoryId}`);
        return await handleResponse(response);
      } catch (error) {
        console.error(`Erro ao buscar produtos da categoria ${categoryId}:`, error);
        return { data: null, error: error.message };
      }
    },
    
    /**
     * Busca produtos
     * @param {Object} params - Parâmetros de busca
     * @param {string} params.category - Categoria do produto
     * @param {string} params.search - Termo de busca
     * @returns {Promise<Object>} { data: Array<Product>, error }
     */
    getProducts: async ({ category = '', search = '' } = {}) => {
      try {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        
        const response = await fetch(`${API_BASE_URL}/products/?${params}`);
        return await handleResponse(response);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return { data: null, error: error.message };
      }
    },
    
    /**
     * Busca adicionais disponíveis para um produto
     * @param {number} productId - ID do produto
     * @returns {Promise<Object>} { data: Array<Additional>, error }
     */
    getProductAdditionals: async (productId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}/additionals/`);
        return await handleResponse(response);
      } catch (error) {
        console.error(`Erro ao buscar adicionais para o produto ${productId}:`, error);
        return { data: null, error: error.message };
      }
    }
  },
  
  /**
   * Métodos relacionados a pedidos
   */
  orders: {
    /**
     * Cria um novo pedido
     * @param {Object} orderData - Dados do pedido
     * @param {number} orderData.table - ID da mesa
     * @param {Array<Object>} orderData.items - Itens do pedido
     * @returns {Promise<Object>} { data, error }
     */
    createOrder: async (orderData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/orders/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData)
        });
        
        return await handleResponse(response);
      } catch (error) {
        console.error('Erro ao criar pedido:', error);
        return { data: null, error: error.message };
      }
    },
    
    /**
     * Busca pedidos de uma mesa específica
     * @param {number} tableId - ID da mesa
     * @returns {Promise<Object>} { data: Array<Order>, error }
     */
    getOrdersByTable: async (tableId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/tables/${tableId}/orders/`);
        return await handleResponse(response);
      } catch (error) {
        console.error(`Erro ao buscar pedidos da mesa ${tableId}:`, error);
        return { data: null, error: error.message };
      }
    },
    
    /**
     * Atualiza o status de um pedido
     * @param {number} orderId - ID do pedido
     * @param {string} status - Novo status (Pendente, Finalizado, Cancelado)
     * @returns {Promise<Object>} { data, error }
     */
    updateOrderStatus: async (orderId, status) => {
      try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status })
        });
        
        return await handleResponse(response);
      } catch (error) {
        console.error(`Erro ao atualizar status do pedido ${orderId}:`, error);
        return { data: null, error: error.message };
      }
    }
  },
  
  /**
   * Métodos relacionados a mesas
   */
  tables: {
    /**
     * Busca todas as mesas
     * @returns {Promise<Object>} { data: Array<Table>, error }
     */
    getAllTables: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tables/`);
        return await handleResponse(response);
      } catch (error) {
        console.error('Erro ao buscar mesas:', error);
        return { data: null, error: error.message };
      }
    },
    
    /**
     * Cria uma nova mesa
     * @param {Object} tableData - Dados da mesa
     * @param {number} tableData.table_number - Número da mesa
     * @param {number} tableData.capacity - Capacidade da mesa
     * @returns {Promise<Object>} { data, error }
     */
    createTable: async (tableData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/tables/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tableData)
        });
        
        return await handleResponse(response);
      } catch (error) {
        console.error('Erro ao criar mesa:', error);
        return { data: null, error: error.message };
      }
    },
    
    /**
     * Marca uma mesa como ocupada
     * @param {number} tableId - ID da mesa
     * @param {Object} peopleData - Dados de ocupação
     * @param {number} peopleData.people_count - Número de pessoas na mesa
     * @returns {Promise<Object>} { data, error }
     */
    setTableUnavailable: async (tableId, peopleData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/tables/${tableId}/set-unavailable/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(peopleData)
        });
        
        return await handleResponse(response);
      } catch (error) {
        console.error(`Erro ao ocupar mesa ${tableId}:`, error);
        return { data: null, error: error.message };
      }
    },
    
    /**
     * Marca uma mesa como disponível (libera a mesa)
     * @param {number} tableId - ID da mesa
     * @returns {Promise<Object>} { data, error }
     */
    setTableAvailable: async (tableId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/tables/${tableId}/set-available/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        return await handleResponse(response);
      } catch (error) {
        console.error(`Erro ao liberar mesa ${tableId}:`, error);
        return { data: null, error: error.message };
      }
    }
  }
};

export default ApiService;
