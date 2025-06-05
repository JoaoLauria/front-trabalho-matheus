
const API_BASE_URL = 'http://localhost:8000/api/';

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
    
    return { data: null, error: error.message };
  }
};

export const ApiService = {
  
  users: {
    
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
        
        return { data: null, error: error.message };
      }
    },
    
    
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
        
        return { data: null, error: error.message };
      }
    },
  },
  
  
  categories: {
    
    getAllCategories: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories/`);
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },

    
    getCategoryById: async (categoryId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/`);
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },

    
    createCategory: async (categoryData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData)
        });
        
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },

    
    updateCategory: async (categoryId, categoryData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData)
        });
        
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },

    
    patchCategory: async (categoryId, categoryData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData)
        });
        
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },

    
    deleteCategory: async (categoryId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/`, {
          method: 'DELETE'
        });
        
        
        if (response.status === 204) {
          return { data: { success: true }, error: null };
        }
        
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    }
  },
  
  
  products: {
    
    getProducts: async ({ category = '', search = '', is_available = '' } = {}) => {
      try {
        let url = `${API_BASE_URL}/products/?`;
        if (category) url += `category=${category}&`;
        if (search) url += `search=${search}&`;
        if (is_available !== '') url += `is_available=${is_available}&`;
        
        const response = await fetch(url);
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },

    
    getProductsByCategory: async (categoryId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/?category=${categoryId}`);
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },

    
    getProductById: async (productId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}/`);
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },

    
    createProduct: async (productData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData)
        });
        
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },

    
    updateProduct: async (productId, productData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData)
        });
        
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },

    
    patchProduct: async (productId, productData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData)
        });
        
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },

    
    deleteProduct: async (productId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}/`, {
          method: 'DELETE',
        });
        
        if (response.status === 204) {
          return { data: true, error: null };
        }
        
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },

    
    getProductAdditionals: async (productId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}/additionals/`);
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },
  },
  
  
  orders: {
    
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
        
        return { data: null, error: error.message };
      }
    },
    
    
    getOrdersByTable: async (tableId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/tables/${tableId}/orders/`);
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },
    
    
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
        
        return { data: null, error: error.message };
      }
    }
  },
  
  
  tables: {
    
    getAllTables: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tables/`);
        return await handleResponse(response);
      } catch (error) {
        
        return { data: null, error: error.message };
      }
    },
    
    
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
        
        return { data: null, error: error.message };
      }
    },
    
    
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
        
        return { data: null, error: error.message };
      }
    },
    
    
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
        
        return { data: null, error: error.message };
      }
    }
  }
};

export default ApiService;
