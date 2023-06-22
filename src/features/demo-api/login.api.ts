import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { ErrorResponse } from "./error-response.type";
import { HttpStatusCode } from "axios";
import { parseYupValidationErrors } from "./parse-yup-validation-errors";
import userList from "./users.json";
import { genJwt } from "./gen-jwt";
import { omit } from "lodash";
import { User } from "next-auth";

const schema = yup.object({
  username: yup.string().label("Username/Email").required(),
  password: yup.string().label("Password").min(4).required(),
});

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export async function login(
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
    const user = userList.find((user) => {
      return (
        user.name === validated.username ||
        user.email === validated.username.toLowerCase()
      );
    });
    if (!user || user.password !== validated.password) {
      return res.status(HttpStatusCode.BadRequest).json({
        status: HttpStatusCode.BadRequest,
        message: "Invalid username or password",
      });
    }

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
