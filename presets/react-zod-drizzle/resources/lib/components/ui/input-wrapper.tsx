import React, { HTMLAttributes } from "react";
import { Label } from "./label";

export interface InputWrapperProps extends HTMLAttributes<HTMLDivElement> {
  labelPosition?: "first" | "end";
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const InputWrapper = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<InputWrapperProps>
>(
  (
    {
      htmlFor,
      labelPosition = "first",
      label,
      required = false,
      error,
      children,
      className,
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={className}>
        {labelPosition == "first" && label && (
          <Label htmlFor={htmlFor}>{label}</Label>
        )}
        {required && <i className="text-destructive">*</i>}
        {children}
        {labelPosition == "end" && label && (
          <Label htmlFor={htmlFor}>{label}</Label>
        )}
        {error && <span className="text-xs text-destructive">{error}</span>}
      </div>
    );
  },
);
InputWrapper.displayName = "InputWrapper";

export { InputWrapper };
