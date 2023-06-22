import { ValidationErrorMessageType } from "features/api";
import { Field, FieldProps, GenericFieldHTMLAttributes } from "formik";
import { InputText, InputTextProps } from "primereact/inputtext";
import { useId } from "react";
import { FieldContainer } from "./field-container.componen";

type TextFieldProps = InputTextProps & {
  label?: string;
  helperText?: string;
  error?: boolean;
  inputClassName?: string;
};

function TextField({
  name,
  id,
  label,
  disabled,
  className = "",
  error,
  helperText,
  inputClassName = "",
  ...rest
}: TextFieldProps) {
  const generatedID = useId();
  const inputId = id || generatedID;

  return (
    <FieldContainer>
      {label && <label htmlFor={inputId}>{label}</label>}

      <InputText
        className={`p-inputtext-sm ${inputClassName}`}
        id={inputId}
        name={name}
        disabled={disabled}
        {...rest}
      />

      {error && <small className={"p-error"}>{helperText}</small>}
      {helperText && !error && <small>{helperText}</small>}
    </FieldContainer>
  );
}

type FormikTextFieldProps = GenericFieldHTMLAttributes & {
  apiError?: ValidationErrorMessageType;
  textFieldProps?: TextFieldProps;
};

export function FormikTextField({
  textFieldProps,
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
      }: FieldProps<string>) => (
        <TextField
          {...field}
          {...textFieldProps}
          disabled={disabled || isSubmitting}
          error={!!apiError || (touched && !!error)}
          helperText={
            apiError
              ? apiError
              : touched && !!error
              ? (error as string)
              : textFieldProps?.helperText
          }
        />
      )}
    </Field>
  );
}
