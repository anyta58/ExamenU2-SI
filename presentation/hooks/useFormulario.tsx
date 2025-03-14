import { useState } from 'react';

interface FormValues {
  [key: string]: any;
}

interface UseFormularioProps {
  initialValues: FormValues;
  validate: (values: FormValues) => FormValues;
}

const useFormulario = ({ initialValues, validate }: UseFormularioProps) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormValues>({});
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: any) => {
    setValues((prevValues) => ({ ...prevValues, [field]: value }));
    const newErrors = validate({ ...values, [field]: value });
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = () => {
    if (isValid) {
      setIsLoading(true);
      setTimeout(() => {
        alert('Producto registrado exitosamente');
        setValues(initialValues);
        setErrors({});
        setIsValid(false);
        setIsLoading(false);
      }, 2000);
    }
  };

  return { values, errors, handleChange, handleSubmit, isValid, isLoading };
};

export default useFormulario;