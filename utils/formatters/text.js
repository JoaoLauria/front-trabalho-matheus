
export const capitalize = (text) => {
  if (!text) return '';
  
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeEachWord = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const truncateText = (text, maxLength = 50, suffix = '...') => {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength - suffix.length) + suffix;
};

export const removeAccents = (text) => {
  if (!text) return '';
  
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const formatPhone = (phone) => {
  if (!phone) return '';

  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 8) {
    
    return cleaned.replace(/(\d{4})(\d{4})/, '$1-$2');
  } else if (cleaned.length === 9) {
    
    return cleaned.replace(/(\d{5})(\d{4})/, '$1-$2');
  } else if (cleaned.length === 10) {
    
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 11) {
    
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  return cleaned;
};

export const formatCPF = (cpf) => {
  if (!cpf) return '';

  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11) {
    return cleaned;
  }
  
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatCNPJ = (cnpj) => {
  if (!cnpj) return '';

  const cleaned = cnpj.replace(/\D/g, '');
  
  if (cleaned.length !== 14) {
    return cleaned;
  }
  
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const formatCEP = (cep) => {
  if (!cep) return '';

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
