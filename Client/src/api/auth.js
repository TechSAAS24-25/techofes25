import axios from "../helper/axios";
const loginUrl = "/api/auth/login";
const registerUrl = "/api/auth/register";
const logoutUrl = "/api/auth/logout";
import storage from "../services/storage";

//implement try and catch blocks for error handling in the frontend

// Login user
// Send username and password to the server
// If the user is authenticated, the server will return a token
// along with token the user T_ID, username is also sent
// If the user is not authenticated, the server will return an error
// The token is stored in local storage
// The token is used to authenticate requests to the server
// The token is sent in the Authorization header
// The token is prefixed with 'Bearer
// The response can be stored using
// const service = require('./service');
// service.saveUser(response);
// The user details can be retrieved using
// const user = service.loadUser();
// const token = user.token;
// The token can be removed using
// service.removeUser();
// The username can be retrieved using
// const username = service.me();

const login = async (username, password) => {
  const response = await axios.post(loginUrl, { username, password });
  storage.saveUser(response.data);
  return response.data;
};

// Register user
// refer user model for the fields required
// returns the following fields
// message: string
// user: object
// do not ask for T_ID from the user, it is automatically generated

const register = async (user) => {
  const response = await axios.post(registerUrl, user);
  console.log("user:", user);
  console.log(response);
  return response.data;
};

// Logout user
// returns the success message

const logout = async () => {
  const response = await axios.post(logoutUrl);
  storage.removeUser();
  return response.data;
};

export default { login, register, logout };
