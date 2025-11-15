import React, { useState, cloneElement, isValidElement } from "react";

interface FieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  dataType?: "alpha" | "numeric" | "numeric-symbols";
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const Field: React.FC<FieldProps> = ({
  label,
  placeholder,
  dataType = "alpha",
  maxLength,
  value = "",
  onChange,
  name,
}) => {
  const filterValue = (input: string) => {
    switch (dataType) {
      case "alpha":
        return input.replace(/[^a-zA-Z ]/g, "");
      case "numeric":
        return input.replace(/[^0-9]/g, "");
      case "numeric-symbols":
        return input.replace(/[^0-9.,+-]/g, "");
      default:
        return input;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = filterValue(e.target.value);
    if (maxLength) val = val.slice(0, maxLength);
    onChange?.(val);
  };

  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium text-gray-700" htmlFor={name}>{label}</label>}
      <input
        id={name}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        name={name}
      />
    </div>
  );
};

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (values: Record<string, string>) => void;
}

interface FormComponent extends React.FC<FormProps> {
  Field: typeof Field;
}

const Form: FormComponent = ({ children, onSubmit }) => {
  const fieldElements = React.Children.toArray(children).filter(isValidElement) as React.ReactElement<FieldProps>[];
  const fieldNames = fieldElements.map(f => f.props.name);

  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fieldNames.forEach(n => { initial[n] = "" });
    return initial;
  });

  const handleFieldChange = (name: string, value: string) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-lg">
      {fieldElements.map(field =>
        cloneElement(field, {
          value: values[field.props.name],
          onChange: (val: string) => handleFieldChange(field.props.name, val),
        })
      )}
    </form>
  );
};

Form.Field = Field;
export default Form;