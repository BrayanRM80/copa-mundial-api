import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";

const db = new DatabaseSync(`${cwd()}/data/games.db`);

export const getAll = () => {
  const query = db.prepare("SELECT slug FROM games");
  return query.all();
};

export const getAllFull = () => {
  const query = db.prepare(`
    SELECT id, nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, description AS descripcion 
    FROM games
  `);
  return query.all();
};

export const getBySlug = (slug) => {
  const query = db.prepare(`
    SELECT id, nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, description AS descripcion 
    FROM games 
    WHERE slug = ?
  `);
  return query.get(slug);
};

export const getSlugsByCampeon = (pais) => {
  const query = db.prepare("SELECT slug FROM games WHERE LOWER(campeon) = LOWER(?)");
  return query.all(pais);
};

export const getRandom = () => {
  const query = db.prepare(`
    SELECT id, nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, description AS descripcion 
    FROM games 
    ORDER BY RANDOM() 
    LIMIT 1
  `);
  return query.get();
};

export const searchByText = (text) => {
  const query = db.prepare(`
    SELECT id, nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, description AS descripcion 
    FROM games 
    WHERE LOWER(nombre) LIKE ? 
       OR LOWER(resumen) LIKE ? 
       OR LOWER(description) LIKE ?
  `);
  const term = `%${text.toLowerCase()}%`;
  return query.all(term, term, term);
};