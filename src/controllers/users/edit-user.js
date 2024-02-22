"use strict";

const { getUserById, saveEditUser } = require("../../services/db-services");

module.exports = {
    async editUser(idUser, data) {
        // const oldUser = await getUserById(idUser);
        const update = await saveEditUser(idUser, data);
        return update;
    },
};
