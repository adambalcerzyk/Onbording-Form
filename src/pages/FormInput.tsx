import { TextField, Typography, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  control: Control<any>;
  errors: FieldErrors;
  onBlur?: () => void;
  fullWidth?: boolean; // <-- Add this line
};

const FormInput = ({ name, label, control, errors, onBlur, fullWidth }: Props) => {
  return (
    <Box mb={2}>
      <Typography
        variant="body2"
        sx={{ fontWeight: 500, textAlign: "left", mb: 0.5 }}
      >
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            fullWidth={fullWidth} // <-- Use it here
            onBlur={(e) => {
              field.onBlur();
              if (onBlur) onBlur();
            }}
            error={!!errors[name]}
            helperText={errors[name]?.message?.toString()}
          />
        )}
      />
    </Box>
  );
};

export default FormInput;
