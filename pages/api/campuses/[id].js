import {
  removeCampus,
  getCampus,
  updateCampus,
  NotFoundError,
  InvalidInputError
} from "../../../models/campus";

async function handleGetCampus(req, res) {
  console.log(req.query)

  try {
    const campus = await getCampus(req.query.id);
    res.json(campus);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).end(error.message);
    }
  }
}

async function handlePatchCampus(req, res) {
  try {
    res.json(await updateCampus(req.query.id, req.body));
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).end(error.message);
    } else if (error instanceof InvalidInputError) {
      res.status(422).end(error.message);
    }
  }
}

async function handleDeleteCampus(req, res) {
  try {
    await removeCampus(req.query.id);
    res.status(204).end();
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).end(error.message);
    }
  }
}

export default async function handleSingleCampusRequest(req, res) {
  if (req.method === "GET") handleGetCampus(req, res);
  else if (req.method === "PATCH") handlePatchCampus(req, res);
  else if (req.method === "DELETE") handleDeleteCampus(req, res);
  else res.status(405, "Method not allowed").end();
}
