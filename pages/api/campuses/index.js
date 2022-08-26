import {
  getCampuses,
  createCampus,
  InvalidInputError
} from "../../../models/campus";

async function handleGetCampuses(req, res) {
  const { limit, offset } = req.query;
  const [items, total] = await getCampuses(limit, offset);
  res.setHeader("x-total-count", total.count);
  return res.json(items);
}

async function handlePostCampus(req, res) {
  try {
    const newCampus = await createCampus({ name: req.body.name });
    res.json(newCampus);
  } catch (error) {
    if (error instanceof InvalidInputError) {
      res.status(422).end(error.message);
    }
  }
}

export default async function handleCampusListRequest(req, res) {
  if (req.method === "GET") handleGetCampuses(req, res);
  else if (req.method === "POST") handlePostCampus(req, res);
}
