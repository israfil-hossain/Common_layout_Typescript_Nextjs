import { NextApiRequest } from "next";
import { verifyJwt } from "./verify-jwt";

export function authenticate(req: NextApiRequest): boolean {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return false;
  }

  return !!verifyJwt(token);
}
