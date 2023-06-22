import * as yup from "yup";

export function parseYupValidationErrors(err: yup.ValidationError) {
  const validationErrors: Record<string, any> = {};

  err.inner.forEach((error: any) => {
    const { path, message } = error;
    const pathSegments = path.split(".");
    let currentObj: Record<string, any> = validationErrors;

    for (let i = 0; i < pathSegments.length; i++) {
      const pathSegment = pathSegments[i];
      if (i === pathSegments.length - 1) {
        currentObj[pathSegment] = message;
      } else {
        currentObj[pathSegment] = currentObj[pathSegment] || {};
        currentObj = currentObj[pathSegment];
      }
    }
  });

  return validationErrors;
}
