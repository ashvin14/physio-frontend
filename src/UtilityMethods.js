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

const handleError = (ErrorStore, err) => {
  console.log(err);
  if (err.response === undefined) {
    ErrorStore.setError("Could not connect to server at this moment :/ ");
    ErrorStore.changeStatus();
    return;
  }
  ErrorStore.setError(err.response.data);
  ErrorStore.changeStatus();
};

export default {
  getUserSession,
  setUserSession,
  removeUserSession,
  hasUserSession,
  handleError,
};
