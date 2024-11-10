import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

const CheckboxWrapper = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  "& .MuiFormControlLabel-root": {
    marginLeft: -11,
    "&:hover": {
      "& .MuiCheckbox-root": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  "& .MuiCheckbox-root": {
    padding: 12,
    borderRadius: "6px",
    transition: "all 0.2s ease-in-out",
    "&.Mui-checked": {
      "& .MuiSvgIcon-root": {
        transform: "scale(1.1)",
      },
    },
  },
  "& .MuiTypography-root": {
    fontSize: "0.975rem",
    color: theme.palette.text.primary,
  },
}));

const CustomCheckbox = ({
  label,
  value,
  onChange,
  disabled,
  error,
  required,
  onValidationChange, // New prop for validation status
}) => {
  const isChecked =
    typeof value === "string" ? value === "true" : Boolean(value);

  // Validate on mount and value change
  React.useEffect(() => {
    if (required && onValidationChange) {
      const isValid = isChecked;
      onValidationChange(isValid);
    }
  }, [isChecked, required, onValidationChange]);

  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <CheckboxWrapper>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            color={error ? "error" : "primary"}
          />
        }
        label={
          <span>
            {label}
            {required && (
              <span style={{ color: error ? "#d32f2f" : "inherit" }}>*</span>
            )}
          </span>
        }
      />
      {error && required && !isChecked && <p>This field is required</p>}
    </CheckboxWrapper>
  );
};
export default CustomCheckbox;
