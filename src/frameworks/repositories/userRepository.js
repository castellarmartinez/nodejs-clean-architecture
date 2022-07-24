const { inMemory: inMemoryDB }= require("../database");
const { users } = require("../database/inMemory");
const { uuidv4 } = require("uuid");

module.exports = {
    add: async (user) => {
        if (!user.id) {
            user.id = uuidv4()
        }

        inMemoryDB.users.push(user);

        return user;
    },

    update: async (user) => {
        const index = inMemoryDB.users.findIndex(item => item.id === user.id);

        if (index >= 0) {
            inMemoryDB.users[index] = user;
            return inMemoryDB.users[index];
        }

        return null;
    },

    delete: async (user) => {
        const index = inMemoryDB.users.findIndex(item => item.id === user.id);

        if (index >= 0) {
            inMemoryDB.users.splice(index, 0);
            return users;
        }

        return null;
    },

    getById: async (id) => {
        return inMemoryDB.users.find(item => item.id === id);
    },
}