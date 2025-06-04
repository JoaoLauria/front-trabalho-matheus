// Funções utilitárias para manipulação de pedidos

/**
 * Verifica se dois arrays de adicionais são iguais (mesmos IDs e quantidades)
 * @param {Array} adicionais1 - Primeiro array de adicionais
 * @param {Array} adicionais2 - Segundo array de adicionais
 * @returns {Boolean} - true se forem iguais, false caso contrário
 */
export const adicionaisIguais = (adicionais1, adicionais2) => {
  if (!adicionais1 || !adicionais2) return false;
  if (adicionais1.length !== adicionais2.length) return false;
  
  // Ordenar os arrays por ID para garantir comparação consistente
  const sorted1 = [...adicionais1].sort((a, b) => a.id - b.id);
  const sorted2 = [...adicionais2].sort((a, b) => a.id - b.id);
  
  return sorted1.every((adicional, index) => {
    return adicional.id === sorted2[index].id && 
           adicional.quantidade === sorted2[index].quantidade;
  });
};

/**
 * Agrupa produtos por categoria
 * @param {Array} produtos - Array de produtos
 * @returns {Object} - Objeto com produtos agrupados por ID de categoria
 */
export const agruparProdutosPorCategoria = (produtos) => {
  return produtos.reduce((acc, produto) => {
    const categoriaId = produto.category?.toString() || 'sem-categoria';
    
    if (!acc[categoriaId]) {
      acc[categoriaId] = [];
    }
    
    acc[categoriaId].push(produto);
    return acc;
  }, {});
};

/**
 * Calcula o total de um item do carrinho (produto + adicionais)
 * @param {Object} item - Item do carrinho
 * @returns {Number} - Valor total do item
 */
export const calcularTotalItem = (item) => {
  if (!item || !item.produto) return 0;
  
  // Preço base do produto
  let total = parseFloat(item.produto.price) * item.quantidade;
  
  // Adicionar preço dos adicionais
  if (item.adicionaisSelecionados && item.adicionaisSelecionados.length > 0) {
    const adicionaisTotal = item.adicionaisSelecionados.reduce((acc, adicional) => {
      return acc + (parseFloat(adicional.price) * adicional.quantidade);
    }, 0);
    
    total += adicionaisTotal;
  }
  
  return total;
};

/**
 * Calcula o total do carrinho
 * @param {Array} carrinho - Array de itens do carrinho
 * @returns {Number} - Valor total do carrinho
 */
export const calcularTotalCarrinho = (carrinho) => {
  if (!carrinho || !Array.isArray(carrinho)) return 0;
  
  return carrinho.reduce((total, item) => {
    return total + calcularTotalItem(item);
  }, 0);
};

export default {
  adicionaisIguais,
  agruparProdutosPorCategoria,
  calcularTotalItem,
  calcularTotalCarrinho
};
