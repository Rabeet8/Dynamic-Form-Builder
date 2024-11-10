import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const TextFieldWrapper = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: "240px",
  maxWidth: "400px",
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.grey[300],
      transition: "border-color 0.2s ease-in-out",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "14px 16px",
  },
}));

const CustomTextField = ({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  error,
  required,
  disabled,
}) => {
  const validateEmail = (input) => {
    if (required && !input) {
      return { isValid: false, error: "This field is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input && !emailRegex.test(input)) {
      return { isValid: false, error: "Invalid email format" };
    }

    return { isValid: true, error: "" };
  };

  const validation = validateEmail(value);

  return (
    <TextFieldWrapper>
      <TextField
        label={
          <span>
            {label}
            {required && (
              <span style={{ color: error ? "#d32f2f" : "inherit" }}>*</span>
            )}
          </span>
        }
        variant="outlined"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        helperText={error ? validation.error : helperText}
        error={error || !validation.isValid}
        required={required}
        disabled={disabled}
        type="email"
        fullWidth
      />
    </TextFieldWrapper>
  );
};

export default CustomTextField;
