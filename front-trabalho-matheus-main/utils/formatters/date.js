
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

export const formatDateTime = (date) => {
  if (!date) return '';
  
  const dateString = formatDate(date);
  const timeString = formatTime(date);
  
  if (!dateString || !timeString) {
    return '';
  }
  
  return `${dateString} ${timeString}`;
};

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

export const daysBetween = (date1, date2) => {
  if (!date1 || !date2) return 0;
  
  const date1Obj = typeof date1 === 'string' ? new Date(date1) : date1;
  const date2Obj = typeof date2 === 'string' ? new Date(date2) : date2;
  
  if (isNaN(date1Obj.getTime()) || isNaN(date2Obj.getTime())) {
    return 0;
  }

  const utc1 = Date.UTC(date1Obj.getFullYear(), date1Obj.getMonth(), date1Obj.getDate());
  const utc2 = Date.UTC(date2Obj.getFullYear(), date2Obj.getMonth(), date2Obj.getDate());

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
