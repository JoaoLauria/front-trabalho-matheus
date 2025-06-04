/**
 * Ordena um array de objetos por uma propriedade
 * 
 * @param {Array} array - Array a ser ordenado
 * @param {string} property - Propriedade para ordenação
 * @param {boolean} ascending - Se a ordenação deve ser ascendente
 * @returns {Array} Array ordenado
 */
export const sortByProperty = (array, property, ascending = true) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return [];
  }
  
  const sortedArray = [...array];
  
  sortedArray.sort((a, b) => {
    // Verifica se a propriedade existe nos objetos
    if (!a.hasOwnProperty(property) || !b.hasOwnProperty(property)) {
      return 0;
    }
    
    // Obtém os valores para comparação
    let valueA = a[property];
    let valueB = b[property];
    
    // Converte para minúsculas se for string
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    // Compara os valores
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

/**
 * Filtra um array de objetos por uma propriedade e valor
 * 
 * @param {Array} array - Array a ser filtrado
 * @param {string} property - Propriedade para filtro
 * @param {any} value - Valor para filtro
 * @returns {Array} Array filtrado
 */
export const filterByProperty = (array, property, value) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return [];
  }
  
  return array.filter(item => {
    // Verifica se a propriedade existe no objeto
    if (!item.hasOwnProperty(property)) {
      return false;
    }
    
    // Compara o valor
    if (typeof item[property] === 'string' && typeof value === 'string') {
      return item[property].toLowerCase().includes(value.toLowerCase());
    }
    
    return item[property] === value;
  });
};

/**
 * Agrupa um array de objetos por uma propriedade
 * 
 * @param {Array} array - Array a ser agrupado
 * @param {string} property - Propriedade para agrupamento
 * @returns {Object} Objeto com os grupos
 */
export const groupByProperty = (array, property) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return {};
  }
  
  return array.reduce((groups, item) => {
    // Verifica se a propriedade existe no objeto
    if (!item.hasOwnProperty(property)) {
      return groups;
    }
    
    // Obtém o valor da propriedade
    const key = item[property];
    
    // Cria o grupo se não existir
    if (!groups[key]) {
      groups[key] = [];
    }
    
    // Adiciona o item ao grupo
    groups[key].push(item);
    
    return groups;
  }, {});
};

/**
 * Remove itens duplicados de um array
 * 
 * @param {Array} array - Array com itens duplicados
 * @returns {Array} Array sem itens duplicados
 */
export const removeDuplicates = (array) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return [];
  }
  
  return [...new Set(array)];
};

/**
 * Remove itens duplicados de um array de objetos por uma propriedade
 * 
 * @param {Array} array - Array com itens duplicados
 * @param {string} property - Propriedade para verificar duplicidade
 * @returns {Array} Array sem itens duplicados
 */
export const removeDuplicatesByProperty = (array, property) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return [];
  }
  
  const seen = new Set();
  
  return array.filter(item => {
    // Verifica se a propriedade existe no objeto
    if (!item.hasOwnProperty(property)) {
      return true;
    }
    
    // Obtém o valor da propriedade
    const key = item[property];
    
    // Verifica se o valor já foi visto
    if (seen.has(key)) {
      return false;
    }
    
    // Adiciona o valor ao conjunto de vistos
    seen.add(key);
    
    return true;
  });
};

/**
 * Encontra um item em um array de objetos por uma propriedade e valor
 * 
 * @param {Array} array - Array a ser pesquisado
 * @param {string} property - Propriedade para busca
 * @param {any} value - Valor para busca
 * @returns {Object|null} Item encontrado ou null
 */
export const findByProperty = (array, property, value) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return null;
  }
  
  return array.find(item => {
    // Verifica se a propriedade existe no objeto
    if (!item.hasOwnProperty(property)) {
      return false;
    }
    
    // Compara o valor
    return item[property] === value;
  }) || null;
};

/**
 * Mapeia um array para um objeto usando uma propriedade como chave
 * 
 * @param {Array} array - Array a ser mapeado
 * @param {string} keyProperty - Propriedade a ser usada como chave
 * @returns {Object} Objeto mapeado
 */
export const mapToObject = (array, keyProperty) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return {};
  }
  
  return array.reduce((obj, item) => {
    // Verifica se a propriedade existe no objeto
    if (!item.hasOwnProperty(keyProperty)) {
      return obj;
    }
    
    // Obtém o valor da propriedade
    const key = item[keyProperty];
    
    // Adiciona o item ao objeto
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
