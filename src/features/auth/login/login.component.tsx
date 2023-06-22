import { Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Message } from "primereact/message";
import { useEffect, useState } from "react";
import { LoginErrorFallbackMsg } from "./constants";
import { InititalValue, LoginRequest, LoginSchema } from "./form.config";
import { LoginForm } from "./login-form.component";

export const Login = () => {
  const {
    push,
    query: { callbackUrl },
  } = useRouter();
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const onSubmit = async (value: LoginRequest) => {
    const resp = await signIn("credentials", {
      redirect: false,
      ...value,
    });
    if (resp?.ok) {
      push((callbackUrl as string) || resp?.url || "/");
    } else {
      setError(LoginErrorFallbackMsg);
    }
  };

  useEffect(() => {
    if (session) {
      push((callbackUrl as string) || "/");
    }
  }, [session]);

  return (
    <div className="flex align-items-center justify-content-center mt-8 p-3 sm:p-0">
      <div className="px-4 py-3 border-round-sm border-blue-100 border-1 bg-blue-50 w-full sm:w-9 md:w-6 lg:w-3">
        <h3 className="text-center mb-4">Login</h3>

        {error && (
          <Message severity="error" content={error} className="mb-3 w-full" />
        )}

        <Formik
          initialValues={InititalValue}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {() => <LoginForm />}
        </Formik>
      </div>
    </div>
  );
};
