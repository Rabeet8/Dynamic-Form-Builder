// src/components/Section.js
import React, { useState } from "react";
import NestedField from "./NestedField";
import Button from "@mui/material/Button";

const Section = ({ title, onSectionChange }) => {
  const [fields, setFields] = useState([{ id: 1, value: "" }]);

  const addField = () => {
    setFields([...fields, { id: fields.length + 1, value: "" }]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleFieldChange = (id, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setFields(updatedFields);
    onSectionChange(title, updatedFields); // pass updated fields to parent
  };

  return (
    <div>
      <h3>{title}</h3>
      {fields.map((field) => (
        <NestedField
          key={field.id}
          value={field.value}
          onChange={(value) => handleFieldChange(field.id, value)}
          onRemove={() => removeField(field.id)}
        />
      ))}
      <Button onClick={addField}>Add Field</Button>
    </div>
  );
};

export default Section;
