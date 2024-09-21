require("dotenv").config();
const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "",
    host: "localhost",
    dialect: "postgres",
  },
};

module.exports = config;
