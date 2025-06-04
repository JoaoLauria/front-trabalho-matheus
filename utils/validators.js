/**
 * Valida se um email é válido
 * 
 * @param {string} email - Email a ser validado
 * @returns {boolean} Se o email é válido
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida se um CPF é válido
 * 
 * @param {string} cpf - CPF a ser validado
 * @returns {boolean} Se o CPF é válido
 */
export const isValidCPF = (cpf) => {
  if (!cpf) return false;
  
  // Remove caracteres não numéricos
  const cleaned = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cleaned.length !== 11) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleaned)) {
    return false;
  }
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  
  if (remainder !== parseInt(cleaned.charAt(9))) {
    return false;
  }
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  
  if (remainder !== parseInt(cleaned.charAt(10))) {
    return false;
  }
  
  return true;
};

/**
 * Valida se um CNPJ é válido
 * 
 * @param {string} cnpj - CNPJ a ser validado
 * @returns {boolean} Se o CNPJ é válido
 */
export const isValidCNPJ = (cnpj) => {
  if (!cnpj) return false;
  
  // Remove caracteres não numéricos
  const cleaned = cnpj.replace(/\D/g, '');
  
  // Verifica se tem 14 dígitos
  if (cleaned.length !== 14) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleaned)) {
    return false;
  }
  
  // Validação do primeiro dígito verificador
  let size = cleaned.length - 2;
  let numbers = cleaned.substring(0, size);
  const digits = cleaned.substring(size);
  let sum = 0;
  let pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }
  
  // Validação do segundo dígito verificador
  size = size + 1;
  numbers = cleaned.substring(0, size);
  sum = 0;
  pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) {
    return false;
  }
  
  return true;
};

/**
 * Valida se um CEP é válido
 * 
 * @param {string} cep - CEP a ser validado
 * @returns {boolean} Se o CEP é válido
 */
export const isValidCEP = (cep) => {
  if (!cep) return false;
  
  // Remove caracteres não numéricos
  const cleaned = cep.replace(/\D/g, '');
  
  // Verifica se tem 8 dígitos
  if (cleaned.length !== 8) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleaned)) {
    return false;
  }
  
  return true;
};

/**
 * Valida se um telefone é válido
 * 
 * @param {string} phone - Telefone a ser validado
 * @returns {boolean} Se o telefone é válido
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Verifica se tem entre 8 e 11 dígitos
  if (cleaned.length < 8 || cleaned.length > 11) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleaned)) {
    return false;
  }
  
  return true;
};

/**
 * Valida se uma string tem o tamanho mínimo
 * 
 * @param {string} value - Valor a ser validado
 * @param {number} minLength - Tamanho mínimo
 * @returns {boolean} Se o valor tem o tamanho mínimo
 */
export const hasMinLength = (value, minLength) => {
  if (!value) return false;
  
  return value.length >= minLength;
};

/**
 * Valida se uma string tem o tamanho máximo
 * 
 * @param {string} value - Valor a ser validado
 * @param {number} maxLength - Tamanho máximo
 * @returns {boolean} Se o valor tem o tamanho máximo
 */
export const hasMaxLength = (value, maxLength) => {
  if (!value) return true;
  
  return value.length <= maxLength;
};

/**
 * Valida se uma string está entre o tamanho mínimo e máximo
 * 
 * @param {string} value - Valor a ser validado
 * @param {number} minLength - Tamanho mínimo
 * @param {number} maxLength - Tamanho máximo
 * @returns {boolean} Se o valor está entre o tamanho mínimo e máximo
 */
export const isLengthBetween = (value, minLength, maxLength) => {
  if (!value) return false;
  
  return value.length >= minLength && value.length <= maxLength;
};

/**
 * Valida se um valor é um número válido
 * 
 * @param {string|number} value - Valor a ser validado
 * @returns {boolean} Se o valor é um número válido
 */
export const isValidNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return false;
  }
  
  // Se for número, verifica se é válido
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value);
  }
  
  // Se for string, tenta converter para número
  const numValue = parseFloat(value.replace(',', '.'));
  return !isNaN(numValue) && isFinite(numValue);
};

/**
 * Valida se um valor é um número inteiro válido
 * 
 * @param {string|number} value - Valor a ser validado
 * @returns {boolean} Se o valor é um número inteiro válido
 */
export const isValidInteger = (value) => {
  if (!isValidNumber(value)) {
    return false;
  }
  
  const numValue = typeof value === 'string' 
    ? parseFloat(value.replace(',', '.')) 
    : value;
  
  return Number.isInteger(numValue);
};

export default {
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
};
