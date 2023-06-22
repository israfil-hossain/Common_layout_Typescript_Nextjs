import { JwtPayload, sign } from "jsonwebtoken";

export function genJwt(payload: JwtPayload, exp?: string) {
  return sign(payload, process.env.DEMO_API_JWT_SECRET || "", {
    expiresIn: exp || "1h",
  });
}
