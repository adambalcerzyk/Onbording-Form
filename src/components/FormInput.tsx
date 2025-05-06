import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";


interface FormInputProps {
  name: string;
  label: string;
  control: Control<any>;
  errors: FieldErrors;
  type?: string;
  onBlur?: () => void;
}

const FormInput = ({ name, label, control, errors, type = "text", onBlur }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          variant="outlined"
          fullWidth
          onBlur={() => {
            field.onBlur();
            onBlur?.();
          }}
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
          margin="normal"
        />
      )}
    />
  );
};

export default FormInput;
