import { ValidationErrorMessageType } from "features/api";
import { Field, FieldProps, GenericFieldHTMLAttributes } from "formik";
import { InputNumber, InputNumberProps } from "primereact/inputnumber";
import { useId } from "react";
import { FieldContainer } from "./field-container.componen";

type NumberFieldProps = InputNumberProps & {
  label?: string;
  helperText?: string;
  error?: boolean;
  numberClassName?: string;
};

function NumberField({
  name,
  id,
  label,
  disabled,
  className = "",
  error,
  helperText,
  numberClassName = "",
  ...rest
}: NumberFieldProps) {
  const generatedID = useId();
  const inputId = id || generatedID;

  return (
    <FieldContainer>
      {label && <label htmlFor={inputId}>{label}</label>}

      <InputNumber
        className={`p-inputtext-sm ${numberClassName}`}
        inputId={inputId}
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
  numberFieldProps?: NumberFieldProps;
};

export function FormikNumberField({
  numberFieldProps,
  apiError,
  disabled,
  ...rest
}: FormikTextFieldProps) {
  return (
    <Field {...rest}>
      {({
        field: { onChange: _, ...restOfField },
        meta: { touched, error },
        form: { isSubmitting, setFieldValue },
      }: FieldProps<number>) => (
        <NumberField
          {...restOfField}
          {...numberFieldProps}
          disabled={disabled || isSubmitting}
          error={!!apiError || (touched && !!error)}
          onChange={(event) => {
            setFieldValue(restOfField.name, event.value);
          }}
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
