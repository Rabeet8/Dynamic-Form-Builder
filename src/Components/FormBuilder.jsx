import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import {
  TextFields,
  ArrowDropDownCircle,
  RadioButtonChecked,
  CheckBox,
  CalendarToday,
  Phone,
  Upload,
  Delete,
} from "@mui/icons-material";

// Import your custom components
import CustomTextField from "./CustomTextField";
import CustomDropdown from "./CustomDropdown";
import CustomRadioButton from "./CustomRadioButton";
import CustomCheckbox from "./CustomCheckbox";
import CustomDatePicker from "./CustomDatePicker";
import CountryPhoneInput from "./CountryPhoneInput";
import CustomFileUpload from "./CustomFileUpload";

const FormBuilderContainer = styled("div")({
  display: "flex",
  height: "calc(100vh - 64px)",
  backgroundColor: "#f5f5f5",
});

const Sidebar = styled(Paper)({
  width: "250px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
});

const Canvas = styled(Paper)({
  flex: 1,
  margin: "0 16px",
  padding: "24px",
  overflowY: "auto",
  width: "50%",
});

const FinalFormPreview = styled(Paper)({
  width: "50%",
  padding: "16px",
  overflowY: "auto",
});

const componentTypes = {
  textField: {
    type: "textField",
    icon: <TextFields />,
    label: "Text Field",
    component: CustomTextField,
    defaultProps: {
      label: "New Text Field",
      value: "",
    },
  },
  dropdown: {
    type: "dropdown",
    icon: <ArrowDropDownCircle />,
    label: "Dropdown",
    component: CustomDropdown,
    defaultProps: {
      label: "New Dropdown",
      value: "",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
    },
  },
  radioButton: {
    type: "radioButton",
    icon: <RadioButtonChecked />,
    label: "Radio Button",
    component: CustomRadioButton,
    defaultProps: {
      label: "New Radio Group",
      value: "",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
    },
  },
  checkbox: {
    type: "checkbox",
    icon: <CheckBox />,
    label: "Checkbox",
    component: CustomCheckbox,
    defaultProps: {
      label: "New Checkbox",
      checked: false,
    },
  },
  datePicker: {
    type: "datePicker",
    icon: <CalendarToday />,
    label: "Date Picker",
    component: CustomDatePicker,
    defaultProps: {
      label: "New Date Picker",
      value: null,
    },
  },
  phone: {
    type: "phone",
    icon: <Phone />,
    label: "Phone Input",
    component: CountryPhoneInput,
    defaultProps: {
      value: "",
    },
  },
  fileUpload: {
    type: "fileUpload",
    icon: <Upload />,
    label: "File Upload",
    component: CustomFileUpload,
    defaultProps: {
      label: "Upload File",
      value: "", // Initialize with empty string
    },
  },
};

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [finalFormData, setFinalFormData] = useState({});
  const [submittedData, setSubmittedData] = useState({});
  const [selectedField, setSelectedField] = useState(null);
  const [validationStatus, setValidationStatus] = useState({});
  const [visibilityConditions, setVisibilityConditions] = useState({});

  const generateId = () => `field_${Date.now()}`;

  // Add a new field with optional visibility condition
  const addField = (type, condition = null) => {
    const newField = {
      id: generateId(),
      ...componentTypes[type],
      condition, // Add the condition to control visibility
    };
    setFormFields([...formFields, newField]);
  };

  const removeField = (id) => {
    setFormFields(formFields.filter((field) => field.id !== id));
    if (selectedField?.id === id) {
      setSelectedField(null);
    }
  };

  const handleFinalFormChange = (id, value) => {
    setFinalFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Check conditions for showing or hiding fields
    updateFieldVisibility(id, value);
  };

  const updateFieldVisibility = (fieldId, value) => {
    setFormFields((prevFields) =>
      prevFields.map((field) => {
        if (field.condition && field.condition.fieldId === fieldId) {
          const shouldShow = field.condition.check(value);
          return { ...field, isVisible: shouldShow };
        }
        return field;
      })
    );
  };

  const handleValidationChange = (fieldId, isValid) => {
    setValidationStatus((prev) => ({
      ...prev,
      [fieldId]: isValid,
    }));
  };

  const formatFieldValue = (field, value) => {
    switch (field.type) {
      case "checkbox":
        return value ? "Yes" : "No";
      case "datePicker":
        return value ? formatDateString(value) : "";
      default:
        return value;
    }
  };

  const formatDateString = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleSubmit = () => {
    const isFormValid = Object.values(validationStatus).every(
      (status) => status !== false
    );

    if (!isFormValid) {
      setFormFields((fields) =>
        fields.map((field) => ({
          ...field,
          error: !validationStatus[field.id],
        }))
      );
      return;
    }

    const formValues = {};
    formFields.forEach((field) => {
      const userValue = finalFormData[field.id];
      if (userValue !== undefined && userValue !== "") {
        // For file uploads, we already have the file name stored
        formValues[field.label] = formatFieldValue(field, userValue);
      }
    });
    setSubmittedData(formValues);
  };

  return (
    <FormBuilderContainer>
      <Sidebar>
        <Typography variant="h6" gutterBottom>
          Components
        </Typography>
        <List>
          {Object.entries(componentTypes).map(([type, config]) => (
            <ListItem
              button
              key={type}
              onClick={() => addField(type)}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              <ListItemIcon>{config.icon}</ListItemIcon>
              <ListItemText primary={config.label} />
            </ListItem>
          ))}
        </List>
      </Sidebar>

      <Canvas>
        <Typography variant="h6" gutterBottom>
          Form Builder
        </Typography>
        {formFields.map((field) => (
          <Box
            key={field.id}
            onClick={() => setSelectedField(field)}
            className={`p-2 my-2 rounded-lg transition-all duration-200 ${
              selectedField?.id === field.id ? "bg-blue-50" : ""
            }`}
          >
            <Box className="flex items-center justify-between mb-2">
              <Typography variant="subtitle2">{field.label}</Typography>
              <IconButton
                size="small"
                onClick={() => removeField(field.id)}
                className="text-red-500 hover:bg-red-50"
              >
                <Delete />
              </IconButton>
            </Box>
            {React.createElement(field.component, {
              ...field.defaultProps,
              value: finalFormData[field.id] || field.defaultProps.value,
              onChange: (value) => handleFinalFormChange(field.id, value),
            })}
          </Box>
        ))}
        {formFields.length === 0 && (
          <Typography
            variant="body1"
            color="textSecondary"
            className="text-center py-8"
          >
            Click on components from the left panel to add them to your form
          </Typography>
        )}
      </Canvas>

      <FinalFormPreview>
        <Typography variant="h6" gutterBottom>
          Final Form Preview
        </Typography>
        {formFields.map((field) => (
          <Box key={field.id}>
            {React.createElement(field.component, {
              ...field.defaultProps,
              value: finalFormData[field.id] || field.defaultProps.value,
              onChange: (value) => handleFinalFormChange(field.id, value),
              error: !validationStatus[field.id],
              onValidationChange: (isValid) =>
                handleValidationChange(field.id, isValid),
            })}
          </Box>
        ))}
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit Form
        </Button>

        {Object.keys(submittedData).length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Submitted Data:
            </Typography>
            <Box>
              {Object.entries(submittedData).map(([label, value]) => (
                <Box key={label} className="mb-2">
                  <Typography variant="body2" color="textSecondary">
                    <strong>{label}:</strong> {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </FinalFormPreview>
    </FormBuilderContainer>
  );
};

export default FormBuilder;
