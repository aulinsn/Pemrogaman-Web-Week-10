import type { NextFunction, Request, Response } from "express";

// Mengambil id dari path (/products/:id) atau dari body (PUT /products)
export function validateId(req: Request, res: Response, next: NextFunction) {
  const raw = req.params.id ?? req.body?.id;
  const id = Number(raw);

  if (raw === undefined || !Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Validasi gagal",
      errors: ["id wajib berupa bilangan bulat positif"],
    });
  }

  res.locals.productId = id;
  next();
}

export function validateProductBody(req: Request, res: Response, next: NextFunction) {
  const { name, price } = req.body ?? {};
  const errors: string[] = [];

  if (typeof name !== "string" || name.trim() === "") {
    errors.push("name wajib berupa teks dan tidak boleh kosong");
  }
  if (typeof price !== "number" || !Number.isInteger(price) || price < 0) {
    errors.push("price wajib berupa bilangan bulat dan tidak boleh negatif");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validasi gagal", errors });
  }

  req.body.name = name.trim();
  next();
}
