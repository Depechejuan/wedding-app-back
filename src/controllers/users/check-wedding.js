const { checkWedding } = require("../../services/db-services");
const { weddingAlreadyCreated } = require("../../services/error-services");

module.exports = {
    async checkWedding(id) {
        console.log(":)");
        console.log(id);

        const check = await checkWedding(id);
        console.log(".........");
        console.log(check);

        if (check.length > 0) {
            throw weddingAlreadyCreated();
        }
    },
};
