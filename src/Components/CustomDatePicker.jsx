import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from "@mui/material/styles";

const DatePickerWrapper = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: "240px",
  maxWidth: "400px",
  width: "100%",
  "& .react-datepicker-wrapper": {
    width: "100%",
  },
  "& .react-datepicker__input-container input": {
    width: "100%",
    height: "56px",
    padding: "0 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: `1px solid ${theme.palette.grey[300]}`,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
    "&:focus": {
      outline: "none",
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
  "& .react-datepicker": {
    borderRadius: "8px",
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.grey[200]}`,
    "& .react-datepicker__header": {
      backgroundColor: theme.palette.primary.light,
      borderBottom: "none",
    },
    "& .react-datepicker__day--selected": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .react-datepicker__day:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const CustomDatePicker = ({
  value,
  onChange,
  dateFormat = "MM/dd/yyyy HH:mm",
  placeholderText = "Select a date",
  minDate,
  maxDate,
  disabled,
  allowPastDates = false, // New prop to control past dates
  allowFutureDates = true, // New prop to control future dates
  onValidationChange, // New prop for validation status
}) => {
  const selectedDate = value ? new Date(value) : null;
  const today = new Date();

  const validateDate = (date) => {
    if (!date) return true;

    if (!allowPastDates && date < new Date().setHours(0, 0, 0, 0)) {
      return false;
    }

    if (!allowFutureDates && date > new Date().setHours(23, 59, 59, 999)) {
      return false;
    }

    return true;
  };

  const handleDateChange = (date) => {
    if (validateDate(date)) {
      onChange(date);
      if (onValidationChange) {
        onValidationChange(true);
      }
    } else {
      if (onValidationChange) {
        onValidationChange(false);
      }
    }
  };

  return (
    <DatePickerWrapper>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        minDate={!allowPastDates ? today : minDate}
        maxDate={!allowFutureDates ? today : maxDate}
        disabled={disabled}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
      />
    </DatePickerWrapper>
  );
};

export default CustomDatePicker;
