import Database from "better-sqlite3";

let db = null;
export async function getDb() {
  if (db) return db;
  db = new Database(":memory:");
  await db.exec(`
      DROP TABLE IF EXISTS campus; 
      CREATE TABLE campus (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR);
      INSERT INTO campus (name) VALUES 
      ('Amsterdam'),
      ('Barcelona'),
      ('Berlin'),
      ('Biarritz'),
      ('Bordeaux'),
      ('Brussels'),
      ('Bucharest'),
      ('La Loupe'),
      ('Lille'),
      ('Lisbon'),
      ('London'),
      ('Lyon'), 
      ('Madrid'),
      ('Marseille'),
      ('Nantes'),
      ('Orléans'),
      ('Paris'),
      ('Reims'),
      ('Remote'),
      ('Strasbourg'),
      ('Toulouse'),
      ('Tours');`);

  return db;
}
