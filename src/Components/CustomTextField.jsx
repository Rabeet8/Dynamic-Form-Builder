import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// Create a styled wrapper div to control the width and spacing
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
  type = "text",
}) => (
  <TextFieldWrapper>
    <TextField
      label={label}
      variant="outlined"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
      required={required}
      disabled={disabled}
      type={type}
      fullWidth
    />
  </TextFieldWrapper>
);

export default CustomTextField;
