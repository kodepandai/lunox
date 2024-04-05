import { usePage } from "@lunoxjs/view-plugin-react";

const Input = ({
  name = "",
  defaultValue = undefined,
  value = "",
  onChange,
  type = "text",
  placeholder = "",
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { props } = usePage();
  return (
    <div className="mb-3 flex flex-col">
      <label htmlFor={name} className="text-sm text-gray-800">
        {name}
      </label>
      <input
        onChange={onChange}
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        className="border border-yellow-200 p-2 rounded focus:outline-yellow"
        placeholder={placeholder}
      />
      {props?.errors?.[name] && (
        <small className="text-red">{props.errors[name].message} </small>
      )}
    </div>
  );
};

export default Input;
