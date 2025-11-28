import React, { useState, cloneElement, isValidElement } from "react";

interface DropdownProps {
  name: string;
  label?: string;
  options: any[];
  value?: string;
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ name, label, options, value, onChange }) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium text-gray-700">{label}</label>}
      <select 
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className=" bg-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

interface FieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  dataType?: "alphabetic" | "alpha-numeric" | "numeric" | "numeric-symbols" | "all";
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const Field: React.FC<FieldProps> = ({
  label,
  placeholder,
  dataType = 'alphabetic',
  maxLength,
  value = "",
  onChange,
  name,
}) => {
  const filterValue = (input: string) => {
    switch (dataType) {
      case "alpha-numeric":
        return input.replace(/[^a-zA-Z0-9.,+-/@!#$%&*:_?]/g, "");
      case "alphabetic":
        return input.replace(/[^a-zA-Z ]/g, "");
      case "numeric":
        return input.replace(/[^0-9]/g, "");
      case "numeric-symbols":
        return input.replace(/[^0-9.,+-/@!#$%&*:_?]/g, "");
      case "all" :
        return input;
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
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
  Dropdown: typeof Dropdown;
}

const Form: FormComponent = ({ children, onSubmit }) => {
  const childArray = React.Children.toArray(children).filter(isValidElement);
  
  // Pega todos os elementos que têm a prop 'name' (Field e Dropdown)
  const fieldElements = childArray.filter(
    (child) => {
      const props = child.props as any;
      return props && typeof props === 'object' && 'name' in props;
    }
  );
  
  const fieldNames = fieldElements.map(f => (f.props as any).name as string);

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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full">
      {React.Children.map(children, child => {
        if (!isValidElement(child)) return child;
        
        const props = child.props as any;
        // Se o elemento tem prop 'name', injeta value e onChange
        if (props && typeof props === 'object' && 'name' in props) {
          const name = props.name as string;
          return cloneElement(child as React.ReactElement<any>, {
            value: values[name] || '',
            onChange: (val: string) => handleFieldChange(name, val),
          });
        }
        
        return child;
      })}
    </form>
  );
};
Form.Dropdown = Dropdown;
Form.Field = Field;
export default Form;