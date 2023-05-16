const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node_complete", "root", "DonnaLee23", {
	dialect: "mysql",
	host: "localhost",
});
module.exports = sequelize;
