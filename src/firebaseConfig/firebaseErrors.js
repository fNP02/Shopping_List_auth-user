import React from "react";
import { useState } from "react";

export const firebaseErrors = (err) => {
  const [error, setError] = useState("");
  switch (err) {
    case "auth/email-already-exists":
      return "Another user is already using the email provided. Each user must have a unique email.";
      break;
    case "auth/internal-error":
      return "The authentication server encountered an unexpected error when trying to process the request.";
      break;
    case "auth/invalid-email":
      return "The email entered is not valid";
      break;
    case "auth/invalid-login-credentials":
      return "The credentials entered are invalid.";
      break;
    case "auth/invalid-email":
      return "The email entered is invalid.";
      break;
    default:
      return err
      break;
  }

  return error;
};
