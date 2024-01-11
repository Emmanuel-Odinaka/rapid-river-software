import { useField } from 'formik';
import React, { ChangeEvent } from 'react';

type TextAreaProps = React.JSX.IntrinsicElements['textarea'];

const TextArea: React.FC<TextAreaProps> = ({ className, ...rest }) => {
  const [field, meta] = useField(rest.name as string);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // We allow any custom value transformation before validation
    rest.onChange?.(event);
    field.onChange(event);
  };

  return (
    <div>
      {meta.touched && meta.error && (
        <p className="block mb-1 text-red-600">{meta.error}</p>
      )}

      <textarea
        className={`w-full border rounded-md p-2 h-32 focus:outline-none focus:ring focus:border-purple-300 ${className}`}
        {...field}
        {...rest}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextArea;
