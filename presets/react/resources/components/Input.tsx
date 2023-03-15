import { errors } from "lunox/client";

const Input = ({
  name = "",
  defaultValue = undefined,
  type = "text",
  placeholder = "",
}) => {
  return (
    <div className="mb-3 flex flex-col">
      <label htmlFor={name} className="text-sm text-gray-800">
        {name}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="border border-yellow-200 p-2 rounded focus:outline-yellow"
        placeholder={placeholder}
      />
      {errors(name) && (
        <small className="text-red">{errors(name).message} </small>
      )}
    </div>
  );
};

export default Input;
