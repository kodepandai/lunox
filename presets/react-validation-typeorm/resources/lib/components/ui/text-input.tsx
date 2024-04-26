import React from "react";
import { Input } from "./input";
import { InputWrapper } from "./input-wrapper";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  htmlFor?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, label, htmlFor, ...props }, ref) => {
    return (
      <InputWrapper label={label} {...props} error={error} htmlFor={htmlFor}>
        <Input ref={ref} {...props} />
      </InputWrapper>
    );
  },
);
TextInput.displayName = "TextInput";
export { TextInput };
