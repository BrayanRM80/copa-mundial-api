import { z } from "zod";

export const searchSchema = z.object({
  text: z.string().min(3, { message: "El texto de búsqueda debe tener un mínimo de 3 caracteres" })
});