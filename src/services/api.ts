import type { FormValues } from "../types";

export const postProfileDetails = (data: FormValues) => {
  return fetch("https://fe-hometask-api.qa.vault.tryvault.com/profile-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
