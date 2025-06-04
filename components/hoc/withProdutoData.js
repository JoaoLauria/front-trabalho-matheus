import React, { useState, useEffect } from 'react';
import { useError } from '../../contexts/ErrorContext';
import { carregarDadosProdutos, aplicarFiltrosProdutos } from '../../utils/produtosUtils';

/**
 * HOC para gerenciar dados de produtos
 * Fornece dados, filtros e funções relacionadas a produtos
 * 
 * @param {React.Component} WrappedComponent - Componente a ser envolvido
 * @returns {React.Component} Componente com dados de produtos
 */
const withProdutoData = (WrappedComponent) => {
  return function WithProdutoDataComponent(props) {
    const { handleApiError, showError } = useError();
    
    // Estados para gerenciar produtos e categorias
    const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);
    const [produtosAgrupados, setProdutosAgrupados] = useState({});
    const [categorias, setCategorias] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);
    
    // Estados para gerenciar UI
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    
    // Estado para filtros
    const [filtros, setFiltros] = useState({
      nome: '',
      categoria: '',
      disponibilidade: ''
    });
    
    // Estado para controlar a expansão do filtro
    const [filtroExpandido, setFiltroExpandido] = useState(true);
    
    useEffect(() => {
      buscarDados();
    }, []);
    
    useEffect(() => {
      aplicarFiltros();
    }, [filtros, produtos]);
    
    /**
     * Busca produtos e categorias da API
     */
    const buscarDados = async () => {
      try {
        console.log('Iniciando busca de dados...');
        setLoading(true);
        setErro('');
        
        const { produtos, categorias, error } = await carregarDadosProdutos();
        
        if (error) {
          const errorMsg = 'Falha ao carregar dados. Tente novamente.';
          console.error('Erro ao buscar dados:', error);
          setErro(errorMsg);
          handleApiError(error || errorMsg);
        } else {
          console.log(`Dados carregados: ${produtos?.length || 0} produtos, ${categorias?.length || 0} categorias`);
          setCategorias(categorias || []);
          setProdutos(produtos || []);
          setProdutosFiltrados(produtos || []);
          
          // Aplicar filtros aos novos dados
          const { produtosFiltrados: novosFiltrados, produtosAgrupados: novosAgrupados } = 
            aplicarFiltrosProdutos(produtos || [], filtros, categorias || []);
          
          setProdutosFiltrados(novosFiltrados);
          setProdutosAgrupados(novosAgrupados);
        }
      } catch (err) {
        console.error('Erro inesperado ao buscar dados:', err);
        setErro('Ocorreu um erro inesperado. Tente novamente.');
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };
    
    /**
     * Aplica filtros aos produtos
     */
    const aplicarFiltros = () => {
      if (!produtos.length) return;
      
      const { produtosFiltrados, produtosAgrupados } = aplicarFiltrosProdutos(produtos, filtros, categorias);
      
      setProdutosFiltrados(produtosFiltrados);
      setProdutosAgrupados(produtosAgrupados);
    };
    
    /**
     * Atualiza um campo do filtro
     * @param {Object} e - Evento do input
     */
    const handleFiltroChange = (e) => {
      const { name, value } = e.target;
      setFiltros(prev => ({ ...prev, [name]: value }));
    };
    
    /**
     * Limpa todos os filtros
     */
    const limparFiltros = () => {
      setFiltros({
        nome: '',
        categoria: '',
        disponibilidade: ''
      });
    };
    
    /**
     * Expande/retrai uma categoria na lista
     * @param {number} categoriaId - ID da categoria
     */
    const handleToggleExpand = (categoriaId) => {
      setExpandedCategories(prev => {
        if (prev.includes(categoriaId)) {
          return prev.filter(id => id !== categoriaId);
        } else {
          return [...prev, categoriaId];
        }
      });
    };
    
    return (
      <WrappedComponent
        {...props}
        produtos={produtos}
        produtosFiltrados={produtosFiltrados}
        produtosAgrupados={produtosAgrupados}
        categorias={categorias}
        expandedCategories={expandedCategories}
        loading={loading}
        erro={erro}
        setErro={setErro}
        filtros={filtros}
        filtroExpandido={filtroExpandido}
        setFiltroExpandido={setFiltroExpandido}
        buscarDados={buscarDados}
        handleFiltroChange={handleFiltroChange}
        limparFiltros={limparFiltros}
        handleToggleExpand={handleToggleExpand}
      />
    );
  };
};

export default withProdutoData;
