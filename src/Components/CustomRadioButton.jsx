import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";

const RadioWrapper = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: "240px",
  maxWidth: "400px",
  width: "100%",
  padding: theme.spacing(2),
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  "& .MuiFormLabel-root": {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    fontSize: "1rem",
    fontWeight: 500,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
    "&.Mui-error": {
      color: theme.palette.error.main,
    },
  },
  "& .MuiRadio-root": {
    padding: 12,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-checked": {
      "& .MuiSvgIcon-root": {
        transform: "scale(1.1)",
        transition: "transform 0.2s ease-in-out",
      },
    },
  },
  "& .MuiFormControlLabel-root": {
    marginLeft: -11,
    marginRight: theme.spacing(2),
    "& .MuiTypography-root": {
      fontSize: "0.975rem",
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    marginTop: theme.spacing(1),
  },
}));

const CustomRadioButton = ({
  label,
  value,
  onChange,
  options,
  error,
  required,
  disabled,
  helperText,
  row = false,
  name,
}) => (
  <RadioWrapper className="shadow-sm hover:shadow-md transition-shadow duration-200">
    <FormControl
      component="fieldset"
      error={error}
      required={required}
      disabled={disabled}
      fullWidth
    >
      <FormLabel component="legend">{label}</FormLabel>

      <RadioGroup
        aria-label={label}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        row={row}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio color="primary" size="medium" />}
            label={option.label}
            className="hover:bg-gray-50 rounded-md transition-colors duration-200"
          />
        ))}
      </RadioGroup>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  </RadioWrapper>
);

export default CustomRadioButton;
