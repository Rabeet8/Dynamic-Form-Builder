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
  value, // Changed from checked to value to match parent component
  onChange,
  disabled,
  error,
  required,
}) => {
  // Convert value to boolean if it's a string
  const isChecked =
    typeof value === "string" ? value === "true" : Boolean(value);

  const handleChange = (event) => {
    // Pass the boolean value directly
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
            className="shadow-sm hover:shadow-md transition-shadow duration-200"
          />
        }
        label={label}
      />
    </CheckboxWrapper>
  );
};

export default CustomCheckbox;
