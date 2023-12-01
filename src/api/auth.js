import { clearUserData, setUserData } from "../views/utils.js";
import { get, post } from "./api.js";

const endpoints = {
  register: "/users",
  login: "/login",
  logout: "/logout",
};

export async function registerUser(username, password) {
  const userData = await post(endpoints.register, { username, password, });
  userData.username = username
  setUserData(userData);
  return userData
}
export async function loginUser(username, password) {
  const userData = await post(endpoints.login, { username, password });
  setUserData(userData);
  return userData
}
export async function logoutUser() {
  get(endpoints.logout);
  clearUserData();
}
