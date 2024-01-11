import { useField } from 'formik';
import React, { ChangeEvent } from 'react';

type InputFieldProps = React.JSX.IntrinsicElements['input'];

const InputField: React.FC<InputFieldProps> = ({ className, ...rest }) => {
  const [field, meta] = useField(rest.name as string);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // We allow any custom value transformation before validation
    rest.onChange?.(event);
    field.onChange(event);
  };

  return (
    <div>
      {meta.touched && meta.error && (
        <p className="block mb-1 text-red-600">{meta.error}</p>
      )}
      <input
        className={`border rounded-md p-2 focus:outline-none focus:ring focus:border-purple-300 ${className}`}
        {...field}
        {...rest}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
