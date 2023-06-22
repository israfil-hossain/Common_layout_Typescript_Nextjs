import { useFormikContext } from "formik";
import { Button, ButtonProps } from "primereact/button";
import { CgSpinner } from "react-icons/cg";

export const FormikSubmitButton = ({
  type = "submit",
  disabled,
  loadingIcon = <CgSpinner className="icon-spin mr-1" />,
  ...rest
}: ButtonProps) => {
  const { isSubmitting } = useFormikContext();

  return (
    <Button
      type={type}
      disabled={disabled || isSubmitting}
      loading={isSubmitting}
      loadingIcon={loadingIcon}
      {...rest}
    />
  );
};
