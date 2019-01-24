const setUserSession = (user, { authenticated, authenticating, roles }) => {
  const data = JSON.stringify({
    user,
    authenticated,
    authenticating,
    roles,
  });

  localStorage.setItem("userSession", data);
};

const getUserSession = () => JSON.parse(localStorage.getItem("userSession"));

const removeUserSession = () => localStorage.clear();

const hasUserSession = () => localStorage.hasOwnProperty("userSession");
export default {
  getUserSession,
  setUserSession,
  removeUserSession,
  hasUserSession,
};
