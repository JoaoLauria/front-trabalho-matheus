
export const isValidEmail = (email) => {
  if (!email) return false;
  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidCPF = (cpf) => {
  if (!cpf) return false;

  const cleaned = cpf.replace(/\D/g, '');

  if (cleaned.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cleaned)) {
    return false;
  }

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

export const isValidCNPJ = (cnpj) => {
  if (!cnpj) return false;

  const cleaned = cnpj.replace(/\D/g, '');

  if (cleaned.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(cleaned)) {
    return false;
  }

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

export const isValidCEP = (cep) => {
  if (!cep) return false;

  const cleaned = cep.replace(/\D/g, '');

  if (cleaned.length !== 8) {
    return false;
  }

  if (/^(\d)\1+$/.test(cleaned)) {
    return false;
  }
  
  return true;
};

export const isValidPhone = (phone) => {
  if (!phone) return false;

  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length < 8 || cleaned.length > 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cleaned)) {
    return false;
  }
  
  return true;
};

export const hasMinLength = (value, minLength) => {
  if (!value) return false;
  
  return value.length >= minLength;
};

export const hasMaxLength = (value, maxLength) => {
  if (!value) return true;
  
  return value.length <= maxLength;
};

export const isLengthBetween = (value, minLength, maxLength) => {
  if (!value) return false;
  
  return value.length >= minLength && value.length <= maxLength;
};

export const isValidNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return false;
  }

  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value);
  }

  const numValue = parseFloat(value.replace(',', '.'));
  return !isNaN(numValue) && isFinite(numValue);
};

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
