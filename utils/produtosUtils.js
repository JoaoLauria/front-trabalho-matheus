import ApiService from '../services/ApiService';

export const formatarPreco = (preco) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco);
};

export const carregarDadosProdutos = async () => {
  try {
    const { data: categorias, error: categoriasError } = await ApiService.categories.getAllCategories();
    if (categoriasError) throw new Error(categoriasError);
    
    const { data: produtos, error: produtosError } = await ApiService.products.getProducts();
    if (produtosError) throw new Error(produtosError);
    
    return { 
      produtos, 
      categorias,
      error: null
    };
    
  } catch (error) {
    return { 
      produtos: [], 
      categorias: [],
      error
    };
  }
};

export const aplicarFiltrosProdutos = (produtos, filtros, categorias) => {
  if (!produtos.length) return { produtosFiltrados: [], produtosAgrupados: {} };
  
  let resultado = [...produtos];
  
  if (filtros.nome) {
    const termoBusca = filtros.nome.toLowerCase();
    resultado = resultado.filter(produto => 
      produto.name.toLowerCase().includes(termoBusca) || 
      (produto.description && produto.description.toLowerCase().includes(termoBusca))
    );
  }
  
  if (filtros.categoria) {
    resultado = resultado.filter(produto => produto.category === parseInt(filtros.categoria));
  }
  
  if (filtros.disponibilidade !== '') {
    const disponivel = filtros.disponibilidade === 'true';
    resultado = resultado.filter(produto => produto.is_available === disponivel);
  }
  
  let produtosAgrupados = {};
  if (!filtros.categoria && categorias.length) {
    categorias.forEach(categoria => {
      produtosAgrupados[categoria.id] = {
        categoria: categoria,
        produtos: []
      };
    });
    
    resultado.forEach(produto => {
      if (produtosAgrupados[produto.category]) {
        produtosAgrupados[produto.category].produtos.push(produto);
      }
    });
  }
  
  return { 
    produtosFiltrados: resultado, 
    produtosAgrupados 
  };
};

export const salvarProduto = async (produtoData, id) => {
  try {
    let response;
    
    const dadosProduto = {
      ...produtoData,
      price: parseFloat(String(produtoData.price).replace(',', '.')),
      category: parseInt(produtoData.category)
    };
    
    if (id) {
      response = await ApiService.products.updateProduct(id, dadosProduto);
    } else {
      response = await ApiService.products.createProduct(dadosProduto);
    }
    
    if (response.error) throw new Error(response.error);
    
    return { 
      data: response.data,
      error: null
    };
    
  } catch (error) {
    return { 
      data: null,
      error
    };
  }
};

export const excluirProduto = async (id) => {
  try {
    const response = await ApiService.products.deleteProduct(id);
    
    if (response.error) throw new Error(response.error);
    
    return { 
      success: true,
      error: null
    };
    
  } catch (error) {
    return { 
      success: false,
      error
    };
  }
};

export const validarFormularioProduto = (formData) => {
  const errors = {};
  
  if (!formData.name.trim()) {
    errors.name = 'Nome é obrigatório';
  }
  
  if (!formData.price) {
    errors.price = 'Preço é obrigatório';
  } else {
    const priceValue = parseFloat(String(formData.price).replace(',', '.'));
    if (isNaN(priceValue) || priceValue <= 0) {
      errors.price = 'Preço deve ser um valor positivo';
    }
  }
  
  if (!formData.category) {
    errors.category = 'Categoria é obrigatória';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
