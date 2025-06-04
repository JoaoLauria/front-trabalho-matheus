// Funções utilitárias para manipulação de pedidos

// Este arquivo foi migrado para utils.js
// Mantendo exportações para compatibilidade com código existente

import {
  formatarDataHora,
  calcularTotal,
  agruparProdutosPorCategoria,
  adicionaisIguais,
  formatarMoeda,
  getStatusColor,
  calcularTotalItem,
  calcularTotalCarrinho
} from './utils';

export {
  formatarDataHora,
  calcularTotal,
  agruparProdutosPorCategoria,
  adicionaisIguais,
  formatarMoeda,
  getStatusColor,
  calcularTotalItem,
  calcularTotalCarrinho
};

// Função legada mantida para compatibilidade
export const comparaAdicionais = (adicionais1, adicionais2) => {
  if (!adicionais1 || !adicionais2) return false;
  if (adicionais1.length !== adicionais2.length) return false;

  const sorted1 = [...adicionais1].sort((a, b) => a.id - b.id);
  const sorted2 = [...adicionais2].sort((a, b) => a.id - b.id);

  return sorted1.every((adicional, index) => {
    return adicional.id === sorted2[index].id &&
           adicional.selecionado === sorted2[index].selecionado &&
           adicional.quantidade === sorted2[index].quantidade;
  });
};
