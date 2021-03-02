import { Sequelize } from "sequelize";

// let user = "postgres";
// let password = "mysecretpassword";
// let db = "postgres";
// let port = "5432";
// let host = "postgres";
// export const database = new Sequelize(`postgres://${user}:${password}@${host}:${port}/${db}`);
export const database =  new Sequelize(process.env.DATABASE_URL);
