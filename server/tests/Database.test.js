import Database from "../database/Database";

describe("Database", () => {
  describe("query", () => {
    it("queries the database", async () => {
      Database.open();
      await Database.query(
        "CREATE TABLE test_table(id serial PRIMARY KEY, username VARCHAR (50));"
      );
      await Database.query(
        "INSERT INTO test_table (username) VALUES ('name');"
      );
      const result = await Database.query("SELECT * FROM test_table;");
      await Database.query("DROP TABLE test_table;");
      await Database.close();

      expect(result.rowCount).toEqual(1);
    });
  });
});
