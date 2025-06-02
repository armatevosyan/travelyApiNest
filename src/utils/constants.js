export const removeEmptyItemsFromObject = (obj) => {
  if (typeof obj !== 'object') {
    return obj;
  }
  for (const [field, value] of Object.entries(obj)) {
    if (value !== false && value !== 0 && !value) {
      delete obj[field];
    } else if (Array.isArray(value) && !value.length) {
      delete obj[field];
    } else if (field === 'confirmPassword') {
      delete obj[field];
    }
    if (typeof obj[field] === 'object') {
      removeEmptyItemsFromObject(obj[field]);
    }
  }

  return obj;
};

export const isObjectHasLength = (obj) => {
  try {
    return !!Object.values(obj).length;
  } catch (e) {
    return false;
  }
};
