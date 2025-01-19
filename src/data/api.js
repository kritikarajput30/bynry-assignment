/* eslint-disable no-undef */
import data from "./data.json";

let users = [...data];

const getUsersFromStorage = () => {
  const storedData = localStorage.getItem("userProfiles");
  if (!storedData) {
    saveUsersToStorage(data);
  }

  return JSON.parse(storedData);
};

const saveUsersToStorage = (data) => {
  localStorage.setItem("userProfiles", JSON.stringify(data));
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  async getUsers() {
    await delay(500);
    return getUsersFromStorage();
  },

  async getUser(id) {
    await delay(500);
    const usersFromStorage = getUsersFromStorage();
    return usersFromStorage.find((user) => user.id === id) || null;
  },

  async addUser(newUser) {
    await delay(500);
    const usersFromStorage = getUsersFromStorage();
    const id = usersFromStorage.length
      ? usersFromStorage[usersFromStorage.length - 1].id + 1
      : 1;
    const user = { id, ...newUser };
    usersFromStorage.push(user);
    saveUsersToStorage(usersFromStorage);
    return user;
  },

  async updateUser(id, updatedUser) {
    await delay(500);
    const usersFromStorage = getUsersFromStorage();
    const index = usersFromStorage.findIndex((user) => user.id === id);
    if (index !== -1) {
      usersFromStorage[index] = { ...usersFromStorage[index], ...updatedUser };
      saveUsersToStorage(usersFromStorage);
      return usersFromStorage[index];
    }
    return null;
  },

  async deleteUser(id) {
    await delay(500);
    const usersFromStorage = getUsersFromStorage();
    const index = usersFromStorage.findIndex((user) => user.id === id);
    if (index !== -1) {
      const [deletedUser] = usersFromStorage.splice(index, 1);
      saveUsersToStorage(usersFromStorage);
      return deletedUser;
    }
    return null;
  },
};

export default api;
