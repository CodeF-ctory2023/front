import { pqrsType } from '@/components/PqrsModule/utilities';
import { useState } from 'react';

const useForm = (initialValues: pqrsType) => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return {
    values,
    ...values,
    handleInputChange,
  };
};

export { useForm };
