import { Prisma } from "@prisma/client";
import type { Response } from "express";

// MEMO: for prisma use only.
export function prismaError(
  response: Response,
  error: Prisma.PrismaClientKnownRequestError,
) {
  if (error.code === "P2002") {
    // "Unique constraint failed on the {constraint}"
    response.status(400).json({
      message: "ERROR: Duplicate Entry",
    });
    console.error("ERROR: duplicate Entry");
  } else {
    response.status(500).json({
      message: "Internal server error",
    });
    console.error("INTERNAL SERVER ERROR:", error.message);
  }
}
export function validationError(response: Response) {
  response.status(400).json({
    message: "ERROR: Invalid request",
  });
  console.error("ERROR: invalid request");
}
export function notFoundError(response: Response) {
  response.status(400).json({
    message: "ERROR: Not found",
  });
  console.error("ERROR: not found");
}
export function unknownError(response: Response, error: unknown) {
  if (error instanceof Error) {
    response.status(500).json({
      message: "Internal server error",
    });
    console.error("UNKNOWN ERROR: ", error.message);
  } else {
    response.status(500).json({
      message: "Internal server error",
    });
    console.error("UNKNOWN ERROR: ", error);
  }
}

export class ValidationError extends Error {
  constructor(message: MessageType) {
    super(message);
    this.name = message;
  }
}
type MessageType = "InvalidRequestException";
