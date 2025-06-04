/**
 * Capitaliza a primeira letra de uma string
 * 
 * @param {string} text - Texto a ser capitalizado
 * @returns {string} Texto com a primeira letra maiúscula
 */
export const capitalize = (text) => {
  if (!text) return '';
  
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Capitaliza a primeira letra de cada palavra em uma string
 * 
 * @param {string} text - Texto a ser capitalizado
 * @returns {string} Texto com a primeira letra de cada palavra maiúscula
 */
export const capitalizeEachWord = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Trunca um texto para um tamanho máximo e adiciona reticências se necessário
 * 
 * @param {string} text - Texto a ser truncado
 * @param {number} maxLength - Tamanho máximo do texto
 * @param {string} suffix - Sufixo a ser adicionado quando o texto é truncado
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 50, suffix = '...') => {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Remove acentos de uma string
 * 
 * @param {string} text - Texto com acentos
 * @returns {string} Texto sem acentos
 */
export const removeAccents = (text) => {
  if (!text) return '';
  
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Formata um número de telefone para o formato brasileiro
 * 
 * @param {string} phone - Número de telefone
 * @returns {string} Número de telefone formatado
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Verifica o tamanho para determinar o formato
  if (cleaned.length === 8) {
    // Telefone fixo sem DDD
    return cleaned.replace(/(\d{4})(\d{4})/, '$1-$2');
  } else if (cleaned.length === 9) {
    // Celular sem DDD
    return cleaned.replace(/(\d{5})(\d{4})/, '$1-$2');
  } else if (cleaned.length === 10) {
    // Telefone fixo com DDD
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 11) {
    // Celular com DDD
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  // Retorna o número limpo se não se encaixar em nenhum formato
  return cleaned;
};

/**
 * Formata um CPF para o formato brasileiro
 * 
 * @param {string} cpf - CPF
 * @returns {string} CPF formatado
 */
export const formatCPF = (cpf) => {
  if (!cpf) return '';
  
  // Remove caracteres não numéricos
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11) {
    return cleaned;
  }
  
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Formata um CNPJ para o formato brasileiro
 * 
 * @param {string} cnpj - CNPJ
 * @returns {string} CNPJ formatado
 */
export const formatCNPJ = (cnpj) => {
  if (!cnpj) return '';
  
  // Remove caracteres não numéricos
  const cleaned = cnpj.replace(/\D/g, '');
  
  if (cleaned.length !== 14) {
    return cleaned;
  }
  
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

/**
 * Formata um CEP para o formato brasileiro
 * 
 * @param {string} cep - CEP
 * @returns {string} CEP formatado
 */
export const formatCEP = (cep) => {
  if (!cep) return '';
  
  // Remove caracteres não numéricos
  const cleaned = cep.replace(/\D/g, '');
  
  if (cleaned.length !== 8) {
    return cleaned;
  }
  
  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
};

export default {
  capitalize,
  capitalizeEachWord,
  truncateText,
  removeAccents,
  formatPhone,
  formatCPF,
  formatCNPJ,
  formatCEP
};
