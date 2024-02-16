const { weddingData } = require("../../services/db-services");
const { weddingAlreadyCreated } = require("../../services/error-services");

module.exports = {
    async checkWedding(id) {
        const check = await weddingData(id);

        if (check) {
            console.error("Wedding already exists");
            throw weddingAlreadyCreated();
        }
    },
};
