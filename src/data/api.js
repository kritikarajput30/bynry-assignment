import toast from "react-hot-toast";
import data from "./data.json";

let users = [...data]; // In-memory data for simplicity

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  async getUsers() {
    await delay(500);
    return users;
  },

  async getUser(id) {
    await delay(500);
    return users.find((user) => user.id === id) || null;
  },

  async addUser(newUser) {
    await delay(500);
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const user = { id, ...newUser };
    users.push(user);
    toast.success("User added successfully!");
    return user;
  },

  async updateUser(id, updatedUser) {
    await delay(500);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      toast.success("User updated successfully!");
      return users[index];
    }
    toast.error("User not found.");
    return null;
  },

  async deleteUser(id) {
    await delay(500);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const [deletedUser] = users.splice(index, 1);
      toast.success("User deleted successfully!");
      return deletedUser;
    }
    toast.error("User not found.");
    return null;
  },
};

export default api;
