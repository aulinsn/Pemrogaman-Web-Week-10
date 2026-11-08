import type { NextFunction, Request, Response } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Body JSON yang rusak
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Body bukan JSON yang valid" });
  }

  console.error(err);
  res.status(500).json({ message: "Terjadi kesalahan pada server" });
}
