import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";
import { readFileSync, unlinkSync } from "node:fs";

const DATABASE_FILE = `${cwd()}/data/games.db`;

try {
  unlinkSync(DATABASE_FILE);
} catch (e) {}

const db = new DatabaseSync(DATABASE_FILE);

db.exec(`
  CREATE TABLE games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    anio INTEGER,
    sede TEXT,
    campeon TEXT,
    subcampeon TEXT,
    goleador TEXT,
    equipos INTEGER,
    imagen TEXT,
    slug TEXT UNIQUE NOT NULL,
    resumen TEXT,
    description TEXT
  );
`);

const rawData = readFileSync(`${cwd()}/data/mundiales.json`, "utf-8");
const mundiales = JSON.parse(rawData);

const insert = db.prepare(`
  INSERT INTO games (nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, description)
  VALUES (:nombre, :anio, :sede, :campeon, :subcampeon, :goleador, :equipos, :imagen, :slug, :resumen, :description)
`);

for (const mundial of mundiales) {
  insert.run({
    nombre: mundial.nombre,
    anio: mundial.anio,
    sede: mundial.sede,
    campeon: mundial.campeon,
    subcampeon: mundial.subcampeon,
    goleador: mundial.goleador,
    equipos: mundial.equipos,
    imagen: mundial.imagen,
    slug: mundial.slug,
    resumen: mundial.resumen,
    description: mundial.descripcion
  });
}

console.log("⚽ Base de datos relacional creada y poblada con éxito.");