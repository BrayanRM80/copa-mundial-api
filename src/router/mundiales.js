import { Router } from "express";
import * as gameRepo from "../repository/mundial.js";
import { searchSchema } from "../config/schemas.js";

const router = Router();

router.get("/mundiales", (req, res) => {
  if (req.query.include === "full") {
    return res.status(200).json(gameRepo.getAllFull());
  }
  return res.status(200).json(gameRepo.getAll());
});

router.get("/random", (req, res) => {
  const result = gameRepo.getRandom();
  return res.status(200).json(result);
});

router.get("/mundial/:slug", (req, res) => {
  const result = gameRepo.getBySlug(req.params.slug);
  if (!result) {
    return res.status(404).json({ error: "No existe el recurso solicitado o la ruta no está definida." });
  }
  return res.status(200).json(result);
});

router.get("/campeon/:pais", (req, res) => {
  const result = gameRepo.getSlugsByCampeon(req.params.pais);
  return res.status(200).json(result);
});

router.get("/search/:text", (req, res) => {
  const validation = searchSchema.safeParse({ text: req.params.text });

  if (!validation.success) {
    return res.status(400).json({
      error: "La validación de entrada (zod) falló.",
      details: validation.error.flatten().fieldErrors
    });
  }

  const result = gameRepo.searchByText(req.params.text);
  return res.status(200).json(result);
});

export default router;