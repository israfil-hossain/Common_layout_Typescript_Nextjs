import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { ErrorResponse } from "./error-response.type";
import { HttpStatusCode } from "axios";
import { parseYupValidationErrors } from "./parse-yup-validation-errors";
import userList from "./users.json";
import { genJwt } from "./gen-jwt";
import { LoginResponse } from "./login.api";
import { verifyJwt } from "./verify-jwt";
import { omit } from "lodash";

const schema = yup.object({
  refresh_token: yup.string().label("Refresh token").required(),
});

export async function refreshToken(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | LoginResponse>
) {
  if (req.method?.toLowerCase() !== "post") {
    return res.status(HttpStatusCode.NotFound).json({
      status: HttpStatusCode.NotFound,
      message: "Api endpoint not found",
    });
  }

  try {
    const validated = await schema.validate(req.body, { abortEarly: false });
    const payload = verifyJwt(validated.refresh_token);
    if (!payload) {
      return res.status(HttpStatusCode.Unauthorized).json({
        status: HttpStatusCode.Unauthorized,
        message: "Unauthorized",
      });
    }

    const user = userList.find((user) => {
      return user.id === (payload as { token: string }).token;
    });

    return res.status(HttpStatusCode.Ok).json({
      access_token: genJwt({ id: user?.id }),
      refresh_token: genJwt({ token: user?.id }, "1d"),
      user: omit(user, ["password"]),
    });
  } catch (err) {
    return res.status(HttpStatusCode.BadRequest).json({
      status: HttpStatusCode.BadRequest,
      validationErrors: parseYupValidationErrors(err as yup.ValidationError),
    });
  }
}
