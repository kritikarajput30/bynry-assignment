import data from "./data.json";

let users = [...data]; // In-memory data for simplicity

// Simulate an async delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  // Get all users
  async getUsers() {
    await delay(500); // Simulate delay
    return users;
  },

  // Get a single user by ID
  async getUser(id) {
    await delay(500);
    return users.find((user) => user.id === id) || null;
  },

  // Add a new user
  async addUser(newUser) {
    await delay(500);
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const user = { id, ...newUser };
    users.push(user);
    return user;
  },

  // Update an existing user
  async updateUser(id, updatedUser) {
    await delay(500);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      return users[index];
    }
    return null;
  },

  // Delete a user by ID
  async deleteUser(id) {
    await delay(500);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const [deletedUser] = users.splice(index, 1);
      return deletedUser;
    }
    return null;
  },
};

export default api;
