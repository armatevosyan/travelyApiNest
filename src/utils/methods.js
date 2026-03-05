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
    const data = e.response.data;
    const msg = data?.message;
    if (msg != null) {
      return Array.isArray(msg) ? msg : [msg];
    }
  }
  return [];
};
