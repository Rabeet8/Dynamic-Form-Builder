// src/components/NestedField.js
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const NestedField = ({ value, onChange, onRemove }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        placeholder="Enter value"
        fullWidth
      />
      <Button onClick={onRemove} color="secondary">
        Remove
      </Button>
    </div>
  );
};

export default NestedField;
