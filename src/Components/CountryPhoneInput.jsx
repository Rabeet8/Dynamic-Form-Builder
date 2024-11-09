import React from "react";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import { styled } from "@mui/material/styles";

const PhoneInputWrapper = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: "240px",
  maxWidth: "400px",
  width: "100%",
  "& .form-control": {
    width: "100%",
    height: "56px",
    borderRadius: "8px",
    border: `1px solid ${theme.palette.grey[300]}`,
    transition: "all 0.2s ease-in-out",
    fontSize: "16px",
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
    "&:focus": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
  "& .country-list": {
    borderRadius: "8px",
    boxShadow: theme.shadows[3],
    "& .country": {
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
      "&.highlight": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
}));

const CountryPhoneInput = ({
  value,
  onChange,
  disabled,
  error,
  country = "us",
}) => (
  <PhoneInputWrapper>
    <PhoneInput
      country={country}
      value={value}
      onChange={onChange}
      disabled={disabled}
      isValid={!error}
      containerClass="shadow-sm hover:shadow-md transition-shadow duration-200"
      buttonStyle={{
        borderRadius: "8px 0 0 8px",
      }}
    />
  </PhoneInputWrapper>
);

export default CountryPhoneInput;
