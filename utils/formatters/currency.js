/**
 * Formata um valor para o formato de moeda brasileira (R$)
 * 
 * @param {number|string} value - Valor a ser formatado
 * @param {boolean} showSymbol - Se deve exibir o símbolo da moeda
 * @returns {string} Valor formatado como moeda
 */
export const formatCurrency = (value, showSymbol = true) => {
  if (value === null || value === undefined || value === '') {
    return showSymbol ? 'R$ 0,00' : '0,00';
  }
  
  // Converte para número se for string
  const numValue = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
  
  // Verifica se é um número válido
  if (isNaN(numValue)) {
    return showSymbol ? 'R$ 0,00' : '0,00';
  }
  
  // Formata o valor
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return formatter.format(numValue);
};

/**
 * Converte um valor de moeda formatado para número
 * 
 * @param {string} value - Valor formatado como moeda
 * @returns {number} Valor numérico
 */
export const parseCurrency = (value) => {
  if (!value) return 0;
  
  // Remove o símbolo da moeda e outros caracteres não numéricos
  const cleanValue = value.replace(/[^\d,.-]/g, '').replace(',', '.');
  
  // Converte para número
  const numValue = parseFloat(cleanValue);
  
  return isNaN(numValue) ? 0 : numValue;
};

/**
 * Valida se um valor é um número válido para moeda
 * 
 * @param {string|number} value - Valor a ser validado
 * @returns {boolean} Se o valor é válido
 */
export const isValidCurrency = (value) => {
  if (value === null || value === undefined || value === '') {
    return false;
  }
  
  // Se for número, verifica se é válido
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value);
  }
  
  // Se for string, tenta converter para número
  const numValue = parseCurrency(value);
  return !isNaN(numValue) && isFinite(numValue);
};

export default {
  formatCurrency,
  parseCurrency,
  isValidCurrency
};
