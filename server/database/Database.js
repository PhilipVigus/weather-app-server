import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

class Database {
  static pool;

  constructor() {}

  static open() {
    if (process.env.NODE_ENV === "production") {
      Database.pool = new Pool({
        connectionString: process.env.HEROKU_CONNECTION_STRING,
      });

      return;
    }

    let dbName;

    if (process.env.NODE_ENV === "test") {
      dbName = "weather_app_test";
    } else {
      dbName = "weather_app_dev";
    }

    Database.pool = new Pool({
      host: "localhost",
      port: 5432,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: dbName,
    });
  }

  static async query(queryString) {
    return Database.pool.query(queryString);
  }

  static async close() {
    await Database.pool.end();
  }
}

export default Database;
