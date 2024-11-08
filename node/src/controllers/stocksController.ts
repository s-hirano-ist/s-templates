import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  ValidationError,
  notFoundError,
  prismaError,
  unknownError,
  validationError,
} from "../utils/error";
import { validateStock } from "../utils/validation";

const prisma = new PrismaClient();

export const getAllStocks = async (_: Request, response: Response) => {
  try {
    const allStocks = await prisma.stocks.findMany({
      select: {
        name: true,
        amount: true,
      },
    });
    const output: Record<string, number> = {};
    allStocks
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map(d => {
        output[d.name] = d.amount;
      });
    response.status(200).json(output);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      prismaError(response, error);
    } else {
      unknownError(response, error);
    }
  }
};

export const getStocksByName = async (request: Request, response: Response) => {
  try {
    const stocks = await prisma.stocks.findUnique({
      where: { name: request.params.name },
    });
    if (stocks === null) {
      notFoundError(response);
    } else {
      response.status(200).json({ [stocks.name]: stocks.amount });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      prismaError(response, error);
    } else {
      unknownError(response, error);
    }
  }
};

export const createStocks = async (request: Request, response: Response) => {
  try {
    const { name, amount } = validateStock(request.body);
    const data = await prisma.stocks.create({
      data: { name, amount },
    });
    response.status(201).json({
      name: data.name,
      amount: data.amount,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      validationError(response);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      prismaError(response, error);
    } else {
      unknownError(response, error);
    }
  }
};

export const updateStocks = async (request: Request, response: Response) => {
  try {
    const { name, amount } = validateStock(request.body);
    await prisma.stocks.update({
      where: { name },
      data: {
        amount: amount,
      },
    });
    response.status(200).json({
      message: `Updated ${name} if exists`,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      validationError(response);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      prismaError(response, error);
    } else {
      unknownError(response, error);
    }
  }
};

export const deleteAllStocks = async (_: Request, response: Response) => {
  try {
    await prisma.stocks.deleteMany();
    response.status(200).json({
      message: "Deleted all",
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      prismaError(response, error);
    } else {
      unknownError(response, error);
    }
  }
};

export const deleteStocksByName = async (
  request: Request,
  response: Response,
) => {
  const name = request.params.name;

  try {
    await prisma.stocks.delete({
      where: { name: name },
    });
    response.status(200).json({
      message: `Deleted ${name} if exists`,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      prismaError(response, error);
    } else {
      unknownError(response, error);
    }
  }
};
