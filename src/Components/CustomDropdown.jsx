import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

const StyledDropdownWrapper = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: "240px",
  maxWidth: "400px",
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "& fieldset": {
      borderColor: theme.palette.grey[300],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiMenuItem-root": {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
}));

const CustomDropdown = ({
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  required,
  disabled,
  onValidationChange, // New prop for validation status
}) => {
  React.useEffect(() => {
    if (required && onValidationChange) {
      const isValid = value !== undefined && value !== "";
      onValidationChange(isValid);
    }
  }, [value, required, onValidationChange]);

  return (
    <StyledDropdownWrapper>
      <TextField
        select
        label={
          <span>
            {label}
            {required && (
              <span style={{ color: error ? "#d32f2f" : "inherit" }}>*</span>
            )}
          </span>
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        fullWidth
        error={error}
        helperText={
          error && required && !value ? "This field is required" : helperText
        }
        required={required}
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </StyledDropdownWrapper>
  );
};

export default CustomDropdown;
