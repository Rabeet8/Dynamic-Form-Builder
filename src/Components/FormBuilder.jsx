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
  Menu,
  MenuItem,
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
  ViewStream,
  Add,
} from "@mui/icons-material";

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

const SectionWrapper = styled(Box)(({ depth = 0 }) => ({
  border: "1px solid #e0e0e0",
  borderRadius: "4px",
  padding: "16px",
  marginBottom: "16px",
  backgroundColor: depth % 2 === 0 ? "#fafafa" : "#ffffff",
  marginLeft: `${depth * 16}px`,
}));

const componentTypes = {
  section: {
    type: "section",
    icon: <ViewStream />,
    label: "Section",
    defaultProps: {
      fields: [],
    },
  },
  textField: {
    type: "textField",
    icon: <TextFields />,
    label: "Text Field",
    component: CustomTextField,
    defaultProps: {
      value: "",
    },
  },
  dropdown: {
    type: "dropdown",
    icon: <ArrowDropDownCircle />,
    label: "Dropdown",
    component: CustomDropdown,
    defaultProps: {
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
      checked: false,
    },
  },
  datePicker: {
    type: "datePicker",
    icon: <CalendarToday />,
    label: "Date Picker",
    component: CustomDatePicker,
    defaultProps: {
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
      value: "",
    },
  },
};

const SectionActions = ({ onAddField, onAddSection, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    handleClose();
    action();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Add />
      </IconButton>
      <IconButton onClick={onDelete} className="text-red-500 hover:bg-red-50">
        <Delete />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleAction(onAddField)}>Add Field</MenuItem>
        <MenuItem onClick={() => handleAction(onAddSection)}>
          Add Sub-section
        </MenuItem>
      </Menu>
    </>
  );
};

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [finalFormData, setFinalFormData] = useState({});
  const [submittedData, setSubmittedData] = useState({});
  const [selectedField, setSelectedField] = useState(null);
  const [validationStatus, setValidationStatus] = useState({});

  const generateId = () =>
    `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const findAndUpdateField = (fields, targetId, updater) => {
    return fields.map((field) => {
      if (field.id === targetId) {
        return updater(field);
      }
      if (field.type === "section" && field.fields) {
        return {
          ...field,
          fields: findAndUpdateField(field.fields, targetId, updater),
        };
      }
      return field;
    });
  };

  const findAndRemoveField = (fields, targetId) => {
    return fields.reduce((acc, field) => {
      if (field.id === targetId) {
        return acc;
      }
      if (field.type === "section" && field.fields) {
        return [
          ...acc,
          {
            ...field,
            fields: findAndRemoveField(field.fields, targetId),
          },
        ];
      }
      return [...acc, field];
    }, []);
  };

  const addField = (type, parentId = null) => {
    const newField = {
      id: generateId(),
      ...componentTypes[type],
      parentId,
    };

    if (type === "section") {
      newField.fields = [];
    }

    if (!parentId) {
      setFormFields((prev) => [...prev, newField]);
      return;
    }

    setFormFields((prev) =>
      findAndUpdateField(prev, parentId, (field) => ({
        ...field,
        fields: [...(field.fields || []), newField],
      }))
    );
  };

  const removeField = (id) => {
    setFormFields((prev) => findAndRemoveField(prev, id));
    if (selectedField?.id === id) {
      setSelectedField(null);
    }
  };

  const handleFinalFormChange = (id, value) => {
    setFinalFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const renderField = (field, depth = 0) => {
    if (field.type === "section") {
      return (
        <SectionWrapper key={field.id} depth={depth}>
          <Box className="flex items-center justify-between mb-4">
            <Typography variant="h6">{field.label}</Typography>
            <Box>
              <SectionActions
                onAddField={() => addField("textField", field.id)}
                onAddSection={() => addField("section", field.id)}
                onDelete={() => removeField(field.id)}
              />
            </Box>
          </Box>
          <Box className="ml-4">
            {field.fields?.map((nestedField) =>
              renderField(nestedField, depth + 1)
            )}
          </Box>
        </SectionWrapper>
      );
    }

    return (
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
        {field.component &&
          React.createElement(field.component, {
            ...field.defaultProps,
            value: finalFormData[field.id] || field.defaultProps.value,
            onChange: (value) => handleFinalFormChange(field.id, value),
            error: !validationStatus[field.id],
            onValidationChange: (isValid) =>
              handleValidationChange(field.id, isValid),
          })}
      </Box>
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

  const collectFormValues = (fields, prefix = "") => {
    return fields.reduce((acc, field) => {
      if (field.type === "section") {
        const sectionValues = collectFormValues(
          field.fields || [],
          `${prefix}${field.label} / `
        );
        return { ...acc, ...sectionValues };
      }

      const value = finalFormData[field.id];
      if (value !== undefined && value !== "") {
        return {
          ...acc,
          [`${prefix}${field.label}`]: formatFieldValue(field, value),
        };
      }
      return acc;
    }, {});
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

    const formValues = collectFormValues(formFields);
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
        {formFields.map((field) => renderField(field))}
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
        {formFields.map((field) => renderField(field))}
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
          style={{ width: "200px" }}
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
