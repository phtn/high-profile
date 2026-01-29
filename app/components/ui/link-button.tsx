"use client";

import Link from "next/link";
import { Button } from "./button";
import type { ButtonVariant } from "./button";

export interface LinkButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Button>, "render" | "nativeButton"> {
  href: string;
  variant?: ButtonVariant;
}

export function LinkButton({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Button
      variant={variant}
      className={className}
      render={(buttonProps) => <Link {...buttonProps} href={href} />}
      nativeButton={false}
      {...props}
    >
      {children}
    </Button>
  );
}
