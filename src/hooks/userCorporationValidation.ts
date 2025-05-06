import { useCallback } from 'react';
import type { UseFormSetError } from "react-hook-form";
import type { FormValues } from "../pages/OnboardingForm";
const useCorporationValidation = (setError: UseFormSetError<FormValues>) => {
  const validateCorporationNumber = useCallback(async (corpNum: string): Promise<{ valid: boolean; message?: string }> => {
    try {
      const response = await fetch(`https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${corpNum}`);
      const data = await response.json();

      if (!data.valid) {
        return { valid: false, message: data.message || 'Invalid corporation number' };
      }

      return { valid: true };
    } catch (error) {
      return { valid: false, message: 'Error validating corporation number' };
    }
  }, []);

  return validateCorporationNumber;
};

export default useCorporationValidation;
