import React, { useState } from 'react';
import {
  Box, Typography, Paper, Button, TextField, InputAdornment, IconButton, List, ListItem, ListItemText, Divider, Chip, Select, MenuItem, FormControl, InputLabel, OutlinedInput, Checkbox, ListItemIcon, Avatar, Badge, Modal, Backdrop, Fade
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

// Mock de itens do cardápio
const itensMock = [
  // Pizzas
  { id: 1, nome: 'Pizza Margherita', categoria: 'Pizza', preco: 40, adicionais: [
    { id: 1, nome: 'Bacon', preco: 5 },
    { id: 2, nome: 'Salada', preco: 3 },
  ] },
  { id: 6, nome: 'Pizza Calabresa', categoria: 'Pizza', preco: 42, adicionais: [
    { id: 1, nome: 'Bacon', preco: 5 },
    { id: 3, nome: 'Cebola', preco: 2 },
  ] },
  { id: 7, nome: 'Pizza Quatro Queijos', categoria: 'Pizza', preco: 45, adicionais: [
    { id: 4, nome: 'Catupiry', preco: 6 },
  ] },

  // Massas
  { id: 2, nome: 'Lasanha', categoria: 'Massas', preco: 38, adicionais: [] },
  { id: 8, nome: 'Ravioli de Ricota', categoria: 'Massas', preco: 36, adicionais: [] },
  { id: 9, nome: 'Nhoque ao Sugo', categoria: 'Massas', preco: 34, adicionais: [] },

  // Bebidas
  { id: 3, nome: 'Coca-Cola', categoria: 'Bebidas', preco: 8, adicionais: [] },
  { id: 4, nome: 'Suco de Laranja', categoria: 'Bebidas', preco: 10, adicionais: [] },
  { id: 10, nome: 'Água com Gás', categoria: 'Bebidas', preco: 6, adicionais: [] },
  { id: 11, nome: 'Cerveja Artesanal', categoria: 'Bebidas', preco: 14, adicionais: [] },

  // Lanches
  { id: 5, nome: 'Hambúrguer', categoria: 'Lanches', preco: 25, adicionais: [
    { id: 3, nome: 'Queijo extra', preco: 4 },
    { id: 4, nome: 'Bacon', preco: 5 },
  ] },
  { id: 12, nome: 'Cheeseburger', categoria: 'Lanches', preco: 23, adicionais: [
    { id: 3, nome: 'Queijo extra', preco: 4 },
  ] },
  { id: 13, nome: 'Sanduíche Natural', categoria: 'Lanches', preco: 18, adicionais: [] },

  // Sobremesas
  { id: 14, nome: 'Petit Gâteau', categoria: 'Sobremesas', preco: 22, adicionais: [] },
  { id: 15, nome: 'Sorvete 2 bolas', categoria: 'Sobremesas', preco: 16, adicionais: [
    { id: 5, nome: 'Calda de chocolate', preco: 2 },
    { id: 6, nome: 'Granulado', preco: 1 },
  ] },

  // Saladas
  { id: 16, nome: 'Salada Caesar', categoria: 'Saladas', preco: 20, adicionais: [
    { id: 7, nome: 'Frango grelhado', preco: 6 },
  ] },
  { id: 17, nome: 'Salada Grega', categoria: 'Saladas', preco: 19, adicionais: [] },

  // Petiscos
  { id: 18, nome: 'Batata Frita', categoria: 'Petiscos', preco: 16, adicionais: [] },
  { id: 19, nome: 'Iscas de Frango', categoria: 'Petiscos', preco: 22, adicionais: [] },

  // Sushi
  { id: 20, nome: 'Sushi Salmão', categoria: 'Sushi', preco: 28, adicionais: [
    { id: 8, nome: 'Cream cheese', preco: 3 },
  ] },
  { id: 21, nome: 'Temaki Atum', categoria: 'Sushi', preco: 32, adicionais: [] },
];

const categorias = [...new Set(itensMock.map(item => item.categoria))];

// Mapeamento de ícones para categorias
const categoriaIcons = {
  'Pizza': <LocalPizzaIcon fontSize="large" />,
  'Massas': <LocalDiningIcon fontSize="large" />,
  'Bebidas': <LocalCafeIcon fontSize="large" />,
  'Lanches': <FastfoodIcon fontSize="large" />,
  'default': <RestaurantIcon fontSize="large" />
};

export default function NovoPedido({ onSalvar, onCancelar }) {
  // Estados do componente
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [inputObservacoes, setInputObservacoes] = useState({});
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoModalOpen, setCarrinhoModalOpen] = useState(false);
  
  // Total de itens no carrinho
  const totalItensCarrinho = carrinho.reduce((total, item) => total + item.quantidade, 0);

  // Filtra itens por busca e categoria
  const itensFiltrados = itensMock.filter(item =>
    (!categoria || item.categoria === categoria) &&
    (item.nome.toLowerCase().includes(busca.toLowerCase()))
  );

  // Funções para manipulação do carrinho
  function handleCarrinhoRemover(idx) {
    setCarrinho(carrinho => carrinho.filter((_, i) => i !== idx));
  }

  function handleCarrinhoQtd(idx, novaQtd) {
    setCarrinho(carrinho => carrinho.map((item, i) => 
      i === idx ? { ...item, quantidade: Math.max(1, novaQtd) } : item
    ));
  }

  function handleSelecionarItem(item) {
    if (itensSelecionados.find(i => i.id === item.id)) return;
    setItensSelecionados([
      ...itensSelecionados,
      {
        id: item.id,
        quantidade: 1,
        observacao: '',
        adicionais: []
      }
    ]);
  }

  // Função para comparar adicionais (id e quantidade)
  function adicionaisIguais(a1, a2) {
    if (a1.length !== a2.length) return false;
    const sorted1 = [...a1].sort((x, y) => x.id - y.id);
    const sorted2 = [...a2].sort((x, y) => x.id - y.id);
    return sorted1.every((ad, idx) => ad.id === sorted2[idx].id && ad.quantidade === sorted2[idx].quantidade);
  }

  // Função para adicionar ao carrinho
  function handleAdicionarAoCarrinho(itemId) {
    // Garante que a última observação digitada seja salva
    setItensSelecionados(prev => {
      const atualizados = prev.map(i => {
        if (i.id !== itemId) return i;
        return { ...i, observacao: inputObservacoes[itemId] !== undefined ? inputObservacoes[itemId] : i.observacao };
      });
      
      // Após atualizar, adiciona ao carrinho
      const sel = atualizados.find(i => i.id === itemId);
      if (!sel) return atualizados;
      
      const idxExistente = carrinho.findIndex(c =>
        c.id === sel.id &&
        c.observacao === sel.observacao &&
        adicionaisIguais(c.adicionais, sel.adicionais)
      );
      
      if (idxExistente >= 0) {
        setCarrinho(carrinho.map((c, idx) =>
          idx === idxExistente ? { ...c, quantidade: c.quantidade + sel.quantidade } : c
        ));
      } else {
        setCarrinho([...carrinho, { ...sel }]);
      }
      
      // Limpa o campo de observação local
      setInputObservacoes(obs => {
        const novo = { ...obs };
        delete novo[itemId];
        return novo;
      });
      
      // Remove da edição
      return atualizados.filter(i => i.id !== itemId);
    });
  }

  function handleAlterarQuantidade(id, quantidade) {
    setItensSelecionados(itensSelecionados.map(i => 
      i.id === id ? { ...i, quantidade: Math.max(1, quantidade) } : i
    ));
  }

  // Atualiza o campo local de observação enquanto digita
  function handleObservacaoInput(id, valor) {
    setInputObservacoes(prev => ({ ...prev, [id]: valor }));
  }
  
  // Salva observação no estado global ao sair do campo ou pressionar Enter
  function handleObservacaoCommit(id) {
    setItensSelecionados(prev => prev.map(i => {
      if (i.id !== id) return i;
      return { ...i, observacao: inputObservacoes[id] ?? '' };
    }));
  }
  
  // Handler para garantir que a observação seja salva antes de adicionar
  function handleAdicionarCompleto(itemId) {
    handleObservacaoCommit(itemId);
    // Aguarda o commit antes de adicionar ao carrinho
    setTimeout(() => handleAdicionarAoCarrinho(itemId), 0);
  }

  function handleToggleAdicional(itemId, adicionalId) {
    setItensSelecionados(itensSelecionados.map(i => {
      if (i.id !== itemId) return i;
      const jaSelecionado = i.adicionais.find(a => a.id === adicionalId);
      return {
        ...i,
        adicionais: jaSelecionado
          ? i.adicionais.filter(a => a.id !== adicionalId)
          : [...i.adicionais, { id: adicionalId, quantidade: 1 }]
      };
    }));
  }

  function handleAlterarQtdAdicional(itemId, adicionalId, quantidade) {
    setItensSelecionados(itensSelecionados.map(i => {
      if (i.id !== itemId) return i;
      return {
        ...i,
        adicionais: i.adicionais.map(a =>
          a.id === adicionalId ? { ...a, quantidade: Math.max(1, quantidade) } : a
        )
      };
    }));
  }

  function handleRemoverItem(id) {
    setItensSelecionados(itensSelecionados.filter(i => i.id !== id));
  }

  function handleSalvar() {
    onSalvar && onSalvar(carrinho);
  }

  // Função para abrir/fechar o modal do carrinho
  const handleToggleCarrinhoModal = () => {
    setCarrinhoModalOpen(!carrinhoModalOpen);
  };

  // Calcular o valor total do carrinho
  const calcularTotal = () => {
    return carrinho.reduce((total, c) => {
      const item = itensMock.find(i => i.id === c.id);
      if (!item) return total;
      
      const subtotalAdicionais = c.adicionais.reduce((soma, a) => {
        const ad = item.adicionais.find(x => x.id === a.id);
        return ad ? soma + ad.preco * a.quantidade : soma;
      }, 0);
      
      return total + (item.preco + subtotalAdicionais) * c.quantidade;
    }, 0);
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '32px auto',
      padding: '16px 24px',
      maxHeight: '90vh',
      overflowY: 'auto',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>

      {/* Cabeçalho com título e ícone do carrinho */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight={700} color="primary.main">
          Novo Pedido
        </Typography>
        
        <IconButton 
          color="primary" 
          onClick={handleToggleCarrinhoModal}
          sx={{ 
            bgcolor: 'primary.light', 
            color: 'white',
            '&:hover': { bgcolor: 'primary.main' } 
          }}
        >
          <Badge badgeContent={totalItensCarrinho} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>
      {/* Área principal com busca, categorias e listagem de itens */}
      <Paper elevation={3} sx={{ p: 2, mb: 2, flex: '1 1 0', overflow: 'auto', minHeight: 300, maxHeight: 'calc(100vh - 180px)' }}>
        {/* Campo de busca */}
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Buscar item"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            size="small"
          />
        </Box>
        
        {/* Carrossel de categorias */}
        <Box sx={{ mb: 2, overflow: 'auto' }}>
          <Box sx={{ display: 'flex', gap: 2, pb: 1 }}>
            {/* Opção "Todas" */}
            <Box 
              onClick={() => setCategoria('')}
              sx={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                cursor: 'pointer',
                minWidth: 60,
                opacity: categoria === '' ? 1 : 0.7,
                transition: 'all 0.2s',
                '&:hover': { opacity: 1 }
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: categoria === '' ? 'primary.main' : 'grey.300',
                  width: 56, 
                  height: 56,
                  mb: 0.5
                }}
              >
                <RestaurantIcon fontSize="large" />
              </Avatar>
              <Typography variant="caption" align="center" fontWeight={categoria === '' ? 'bold' : 'normal'}>
                Todas
              </Typography>
            </Box>
            
            {/* Categorias */}
            {categorias.map(cat => (
              <Box 
                key={cat}
                onClick={() => setCategoria(cat)}
                sx={{
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  minWidth: 60,
                  opacity: categoria === cat ? 1 : 0.7,
                  transition: 'all 0.2s',
                  '&:hover': { opacity: 1 }
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: categoria === cat ? 'primary.main' : 'grey.300',
                    width: 56, 
                    height: 56,
                    mb: 0.5
                  }}
                >
                  {categoriaIcons[cat] || categoriaIcons['default']}
                </Avatar>
                <Typography variant="caption" align="center" fontWeight={categoria === cat ? 'bold' : 'normal'}>
                  {cat}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Listagem de itens por categoria */}
        <List sx={{ maxHeight: 'calc(100vh - 320px)', overflow: 'auto' }}>
          {/* Agrupar itens por categoria */}
          {categorias
            .filter(cat => itensFiltrados.some(item => item.categoria === cat))
            .map(cat => (
              <React.Fragment key={cat}>
                {/* Cabeçalho da categoria */}
                <ListItem sx={{ bgcolor: 'primary.light', color: 'white', py: 0.5 }}>
                  <Typography variant="subtitle2" fontWeight="bold">{cat}</Typography>
                </ListItem>
                
                {/* Itens da categoria */}
                {itensFiltrados
                  .filter(item => item.categoria === cat)
                  .sort((a, b) => a.nome.localeCompare(b.nome))
                  .map(item => (
                    <ListItem 
                      key={item.id} 
                      onClick={() => handleSelecionarItem(item)} 
                      disabled={!!itensSelecionados.find(i => i.id === item.id)} 
                      sx={{ cursor: 'pointer', pl: 3 }}
                    >
                      <ListItemText
                        primary={item.nome}
                        secondary={`R$ ${item.preco.toFixed(2)}`}
                      />
                      <Chip label="Selecionar" color="primary" size="small" sx={{ ml: 2, cursor: 'pointer' }} />
                    </ListItem>
                  ))
                }
              </React.Fragment>
            ))
          }
          
          {/* Mensagem quando não há itens */}
          {itensFiltrados.length === 0 && (
            <ListItem>
              <ListItemText primary="Nenhum item encontrado" />
            </ListItem>
          )}
        </List>
      </Paper>
      {itensSelecionados.length > 0 && (
        <Paper elevation={3} sx={{ p: 2, mb: 2, maxHeight: 250, overflow: 'auto', flexShrink: 0 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>Itens em edição</Typography>
          <List>
            {itensSelecionados.map(sel => {
              const item = itensMock.find(i => i.id === sel.id);
              return (
                <React.Fragment key={sel.id + JSON.stringify(sel.adicionais) + sel.observacao}>
                  <ListItem alignItems="flex-start">
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>{item.nome}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, mt: 0.5 }}>
                        <TextField
                          label="Qtd."
                          type="number"
                          size="small"
                          value={sel.quantidade}
                          onChange={e => handleAlterarQuantidade(sel.id, Number(e.target.value))}
                          sx={{ width: 80 }}
                          inputProps={{ min: 1 }}
                        />
                        <TextField
                          label="Observação"
                          size="small"
                          value={inputObservacoes[sel.id] !== undefined ? inputObservacoes[sel.id] : sel.observacao}
                          onChange={e => handleObservacaoInput(sel.id, e.target.value)}
                          // Remover onBlur para evitar conflito com clique no botão Adicionar
                          onKeyDown={e => { if (e.key === 'Enter') handleObservacaoCommit(sel.id); }}
                          sx={{ width: 180 }}
                          inputProps={{ maxLength: 100 }}
                        />
                      </Box>
                      {item.adicionais.length > 0 && (
                        <FormControl sx={{ mt: 1, width: '100%' }}>
                          <InputLabel>Adicionais</InputLabel>
                          <Select
                            multiple
                            value={sel.adicionais.map(a => a.id)}
                            onChange={e => handleToggleAdicional(sel.id, e.target.value[e.target.value.length - 1])}
                            input={<OutlinedInput label="Adicionais" />}
                            renderValue={selected =>
                              item.adicionais.filter(a => selected.includes(a.id)).map(a => a.nome).join(', ')
                            }
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 200
                                }
                              }
                            }}
                          >
                            {item.adicionais.map(adic => {
                              const adicionalSelecionado = sel.adicionais.find(a => a.id === adic.id);
                              return (
                                <MenuItem key={adic.id} value={adic.id}>
                                  <Checkbox checked={!!adicionalSelecionado} />
                                  <ListItemText primary={`${adic.nome} (+R$ ${adic.preco.toFixed(2)})`} />
                                  {adicionalSelecionado && (
                                    <TextField
                                      label="Qtd."
                                      type="number"
                                      size="small"
                                      value={adicionalSelecionado.quantidade}
                                      onChange={e => handleAlterarQtdAdicional(sel.id, adic.id, Number(e.target.value))}
                                      sx={{ width: 60, ml: 1 }}
                                      inputProps={{ min: 1 }}
                                    />
                                  )}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                      <Button color="success" variant="contained" size="small" onClick={() => handleAdicionarCompleto(sel.id)} sx={{ mb: 1 }}>Adicionar</Button>
                      <Button color="error" variant="outlined" size="small" onClick={() => handleRemoverItem(sel.id)} >Remover</Button>
                    </Box>
                  </ListItem>
                  <Divider sx={{ my: 1 }} />
                </React.Fragment>
              );
            })}
          </List>
        </Paper>
      )}
      
      {/* Botões de ação no final da página */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3, mb: 2 }}>
        <Button variant="outlined" color="secondary" onClick={onCancelar}>
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => onSalvar(carrinho)} 
          disabled={carrinho.length === 0}
          startIcon={<ShoppingCartIcon />}
        >
          Finalizar Pedido ({totalItensCarrinho} {totalItensCarrinho === 1 ? 'item' : 'itens'})
        </Button>
      </Box>
      
      {/* Modal do Carrinho */}
      <Modal
        open={carrinhoModalOpen}
        onClose={handleToggleCarrinhoModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={carrinhoModalOpen}>
          <Paper 
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: '90%', 
              maxWidth: 500,
              maxHeight: '90vh',
              p: 3,
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Cabeçalho do modal */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Carrinho de Compras
              </Typography>
              <IconButton onClick={handleToggleCarrinhoModal} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            
            {/* Lista de itens do carrinho */}
            {carrinho.length > 0 ? (
              <Box sx={{ overflow: 'auto', flex: 1, mb: 2, maxHeight: '60vh' }}>
                <List>
                  {carrinho.map((c, idx) => {
                    const item = itensMock.find(i => i.id === c.id);
                    // Calcular subtotal do item
                    const subtotalAdicionais = c.adicionais.reduce((soma, a) => {
                      const ad = item.adicionais.find(x => x.id === a.id);
                      return ad ? soma + ad.preco * a.quantidade : soma;
                    }, 0);
                    const subtotal = (item.preco + subtotalAdicionais) * c.quantidade;
                    return (
                      <React.Fragment key={idx + c.id + JSON.stringify(c.adicionais) + c.observacao}>
                        <ListItem alignItems="flex-start" sx={{ gap: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>{item.nome}</Typography>
                            <Typography variant="body2">
                              Obs: {c.observacao || '-'}
                              {c.adicionais.length > 0 && (
                                <>
                                  <br />Adicionais: {c.adicionais.map(a => {
                                    const ad = item.adicionais.find(x => x.id === a.id);
                                    return ad ? `${ad.nome} x${a.quantidade}` : '';
                                  }).join(', ')}
                                </>
                              )}
                              <br />
                              <strong>Subtotal: R$ {subtotal.toFixed(2)}</strong>
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Button size="small" variant="outlined" color="primary" onClick={() => handleCarrinhoQtd(idx, c.quantidade - 1)} disabled={c.quantidade <= 1} sx={{ minWidth: 32, px: 1 }}>-</Button>
                              <Typography>{c.quantidade}</Typography>
                              <Button size="small" variant="outlined" color="primary" onClick={() => handleCarrinhoQtd(idx, c.quantidade + 1)} sx={{ minWidth: 32, px: 1 }}>+</Button>
                            </Box>
                            <Button size="small" variant="outlined" color="error" onClick={() => handleCarrinhoRemover(idx)} sx={{ mt: 1 }}>Remover</Button>
                          </Box>
                        </ListItem>
                        <Divider sx={{ my: 1 }} />
                      </React.Fragment>
                    );
                  })}
                </List>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 4 }}>
                <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">Seu carrinho está vazio</Typography>
                <Typography variant="body2" color="text.secondary">Adicione itens para continuar</Typography>
              </Box>
            )}
            
            {/* Rodapé com total e botões */}
            {carrinho.length > 0 && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="subtitle1" fontWeight={600}>Total</Typography>
                  <Typography variant="subtitle1" fontWeight={600}>R$ {calcularTotal().toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                  <Button variant="outlined" color="secondary" onClick={handleToggleCarrinhoModal}>
                    Continuar Comprando
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => {
                      handleToggleCarrinhoModal();
                      onSalvar(carrinho);
                    }}
                  >
                    Finalizar Pedido
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
