type RequestNonObjectValueType =
  | string
  | number
  | boolean
  | File
  | Array<string | number | File>
  | null;

export type ValidationErrorMessageType = string;

type ValidationErrorType<R> = R extends RequestNonObjectValueType
  ? ValidationErrorMessageType
  : R extends Array<object>
  ? Array<ValidationErrorType<R[number]>>
  : {
      [k in keyof R]: ValidationErrorType<R[k]>;
    };

type ValidationErrorsType<R> = {
  [key in keyof R]: R[key] extends Required<R[key]>
    ? ValidationErrorType<R[key]>
    : ValidationErrorType<R[key]> | undefined;
};

export type InferErrorType<T> = {
  status?: number;
  message?: string;
  validationErrors?: ValidationErrorsType<T>;
};
