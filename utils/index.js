
import currencyFormatters from './formatters/currency';
import dateFormatters from './formatters/date';
import textFormatters from './formatters/text';
import validators from './validators';
import arrayUtils from './arrayUtils';

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

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const formatMoneyDisplay = (value) => {
  return formatCurrency(value, true);
};

export const formatMoneyInput = (value) => {
  return formatCurrency(value, false);
};

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
