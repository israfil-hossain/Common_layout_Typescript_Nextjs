import { verify } from "jsonwebtoken";

export function verifyJwt(token: string) {
  try {
    const decoded = verify(token, process.env.DEMO_API_JWT_SECRET || "");
    return decoded;
  } catch {
    return false;
  }
}
