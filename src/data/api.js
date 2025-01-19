/* eslint-disable no-undef */
import data from "./data.json";

let users = [...data]; // In-memory data for simplicity

// Function to retrieve data from local storage or fallback to the initial data
const getUsersFromStorage = () => {
  const storedData = localStorage.getItem('userProfiles');
  if (!storedData) {
    saveUsersToStorage(data);
  }

  return JSON.parse(storedData);

};


// Function to save data to local storage
const saveUsersToStorage = (data) => {
  localStorage.setItem('userProfiles', JSON.stringify(data));
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  async getUsers() {
    await delay(500);
    let usersFromStorage = getUsersFromStorage();
    if (usersFromStorage.length === 0) {
      usersFromStorage = [...data]; // Fallback to in-memory JSON
    }
    return usersFromStorage;
  },
  

  async getUser(id) {
    await delay(500);
    users = getUsersFromStorage();
    return users.find((user) => user.id === id) || null;
  },

  async addUser(newUser) {
    await delay(500);
    users = getUsersFromStorage();
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const user = { id, ...newUser };
    users.push(user);
    saveUsersToStorage(users);
    return user;
  },

  async updateUser(id, updatedUser) {
    await delay(500);
    users = getUsersFromStorage();
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      saveUsersToStorage(users);
      return users[index];
    }
    return null;
  },

  async deleteUser(id) {
    await delay(500);
    users = getUsersFromStorage();
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const [deletedUser] = users.splice(index, 1);
      saveUsersToStorage(users);
      return deletedUser;
    }
    return null;
  },
};

export default api;
