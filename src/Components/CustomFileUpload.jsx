import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadWrapper = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: "240px",
  maxWidth: "400px",
  width: "100%",
  "& .upload-button": {
    width: "100%",
    height: "56px",
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "16px",
    transition: "all 0.2s ease-in-out",
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.primary,
    border: `1px dashed ${theme.palette.grey[400]}`,
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
      borderColor: theme.palette.primary.main,
    },
  },
  "& .file-name": {
    marginTop: theme.spacing(1),
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

const CustomFileUpload = ({
  onChange,
  disabled,
  label = "Upload File",
  multiple = false,
  onValidationChange,
}) => {
  const [fileName, setFileName] = React.useState("");
  const [error, setError] = React.useState("");

  const validateFile = (file) => {
    const allowedTypes = ["image/png"];
    return allowedTypes.includes(file.type);
  };

  const handleChange = (event) => {
    const files = event.target.files;
    let isValid = true;

    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const invalidFiles = fileArray.filter((file) => !validateFile(file));

      if (invalidFiles.length > 0) {
        setError("Only PNG files are allowed");
        isValid = false;
      } else {
        setError("");
        const newFileName = multiple
          ? `${files.length} files selected`
          : files[0].name;
        setFileName(newFileName);
        
        onChange(newFileName);
      }
    }

    if (onValidationChange) {
      onValidationChange(isValid);
    }
  };

  return (
    <UploadWrapper>
      <Button
        variant="outlined"
        component="label"
        disabled={disabled}
        className="upload-button"
        startIcon={<CloudUploadIcon />}
      >
        {label}
        <input
          type="file"
          hidden
          onChange={handleChange}
          accept=".png,.jpg,.jpeg"
          multiple={multiple}
        />
      </Button>
      {fileName && <div className="file-name">{fileName}</div>}
      {error && <p error>{error}</p>}
    </UploadWrapper>
  );
};
export default CustomFileUpload;
