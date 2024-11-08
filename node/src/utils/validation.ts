import { ValidationError } from "./error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateStock(body: any) {
  const { name, amount } = body;

  if (typeof name === "string") {
    if (!amount) {
      // MEMO: if amount is not specified, set 1.
      return { name, amount: 1 };
    }
    if (typeof amount === "number") {
      return { name, amount };
    }
  }
  throw new ValidationError("InvalidRequestException");
}
