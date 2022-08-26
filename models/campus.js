const { getDb } = require("../db.js");

class InvalidInputError extends Error {}
class NotFoundError extends Error {}

async function getCampuses(limit = 10, offset = 0) {
  const db = await getDb();
  return Promise.all([
    db.prepare("SELECT * from campus LIMIT ? OFFSET ?").all(limit, offset),
    db.prepare("SELECT COUNT(*) as count from campus").get()
  ]);
}

async function validateCampus({ name }) {
  if (typeof name !== "string" || name.length < 1 || name.length > 50)
    throw new InvalidInputError(
      "Campus name should be a string of 1 to 50 characters"
    );
}

async function createCampus({ name }) {
  await validateCampus({ name });
  const db = await getDb();
  const { lastInsertRowid: id } = db
    .prepare("INSERT INTO campus (name) VALUES (?)", name)
    .run(name);
  return { name, id };
}

async function getCampus(id) {
  const db = await getDb();
  const campus = db.prepare("SELECT id, name FROM campus WHERE id = ?").get(id);
  if (!campus) throw new NotFoundError(`Campus with id ${id} not found.`);
  return campus;
}

async function updateCampus(id, { name }) {
  await validateCampus({ name });
  const db = await getDb();
  await getCampus(id);
  db.prepare("UPDATE campus SET name = ? WHERE id = ?").run(name, id);
  return { name, id };
}

async function removeCampus(id) {
  const db = await getDb();
  const res = db.prepare("DELETE FROM campus WHERE id = ?").run(id);
  if (res.changes === 0) throw new NotFoundError("Campus not found");
  return true;
}

module.exports = {
  InvalidInputError,
  NotFoundError,
  getCampuses,
  getCampus,
  createCampus,
  updateCampus,
  removeCampus
};
