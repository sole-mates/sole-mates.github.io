import { clearUserData, getUserData, setUserData } from "../views/utils.js";
import { get, post, del } from "./api.js";

const endpoints = {
  register: "/users",
  login: "/login",
  logout: "/logout",
  sessionByToken: (token) => `/sessions?${filter('sessionToken', token)}`,
  sessionById: (id) => `/sessions/${id}`,
};

export async function registerUser(username, password) {
  const { objectId, sessionToken } = await post(endpoints.register, { username, password, });

  setUserData({
    username,
    objectId,
    sessionToken
  });
}
export async function loginUser(username, password) {
  const { objectId, sessionToken } = await post(endpoints.login, { username, password });
  setUserData({
    username,
    objectId,
    sessionToken
  });
}

export async function logoutUser() {
  const sessionToken = getUserData().sessionToken;
  try {
    const sessions = await get(endpoints.sessionByToken(sessionToken));
    const [currentSession] = sessions.results;
    await del(endpoints.sessionById(currentSession.objectId));
  } catch (error) {
    alert(error.message);
  } finally {
    clearUserData();
  }
}

function filter(fieldName, value) {
  const query = JSON.stringify({ [fieldName]: value });

  return `where=${encodeURIComponent(query)}`;
}