import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

import FormInput from "./FormInput";
import useCorporationValidation from "../hooks/userCorporationValidation";

import * as yup from "yup";
import type { SubmitHandler } from "react-hook-form";

// --- Validation Schema ---
export const formSchema = yup.object({
  firstName: yup.string().required("First name is required").max(50, "Max 50 characters"),
  lastName: yup.string().required("Last name is required").max(50, "Max 50 characters"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+1\d{10}$/, "Must be a valid Canadian phone number starting with +1"),
  corporationNumber: yup
    .string()
    .required("Corporation number is required")
    .length(9, "Must be 9 characters"),
});

// --- Types ---
export type FormValues = yup.InferType<typeof formSchema>;

const OnboardingForm = () => {
  const {
    control,
    handleSubmit,
    
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    mode: "onBlur",
  });

  const  validateCorporationNumber  = useCorporationValidation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axios.post("https://fe-hometask-api.qa.vault.tryvault.com/profile-details", data);
      alert("Form submitted successfully!");
    } catch (error: any) {
      const message = error.response?.data?.message || "Submission failed.";
      alert(message);
    }
  };

  return (
    <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
            maxWidth: 600,
            mx: "auto",
            mt: 5,
            p: 3,
            borderRadius: 3,
            backgroundColor: "#fafafa",
            textAlign: "center",
            boxShadow: 1,
        }}
        >
        <Typography variant="h5" gutterBottom>
            Onboarding Form
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
                <FormInput
                name="firstName"
                label="First Name"
                control={control}
                errors={errors}
                fullWidth
                />
            </Box>
            <Box sx={{ flex: 1 }}>
                <FormInput
                name="lastName"
                label="Last Name"
                control={control}
                errors={errors}
                fullWidth
                />
            </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
            <FormInput
            name="phone"
            label="Phone Number"
            control={control}
            errors={errors}
            fullWidth
            />
        </Box>

        <Box sx={{ mb: 1 }}>
            <FormInput
            name="corporationNumber"
            label="Corporation Number"
            control={control}
            errors={errors}
            onBlur={() => validateCorporationNumber(watch("corporationNumber"))}
            fullWidth
            />
            {errors.corporationNumber && (
            <Typography variant="caption" color="error">
                {errors.corporationNumber.message || "Invalid Corporation Number"}
            </Typography>
            )}
        </Box>

        <Button
            type="submit"
            variant="contained"
            sx={{
            mt: 3,
            px: 4,
            py: 1.5,
            backgroundColor: "#000",
            color: "#fff",
            width:"100%",
            borderRadius: 2,
            textTransform: "none",
            '&:hover': {
                backgroundColor: "#333",
            },
            }}
            endIcon={<span style={{ fontSize: "1.2rem" }}>→</span>}
        >
            Submit
        </Button>
    </Box>
  );
};

export default OnboardingForm;
