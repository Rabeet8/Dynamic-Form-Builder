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
  value, // Changed from selectedDate to value to match parent component
  onChange,
  dateFormat = "MM/dd/yyyy HH:mm", // Added time format
  placeholderText = "Select a date",
  minDate,
  maxDate,
  disabled,
}) => {
  // Convert string date back to Date object if it exists
  const selectedDate = value ? new Date(value) : null;

  const handleDateChange = (date) => {
    // Ensure we're passing the date object to parent
    onChange(date);
  };

  return (
    <DatePickerWrapper>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        className="shadow-sm hover:shadow-md transition-shadow duration-200"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
      />
    </DatePickerWrapper>
  );
};

export default CustomDatePicker;
