import {
  FormikPassWordField,
  FormikSubmitButton,
  FormikTextField,
} from "features/ui";
import { Form } from "formik";
import { LoginApiError } from "./form.config";

interface LoginFormProps {
  error?: LoginApiError;
}

export function LoginForm({ error }: LoginFormProps) {
  return (
    <Form>
      <div className="flex flex-column gap-3 ">
        <FormikTextField
          name="username"
          apiError={error?.validationErrors?.username}
          textFieldProps={{
            label: "Username or Email",
          }}
        />
        <FormikPassWordField
          name="password"
          apiError={error?.validationErrors?.password}
          passwordFieldProps={{
            label: "Password",
          }}
        />

        <div className="mx-auto mt-4">
          <FormikSubmitButton>Login</FormikSubmitButton>
        </div>
      </div>
    </Form>
  );
}
