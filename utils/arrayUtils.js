
export const sortByProperty = (array, property, ascending = true) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return [];
  }
  
  const sortedArray = [...array];
  
  sortedArray.sort((a, b) => {
    
    if (!a.hasOwnProperty(property) || !b.hasOwnProperty(property)) {
      return 0;
    }
    
    
    let valueA = a[property];
    let valueB = b[property];
    
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    
    if (valueA < valueB) {
      return ascending ? -1 : 1;
    }
    if (valueA > valueB) {
      return ascending ? 1 : -1;
    }
    return 0;
  });
  
  return sortedArray;
};

export const filterByProperty = (array, property, value) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return [];
  }
  
  return array.filter(item => {
    
    if (!item.hasOwnProperty(property)) {
      return false;
    }
    
    
    if (typeof item[property] === 'string' && typeof value === 'string') {
      return item[property].toLowerCase().includes(value.toLowerCase());
    }
    
    return item[property] === value;
  });
};

export const groupByProperty = (array, property) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return {};
  }
  
  return array.reduce((groups, item) => {
    
    if (!item.hasOwnProperty(property)) {
      return groups;
    }
    
    
    const key = item[property];
    
    
    if (!groups[key]) {
      groups[key] = [];
    }
    
    
    groups[key].push(item);
    
    return groups;
  }, {});
};

export const removeDuplicates = (array) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return [];
  }
  
  return [...new Set(array)];
};

export const removeDuplicatesByProperty = (array, property) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return [];
  }
  
  const seen = new Set();
  
  return array.filter(item => {
    
    if (!item.hasOwnProperty(property)) {
      return true;
    }
    
    
    const key = item[property];
    
    
    if (seen.has(key)) {
      return false;
    }
    
    
    seen.add(key);
    
    return true;
  });
};

export const findByProperty = (array, property, value) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return null;
  }
  
  return array.find(item => {
    
    if (!item.hasOwnProperty(property)) {
      return false;
    }
    
    
    return item[property] === value;
  }) || null;
};

export const mapToObject = (array, keyProperty) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return {};
  }
  
  return array.reduce((obj, item) => {
    
    if (!item.hasOwnProperty(keyProperty)) {
      return obj;
    }
    
    
    const key = item[keyProperty];
    
    
    obj[key] = item;
    
    return obj;
  }, {});
};

export default {
  sortByProperty,
  filterByProperty,
  groupByProperty,
  removeDuplicates,
  removeDuplicatesByProperty,
  findByProperty,
  mapToObject
};
