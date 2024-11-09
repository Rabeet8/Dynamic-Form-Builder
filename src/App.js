// import React, { useState } from "react";
// import CustomTextField from "./Components/CustomTextField";
// import CustomDropdown from "./Components/CustomDropdown";
// import CustomRadioButton from "./Components/CustomRadioButton";
// import CustomFileUpload from "./Components/CustomFileUpload";
// import CustomCheckbox from "./Components/CustomCheckbox";
// import CountryPhoneInput from "./Components/CountryPhoneInput";
// import CustomDatePicker from "./Components/CustomDatePicker";
// import "./App.css";

// function App() {
//   // State for each component
//   const [text, setText] = useState("");
//   const [dropdownValue, setDropdownValue] = useState("");
//   const [radioValue, setRadioValue] = useState("");
//   const [file, setFile] = useState(null);
//   const [checked, setChecked] = React.useState(false);
//   const [phone, setPhone] = useState("");
//   const [date, setDate] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleRadioChange = (event) => {
//     setRadioValue(event.target.value);
//   };

//   // Dropdown and radio options
//   const dropdownOptions = [
//     { label: "Option 1", value: "option1" },
//     { label: "Option 2", value: "option2" },
//   ];

//   const radioOptions = [
//     { label: "Option A", value: "A" },
//     { label: "Option B", value: "B" },
//   ];

//   return (
//     <div className="App">
//       <h1>Dynamic Form Builder</h1>

//       {/* Text Field */}
//       <CustomTextField
//         label="Username"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Enter your username"
//         helperText="Username must be at least 3 characters"
//         required
//       />

//       {/* Dropdown */}
//       <CustomDropdown
//         label="Select an option"
//         value={dropdownValue}
//         onChange={(e) => setDropdownValue(e.target.value)}
//         options={dropdownOptions}
//         helperText="Please select an option"
//         required
//       />

//       {/* Radio Button */}
//       <CustomRadioButton
//         value={setRadioValue}
//         onChange={handleRadioChange}
//         options={radioOptions}
//         helperText="Please select one option"
//         required
//         name="radio-buttons-group"
//         // row={true} // Uncomment to display options in a row
//         // error={true} // Uncomment to show error state
//         // disabled={true} // Uncomment to disable the radio group
//       />

//       {/* File Upload */}
//       <CustomFileUpload
//         onChange={handleFileChange}
//         accept="image/*"
//         label="Upload Image"
//         multiple={false}
//       />
//       {/* {file && <p>Selected file: {file.name}</p>} */}

//       {/* Checkbox */}
//       <CustomCheckbox
//         label="Accept terms and conditions"
//         checked={checked}
//         onChange={(e) => setChecked(e.target.checked)}
//         required
//       />

//       {/* Country Phone Input */}
//       <CountryPhoneInput
//         value={phone}
//         onChange={(value) => setPhone(value)}
//         country="us"
//       />

//       {/* Date Picker */}
//       <CustomDatePicker
//         selectedDate={date}
//         onChange={(date) => setDate(date)}
//         dateFormat="MM/dd/yyyy"
//         placeholderText="Select your date"
//         minDate={new Date("1900-01-01")}
//         maxDate={new Date()}
//       />

//       {/* Display entered data */}
//       <div style={{ marginTop: "20px" }}>
//         <h2>Entered Data</h2>
//         <p>
//           <strong>Text Field:</strong> {text}
//         </p>
//         <p>
//           <strong>Dropdown:</strong> {dropdownValue}
//         </p>
//         <p>
//           <strong>Radio Button:</strong> {radioValue}
//         </p>
//         <p>
//           <strong>Checkbox:</strong> {checked ? "Checked" : "Unchecked"}
//         </p>
//         <p>
//           <strong>Phone:</strong> {phone}
//         </p>
//         <p>
//           <strong>Date:</strong> {date ? date.toString() : "No date selected"}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import FormBuilder from "./Components/FormBuilder";

const App = () => {
  return (
    <div>
      <FormBuilder />
    </div>
  );
};

export default App;
