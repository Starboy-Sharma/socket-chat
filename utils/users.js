class User {
  users = [];

  addUser(id, username, room) {
    this.user = { id, username, room };
    this.users.push(this.user);

    return this.user;
  }

  getUsers() {
    return this.users;
  }

  getCurrentUser(id) {
    return this.users.find((user) => user.id === id);
  }

  getRoomUsers(room) {
    return this.users.filter((user) => user.room === room);
  }

  userLeave(id) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
  }
}

const user = new User();

module.exports = {
  user: user,
};
