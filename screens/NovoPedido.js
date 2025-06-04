import React, { useState, useEffect, useMemo } from 'react';
import { Paper, Box, CircularProgress, Typography, Fab, Container, TextField, Button } from '@mui/material';
import { useNavigation, useRoute } from '@react-navigation/native';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import AlertDialog from '../components/AlertDialog';

import PedidoHeader from '../components/PedidoHeader';
import SearchBar from '../components/SearchBar';
import CategoriaSelector from '../components/CategoriaSelector';
import ProdutosList from '../components/ProdutosList';
import ItensSelecionados from '../components/ItensSelecionados';
import CarrinhoModal from '../components/CarrinhoModal';

import ApiService from '../services/ApiService';
import { agruparProdutosPorCategoria, adicionaisIguais, formatarMoeda } from '../utils/utils';

const NovoPedido = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mesa } = route.params || {};

  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [categoriaId, setCategoriaId] = useState('');
  const [busca, setBusca] = useState('');
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoModalOpen, setCarrinhoModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputObservacoes, setInputObservacoes] = useState({});
  const [alertDialog, setAlertDialog] = useState({
    open: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: null
  });

  useEffect(() => {
    if (!mesa) {
      setAlertDialog({
        open: true,
        title: 'Erro',
        message: 'Mesa não especificada',
        type: 'error',
        onConfirm: () => navigation.goBack()
      });
    }
  }, [mesa, navigation]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    fetchProdutos();
  }, [categoriaId, busca]);

  const produtosPorCategoria = useMemo(() => {
    return agruparProdutosPorCategoria(produtos);
  }, [produtos]);

  async function fetchCategorias() {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await ApiService.categories.getAllCategories();
      
      if (error) {
        throw new Error(error);
      }
      
      setCategorias(data || []);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setError('Falha ao carregar categorias. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  async function fetchProdutos() {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await ApiService.products.getProducts({
        category: categoriaId || undefined,
        search: busca || undefined
      });
      
      if (error) {
        throw new Error(error);
      }
      
      setProdutos(data || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setError('Falha ao carregar produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  async function fetchAdicionais(produtoId) {
    try {
      const { data, error } = await ApiService.products.getProductAdditionals(produtoId);
      
      if (error) {
        throw new Error(error);
      }
      
      return data || [];
    } catch (error) {
      console.error(`Erro ao buscar adicionais para o produto ${produtoId}:`, error);
      return [];
    }
  }

  async function handleSelecionarItem(produto) {
    setLoading(true);
    try {
      const adicionais = await fetchAdicionais(produto.id);

      const novoItem = {
        ...produto,
        quantidade: 1,
        observacao: '',
        adicionais: adicionais.map(adicional => ({
          ...adicional,
          selecionado: false,
          quantidade: 1
        }))
      };

      setItensSelecionados(prev => [...prev, novoItem]);
    } catch (error) {
      console.error('Erro ao selecionar item:', error);
      setAlertDialog({
        open: true,
        title: 'Erro',
        message: `Erro ao selecionar produto: ${error.message}`,
        type: 'error'
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function handleRemoverItem(index) {
    setItensSelecionados(prev => prev.filter((_, i) => i !== index));
    setInputObservacoes(prev => {
      const newInputs = { ...prev };
      delete newInputs[index];
      return newInputs;
    });
  }

  function handleAlterarQuantidade(index, novaQuantidade) {
    if (novaQuantidade < 1) return;

    setItensSelecionados(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );
  }

  function handleObservacaoInput(index, texto) {
    setInputObservacoes(prev => ({
      ...prev,
      [index]: texto
    }));
  }

  function handleObservacaoCommit(index) {
    const observacao = inputObservacoes[index];
    if (observacao === undefined) return;

    setItensSelecionados(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, observacao }
          : item
      )
    );
  }

  function handleToggleAdicional(index, adicionalIndex, checked) {
    setItensSelecionados(prev =>
      prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            adicionais: item.adicionais.map((adicional, j) =>
              j === adicionalIndex
                ? { ...adicional, selecionado: checked }
                : adicional
            )
          };
        }
        return item;
      })
    );
  }

  function handleAlterarQtdAdicional(index, adicionalIndex, novaQuantidade) {
    if (novaQuantidade < 1) return;

    setItensSelecionados(prev =>
      prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            adicionais: item.adicionais.map((adicional, j) =>
              j === adicionalIndex
                ? { ...adicional, quantidade: novaQuantidade }
                : adicional
            )
          };
        }
        return item;
      })
    );
  }

  function handleAdicionarCompleto(index) {
    const item = itensSelecionados[index];
    if (!item) return;

    const observacao = inputObservacoes[index];
    if (observacao !== undefined) {
      const itemAtualizado = {
        ...item,
        observacao: observacao
      };

      handleAdicionarAoCarrinho(itemAtualizado);
    } else {
      handleAdicionarAoCarrinho(item);
    }

    handleRemoverItem(index);
  }

  function handleAdicionarAoCarrinho(item) {
    const adicionaisSelecionados = item.adicionais
      .filter(adicional => adicional.selecionado)
      .map(({ id, name, price, quantidade }) => ({
        id, name, price, quantidade
      }));

    const itemCarrinho = {
      produto: {
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description
      },
      quantidade: item.quantidade,
      observacao: item.observacao,
      adicionaisSelecionados
    };

    const indexExistente = carrinho.findIndex(carrinhoItem => {
      const obsCarrinho = carrinhoItem.observacao || '';
      const obsNova = itemCarrinho.observacao || '';
      const observacoesIguais = obsCarrinho.trim() === obsNova.trim();

      return (
        carrinhoItem.produto.id === itemCarrinho.produto.id &&
        observacoesIguais &&
        adicionaisIguais(carrinhoItem.adicionaisSelecionados, itemCarrinho.adicionaisSelecionados)
      );
    });

    if (indexExistente >= 0) {
      setCarrinho(prev =>
        prev.map((item, index) =>
          index === indexExistente
            ? { ...item, quantidade: item.quantidade + itemCarrinho.quantidade }
            : item
        )
      );
    } else {
      setCarrinho(prev => [...prev, itemCarrinho]);
    }
  }

  function handleRemoverDoCarrinho(index) {
    setCarrinho(prev => prev.filter((_, i) => i !== index));
  }

  function handleAlterarQuantidadeCarrinho(index, novaQuantidade) {
    if (novaQuantidade < 1) return;

    setCarrinho(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );
  }

  async function handleSalvar() {
    if (carrinho.length === 0) {
      setAlertDialog({
        open: true,
        title: 'Aviso',
        message: 'Adicione itens ao carrinho antes de finalizar o pedido',
        type: 'info'
      });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const itens = carrinho.map(item => ({
        product: item.produto.id,
        quantity: item.quantidade,
        notes: item.observacao || '',
        additionals: item.adicionaisSelecionados.map(adicional => ({
          additional: adicional.id,
          quantity: adicional.quantidade
        }))
      }));

      const tableId = typeof mesa === 'object' ? mesa.id || mesa : mesa;

      const pedidoPayload = {
        table: tableId,
        items: itens
      };

      const { data, error } = await ApiService.orders.createOrder(pedidoPayload);
      
      if (error) {
        throw new Error(error);
      }
      
      console.log('Pedido criado com sucesso:', data);

      setCarrinho([]);
      setCarrinhoModalOpen(false);
      
      setAlertDialog({
        open: true,
        title: 'Sucesso',
        message: 'Pedido criado com sucesso!',
        type: 'success',
        onConfirm: () => navigation.navigate('PedidosMesa', { mesa })
      });
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      setError(`Falha ao salvar pedido: ${error.message}`);
      setAlertDialog({
        open: true,
        title: 'Erro',
        message: `Erro ao finalizar pedido: ${error.message}`,
        type: 'error'
      });
      setLoading(false);
    }
  }

  function handleToggleCarrinhoModal() {
    setCarrinhoModalOpen(prev => !prev);
  }

  function handleVoltar() {
    navigation.navigate('PedidosMesa', { mesa });
  }

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <PedidoHeader
        mesa={mesa}
        carrinho={carrinho}
        onOpenCarrinho={handleToggleCarrinhoModal}
        onVoltar={handleVoltar}
      />

      <SearchBar busca={busca} setBusca={setBusca} />

      <CategoriaSelector
        categorias={categorias}
        categoriaId={categoriaId}
        setCategoriaId={setCategoriaId}
      />

      {loading && <CircularProgress size={24} sx={{ mx: 'auto', my: 2 }} />}
      {error && <Typography color="error" sx={{ my: 2 }}>{error}</Typography>}

      <Paper elevation={3} sx={{ p: 2, mb: 2, flexGrow: 1, overflow: 'auto' }}>
        <ProdutosList
          loading={loading}
          error={error}
          produtos={produtos}
          produtosPorCategoria={produtosPorCategoria}
          categorias={categorias}
          carrinho={carrinho}
          itensSelecionados={itensSelecionados}
          handleSelecionarItem={handleSelecionarItem}
        />
      </Paper>

      <ItensSelecionados
        itensSelecionados={itensSelecionados}
        handleRemoverItem={handleRemoverItem}
        handleAlterarQuantidade={handleAlterarQuantidade}
        handleObservacaoInput={handleObservacaoInput}
        handleObservacaoCommit={handleObservacaoCommit}
        handleToggleAdicional={handleToggleAdicional}
        handleAlterarQtdAdicional={handleAlterarQtdAdicional}
        handleAdicionarCompleto={handleAdicionarCompleto}
        inputObservacoes={inputObservacoes}
      />

      <Fab
        color="primary"
        aria-label="carrinho"
        onClick={handleToggleCarrinhoModal}
        sx={{ position: 'fixed', bottom: 16, right: 16, display: { sm: 'none' } }}
      >
        <ShoppingCartIcon />
      </Fab>

      <CarrinhoModal
        open={carrinhoModalOpen}
        onClose={handleToggleCarrinhoModal}
        carrinho={carrinho}
        handleRemoverDoCarrinho={handleRemoverDoCarrinho}
        handleAlterarQuantidadeCarrinho={handleAlterarQuantidadeCarrinho}
        handleSalvar={handleSalvar}
        loading={loading}
      />

      <AlertDialog
        open={alertDialog.open}
        onClose={() => setAlertDialog(prev => ({ ...prev, open: false }))}
        title={alertDialog.title}
        message={alertDialog.message}
        type={alertDialog.type}
        onConfirm={alertDialog.onConfirm}
      />
    </div>
  );
};

export default NovoPedido;
