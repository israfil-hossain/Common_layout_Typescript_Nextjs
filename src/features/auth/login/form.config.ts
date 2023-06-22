import { usePost } from "features/api";
import { User } from "features/models";
import * as yup from "yup";

export const LoginSchema = yup.object({
  username: yup.string().label("Username/Email").min(1).max(50).required(),
  password: yup.string().label("Password").min(4).required(),
});

export type LoginRequest = yup.InferType<typeof LoginSchema>;

export const InititalValue: LoginRequest = {
  username: "",
  password: "",
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export type LoginApiResponse = ReturnType<
  typeof usePost<LoginRequest, LoginResponse>
>;

export type LoginApiError = LoginApiResponse["error"];
