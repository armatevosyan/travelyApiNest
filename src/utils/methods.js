export const isUserLoggedIn = () => {
  const isLoggedIn = !!localStorage.getItem('userData');
  const user = JSON.parse(localStorage.getItem('userData')) || {};

  try {
    if (isObjectHasLength(user) && isLoggedIn) {
      return {
        isLoggedIn,
        user
      };
    } else {
      return {
        isLoggedIn,
        user
      };
    }
  } catch (e) {
    return {
      isLoggedIn,
      user
    };
  }
};

export const catchResponseMessages = (e) => {
  if (e?.response?.data) {
    return !Array.isArray(e?.response?.data.message) ? [e?.response?.data.message] : e?.response?.data.message;
  }

  return [];
};
