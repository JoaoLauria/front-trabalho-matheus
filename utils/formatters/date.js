/**
 * Formata uma data para o formato brasileiro (DD/MM/YYYY)
 * 
 * @param {Date|string} date - Data a ser formatada
 * @returns {string} Data formatada
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Formata uma hora para o formato HH:MM
 * 
 * @param {Date|string} date - Data/hora a ser formatada
 * @returns {string} Hora formatada
 */
export const formatTime = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes}`;
};

/**
 * Formata uma data e hora para o formato brasileiro (DD/MM/YYYY HH:MM)
 * 
 * @param {Date|string} date - Data/hora a ser formatada
 * @returns {string} Data e hora formatadas
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  
  const dateString = formatDate(date);
  const timeString = formatTime(date);
  
  if (!dateString || !timeString) {
    return '';
  }
  
  return `${dateString} ${timeString}`;
};

/**
 * Formata uma data para o formato ISO (YYYY-MM-DD)
 * 
 * @param {Date|string} date - Data a ser formatada
 * @returns {string} Data formatada no padrão ISO
 */
export const formatISODate = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Converte uma string de data no formato brasileiro (DD/MM/YYYY) para um objeto Date
 * 
 * @param {string} dateString - String de data no formato DD/MM/YYYY
 * @returns {Date} Objeto Date
 */
export const parseDate = (dateString) => {
  if (!dateString) return null;
  
  const parts = dateString.split('/');
  
  if (parts.length !== 3) {
    return null;
  }
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  
  const date = new Date(year, month, day);
  
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Retorna a data atual formatada
 * 
 * @param {string} format - Formato de saída ('date', 'time', 'datetime', 'iso')
 * @returns {string} Data atual formatada
 */
export const getCurrentDate = (format = 'date') => {
  const now = new Date();
  
  switch (format) {
    case 'time':
      return formatTime(now);
    case 'datetime':
      return formatDateTime(now);
    case 'iso':
      return formatISODate(now);
    case 'date':
    default:
      return formatDate(now);
  }
};

/**
 * Calcula a diferença entre duas datas em dias
 * 
 * @param {Date|string} date1 - Primeira data
 * @param {Date|string} date2 - Segunda data
 * @returns {number} Diferença em dias
 */
export const daysBetween = (date1, date2) => {
  if (!date1 || !date2) return 0;
  
  const date1Obj = typeof date1 === 'string' ? new Date(date1) : date1;
  const date2Obj = typeof date2 === 'string' ? new Date(date2) : date2;
  
  if (isNaN(date1Obj.getTime()) || isNaN(date2Obj.getTime())) {
    return 0;
  }
  
  // Converte para UTC para evitar problemas com horário de verão
  const utc1 = Date.UTC(date1Obj.getFullYear(), date1Obj.getMonth(), date1Obj.getDate());
  const utc2 = Date.UTC(date2Obj.getFullYear(), date2Obj.getMonth(), date2Obj.getDate());
  
  // Calcula a diferença em milissegundos e converte para dias
  const diffMs = Math.abs(utc2 - utc1);
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

export default {
  formatDate,
  formatTime,
  formatDateTime,
  formatISODate,
  parseDate,
  getCurrentDate,
  daysBetween
};
