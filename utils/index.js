// Importa e exporta todas as funções utilitárias
import currencyFormatters from './formatters/currency';
import dateFormatters from './formatters/date';
import textFormatters from './formatters/text';
import validators from './validators';
import arrayUtils from './arrayUtils';

// Exporta todas as funções individualmente
export const {
  formatCurrency,
  parseCurrency,
  isValidCurrency
} = currencyFormatters;

export const {
  formatDate,
  formatTime,
  formatDateTime,
  formatISODate,
  parseDate,
  getCurrentDate,
  daysBetween
} = dateFormatters;

export const {
  capitalize,
  capitalizeEachWord,
  truncateText,
  removeAccents,
  formatPhone,
  formatCPF,
  formatCNPJ,
  formatCEP
} = textFormatters;

export const {
  isValidEmail,
  isValidCPF,
  isValidCNPJ,
  isValidCEP,
  isValidPhone,
  hasMinLength,
  hasMaxLength,
  isLengthBetween,
  isValidNumber,
  isValidInteger
} = validators;

export const {
  sortByProperty,
  filterByProperty,
  groupByProperty,
  removeDuplicates,
  removeDuplicatesByProperty,
  findByProperty,
  mapToObject
} = arrayUtils;

// Funções para mapear status para cores e textos
export const getStatusColor = (status) => {
  const statusMap = {
    'active': 'success',
    'inactive': 'error',
    'pending': 'warning',
    'completed': 'success',
    'cancelled': 'error',
    'processing': 'info',
    'delivered': 'success',
    'paid': 'success',
    'unpaid': 'error',
    'partial': 'warning'
  };
  
  return statusMap[status] || 'default';
};

export const getStatusText = (status) => {
  const statusMap = {
    'active': 'Ativo',
    'inactive': 'Inativo',
    'pending': 'Pendente',
    'completed': 'Concluído',
    'cancelled': 'Cancelado',
    'processing': 'Em processamento',
    'delivered': 'Entregue',
    'paid': 'Pago',
    'unpaid': 'Não pago',
    'partial': 'Parcial'
  };
  
  return statusMap[status] || status;
};

// Função para calcular o valor total de um pedido
export const calculateOrderTotal = (items = []) => {
  return items.reduce((total, item) => {
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || 1;
    const itemAdditions = item.additions?.reduce((sum, addition) => {
      return sum + (addition.price || 0) * (addition.quantity || 1);
    }, 0) || 0;
    
    return total + (itemPrice * itemQuantity) + itemAdditions;
  }, 0);
};

// Função para gerar um ID único
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Função para formatar um valor monetário para exibição
export const formatMoneyDisplay = (value) => {
  return formatCurrency(value, true);
};

// Função para formatar um valor monetário para input
export const formatMoneyInput = (value) => {
  return formatCurrency(value, false);
};

// Exporta todos os módulos agrupados
export default {
  currency: currencyFormatters,
  date: dateFormatters,
  text: textFormatters,
  validators,
  array: arrayUtils,
  status: {
    getStatusColor,
    getStatusText
  },
  order: {
    calculateOrderTotal
  },
  id: {
    generateUniqueId
  },
  money: {
    formatMoneyDisplay,
    formatMoneyInput
  }
};
