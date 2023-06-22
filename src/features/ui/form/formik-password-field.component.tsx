import { ValidationErrorMessageType } from "features/api";
import { Field, FieldProps, GenericFieldHTMLAttributes } from "formik";
import { Password, PasswordProps } from "primereact/password";
import { useId } from "react";
import { FieldContainer } from "./field-container.componen";

type PasswordFieldProps = PasswordProps & {
  label?: string;
  helperText?: string;
  error?: boolean;
  passwordClassName?: string;
};

function PasswordField({
  name,
  id,
  label,
  disabled,
  className = "",
  error,
  helperText,
  passwordClassName = "",
  ...rest
}: PasswordFieldProps) {
  const generatedID = useId();
  const inputId = id || generatedID;
  return (
    <FieldContainer>
      {label && <label htmlFor={inputId}>{label}</label>}

      <Password
        className={`p-input text-sm ${passwordClassName}`}
        inputId={inputId}
        name={name}
        disabled={disabled}
        toggleMask
        inputClassName={`w-full ${rest.inputClassName || ""}`}
        {...rest}
      />

      {error && <small className={"p-error"}>{helperText}</small>}
      {helperText && !error && <small>{helperText}</small>}
    </FieldContainer>
  );
}

type FormikTextFieldProps = GenericFieldHTMLAttributes & {
  apiError?: ValidationErrorMessageType;
  passwordFieldProps?: PasswordFieldProps;
};

export function FormikPassWordField({
  passwordFieldProps: numberFieldProps,
  apiError,
  disabled,
  ...rest
}: FormikTextFieldProps) {
  return (
    <Field {...rest}>
      {({
        field,
        meta: { touched, error },
        form: { isSubmitting },
      }: FieldProps<number>) => (
        <PasswordField
          {...field}
          {...numberFieldProps}
          disabled={disabled || isSubmitting}
          error={!!apiError || (touched && !!error)}
          helperText={
            apiError
              ? apiError
              : touched && !!error
              ? (error as string)
              : numberFieldProps?.helperText
          }
        />
      )}
    </Field>
  );
}
