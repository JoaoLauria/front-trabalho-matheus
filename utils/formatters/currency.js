
export const formatCurrency = (value, showSymbol = true) => {
  if (value === null || value === undefined || value === '') {
    return showSymbol ? 'R$ 0,00' : '0,00';
  }

  const numValue = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;

  if (isNaN(numValue)) {
    return showSymbol ? 'R$ 0,00' : '0,00';
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return formatter.format(numValue);
};

export const parseCurrency = (value) => {
  if (!value) return 0;

  const cleanValue = value.replace(/[^\d,.-]/g, '').replace(',', '.');

  const numValue = parseFloat(cleanValue);
  
  return isNaN(numValue) ? 0 : numValue;
};

export const isValidCurrency = (value) => {
  if (value === null || value === undefined || value === '') {
    return false;
  }

  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value);
  }

  const numValue = parseCurrency(value);
  return !isNaN(numValue) && isFinite(numValue);
};

export default {
  formatCurrency,
  parseCurrency,
  isValidCurrency
};
