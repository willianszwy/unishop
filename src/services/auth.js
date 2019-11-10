export const TOKEN_KEY = "Unishop-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = data => {
    localStorage.setItem(TOKEN_KEY, data.access_token);
    setUser(data.user);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("currentUser");
};
export const getUser = () => JSON.parse(localStorage.getItem("currentUser"));
export const setUser = user =>
    localStorage.setItem("currentUser", JSON.stringify(user));
