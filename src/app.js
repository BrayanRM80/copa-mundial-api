import express from "express";
import { join } from "path";
import { cwd } from "process";
import mundialRouter from "./router/mundiales.js";

const app = express();
const PORT = 4321;

app.use(express.json());

app.use("/imagenes", express.static(join(cwd(), "public", "imagenes")));

app.get("/", (req, res) => {
  res.status(200).json({
    nombre: "API REST de la Copa Mundial de la FIFA",
    version: "1.0.0",
    descripcion: "Laboratorio modular evaluado usando Express, SQLite nativo y Zod."
  });
});

app.use(mundialRouter);

app.use((req, res) => {
  res.status(404).json({ error: "No existe el recurso solicitado o la ruta no está definida." });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express ejecutándose en http://localhost:${PORT}`);
});