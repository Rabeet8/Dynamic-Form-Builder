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
  accept,
  disabled,
  label = "Upload File",
  multiple = false,
}) => {
  const [fileName, setFileName] = React.useState("");

  const handleChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileName(multiple ? `${files.length} files selected` : files[0].name);
    }
    onChange(event);
  };

  return (
    <UploadWrapper>
      <Button
        variant="outlined"
        component="label"
        disabled={disabled}
        className="upload-button shadow-sm hover:shadow-md transition-shadow duration-200"
        startIcon={<CloudUploadIcon />}
      >
        {label}
        <input
          type="file"
          hidden
          onChange={handleChange}
          accept={accept}
          multiple={multiple}
        />
      </Button>
      {fileName && <div className="file-name">{fileName}</div>}
    </UploadWrapper>
  );
};

export default CustomFileUpload;
