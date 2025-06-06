import React, { useState, useEffect } from 'react';
import { useError } from '../../contexts/ErrorContext';
import { carregarDadosProdutos, aplicarFiltrosProdutos } from '../../utils/produtosUtils';

const withProdutoData = (WrappedComponent) => {
  return function WithProdutoDataComponent(props) {
    const { handleApiError, showError } = useError();

    const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);
    const [produtosAgrupados, setProdutosAgrupados] = useState({});
    const [categorias, setCategorias] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');

    const [filtros, setFiltros] = useState({
      nome: '',
      categoria: '',
      disponibilidade: ''
    });

    const [filtroExpandido, setFiltroExpandido] = useState(true);
    
    useEffect(() => {
      buscarDados();
    }, []);
    
    useEffect(() => {
      aplicarFiltros();
    }, [filtros, produtos]);

    const buscarDados = async () => {
      try {
        
        setLoading(true);
        setErro('');
        
        const { produtos, categorias, error } = await carregarDadosProdutos();
        
        if (error) {
          const errorMsg = 'Falha ao carregar dados. Tente novamente.';
          
          setErro(errorMsg);
          handleApiError(error || errorMsg);
        } else {
          
          setCategorias(categorias || []);
          setProdutos(produtos || []);
          setProdutosFiltrados(produtos || []);

          const { produtosFiltrados: novosFiltrados, produtosAgrupados: novosAgrupados } = 
            aplicarFiltrosProdutos(produtos || [], filtros, categorias || []);
          
          setProdutosFiltrados(novosFiltrados);
          setProdutosAgrupados(novosAgrupados);
        }
      } catch (err) {
        
        setErro('Ocorreu um erro inesperado. Tente novamente.');
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };

    const aplicarFiltros = () => {
      if (!produtos.length) return;
      
      const { produtosFiltrados, produtosAgrupados } = aplicarFiltrosProdutos(produtos, filtros, categorias);
      
      setProdutosFiltrados(produtosFiltrados);
      setProdutosAgrupados(produtosAgrupados);
    };

    const handleFiltroChange = (e) => {
      const { name, value } = e.target;
      setFiltros(prev => ({ ...prev, [name]: value }));
    };

    const limparFiltros = () => {
      setFiltros({
        nome: '',
        categoria: '',
        disponibilidade: ''
      });
    };

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
