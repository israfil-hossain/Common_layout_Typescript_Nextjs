import Link from "next/link";
import { Button, ButtonProps } from "primereact/button";

type AnchorTarget = "_blank" | "_self" | "_parent" | "_top";

type LinkButtonProps = {
  href: string;
  target?: AnchorTarget;
} & ButtonProps;

export function LinkButton({ href, target, ...rest }: LinkButtonProps) {
  return (
    <Link href={href} target={target}>
      <Button {...rest} />
    </Link>
  );
}
