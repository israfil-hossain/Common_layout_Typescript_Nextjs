import { ValidationErrorMessageType } from "features/api";
import {
  Field,
  FieldProps,
  GenericFieldHTMLAttributes,
  useField,
} from "formik";
import { AutoComplete, AutoCompleteProps } from "primereact/autocomplete";
import { useRef } from "react";
import { FieldContainer } from "./field-container.componen";

type AutoCompleteFieldProps = Omit<AutoCompleteProps, "type"> & {
  label?: string;
  helperText?: string;
};

const AutoCompleteField = ({
  name = "",
  className,
  label,
  disabled,
  helperText,
  ...rest
}: AutoCompleteFieldProps) => {
  const ref = useRef<AutoComplete>(null);

  const [field, meta, helpers] = useField(name);
  return (
    <FieldContainer>
      {label && <label htmlFor="item">{label}</label>}

      <AutoComplete
        ref={ref}
        {...field}
        value={field.value}
        onChange={(e) => {
          helpers.setValue(e.value);
        }}
        onClick={(e) => ref.current?.search(e, "", "dropdown")}
        disabled={disabled}
        className={`${className} ${meta.error ? "p-invalid" : ""}`}
        type="search"
        {...rest}
      />

      {meta.error && <small className={"p-error"}>{meta.error}</small>}
      {helperText && !meta.error && <small>{helperText}</small>}
    </FieldContainer>
  );
};

export type FormikAutocompleteFieldProps = GenericFieldHTMLAttributes & {
  apiErrors?: ValidationErrorMessageType;
  autoCompleteProps?: AutoCompleteFieldProps;
};

export const FormikAutoComplete = ({
  disabled,
  autoCompleteProps,
  ...rest
}: FormikAutocompleteFieldProps) => {
  return (
    <Field {...rest}>
      {({ field, form: { isSubmitting } }: FieldProps<HTMLInputElement>) => {
        return (
          <AutoCompleteField
            disabled={disabled || isSubmitting}
            {...field}
            {...autoCompleteProps}
          />
        );
      }}
    </Field>
  );
};
