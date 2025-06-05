export const formatarDataHora = (dataString) => {
  const data = new Date(dataString);
  return data.toLocaleString('pt-BR');
};

export const calcularTotal = (pedidos) => {
  if (!Array.isArray(pedidos)) {
    return 0;
  }
  
  return pedidos
    .filter(p => p && p.status && p.status.toLowerCase() !== 'cancelado')
    .reduce((total, pedido) => {
      
      if (pedido.total && !isNaN(parseFloat(pedido.total))) {
        return total + parseFloat(pedido.total);
      }

      if (Array.isArray(pedido.items)) {
        const itemsTotal = pedido.items.reduce((itemsSum, item) => {
          
          const itemPrice = parseFloat(
            item.price || 
            (item.product && item.product.price) || 
            (item.product_price) || 
            0
          );

          const quantity = parseInt(item.quantity || 1);

          let additionalsTotal = 0;
          if (Array.isArray(item.additionals)) {
            additionalsTotal = item.additionals.reduce((sum, additional) => {
              return sum + parseFloat(additional.price || 0);
            }, 0);
          }
          
          return itemsSum + (itemPrice * quantity) + additionalsTotal;
        }, 0);
        
        return total + itemsTotal;
      }
      
      return total;
    }, 0);
};

export const agruparProdutosPorCategoria = (produtos) => {
  if (!Array.isArray(produtos)) return {};
  
  return produtos.reduce((acc, produto) => {
    
    const categoriaNome = produto.category_details?.name || 'Sem categoria';
    
    if (!acc[categoriaNome]) {
      acc[categoriaNome] = [];
    }
    acc[categoriaNome].push(produto);
    return acc;
  }, {});
};

export const adicionaisIguais = (adicionais1, adicionais2) => {
  if (!adicionais1 || !adicionais2) return false;
  if (adicionais1.length !== adicionais2.length) return false;
  
  const adicionaisSelecionados1 = adicionais1.filter(a => a.selecionado);
  const adicionaisSelecionados2 = adicionais2.filter(a => a.selecionado);
  
  if (adicionaisSelecionados1.length !== adicionaisSelecionados2.length) return false;
  
  for (const adicional1 of adicionaisSelecionados1) {
    const adicional2 = adicionaisSelecionados2.find(a => a.id === adicional1.id);
    if (!adicional2 || adicional2.quantidade !== adicional1.quantidade) {
      return false;
    }
  }
  
  return true;
};

export const formatarMoeda = (valor) => {
  return `R$ ${parseFloat(valor).toFixed(2)}`;
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pendente': return 'warning';
    case 'finalizado': return 'success';
    case 'cancelado': return 'error';
    default: return 'default';
  }
};

export const calcularTotalItem = (item) => {
  if (!item) return 0;
  
  const precoBase = parseFloat(item.price || 0) * (item.quantidade || 1);
  
  const precoAdicionais = item.adicionais
    ? item.adicionais
        .filter(a => a.selecionado)
        .reduce((total, adicional) => {
          return total + parseFloat(adicional.price || 0) * (adicional.quantidade || 1);
        }, 0)
    : 0;
  
  return precoBase + precoAdicionais;
};

export const calcularTotalCarrinho = (carrinho) => {
  if (!Array.isArray(carrinho)) return 0;
  
  return carrinho.reduce((total, item) => {
    const precoBase = parseFloat(item.produto?.price || 0) * (item.quantidade || 1);
    
    const precoAdicionais = item.adicionaisSelecionados
      ? item.adicionaisSelecionados.reduce((total, adicional) => {
          return total + parseFloat(adicional.price || 0) * (adicional.quantidade || 1);
        }, 0)
      : 0;
    
    return total + precoBase + precoAdicionais;
  }, 0);
};

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
