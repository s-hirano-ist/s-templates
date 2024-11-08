import type { Response } from "express";

const DUPLICATE_ENTRY_MESSAGE =
  "SQLITE_CONSTRAINT: UNIQUE constraint failed: stocks.name";
export function internalServerError(response: Response, error: Error) {
  if (error.message === DUPLICATE_ENTRY_MESSAGE) {
    response.status(400).json({
      message: "ERROR: Duplicate Entry",
    });
    console.error("ERROR:", error.message);
  } else {
    response.status(500).json({
      message: "Internal server error",
    });
    console.error("INTERNAL SERVER ERROR:", error.message);
  }
}
