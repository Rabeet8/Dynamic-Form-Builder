# Dynamic Form Builder

## Description
A powerful and flexible React-based form builder that allows users to create complex, dynamic forms with nested sections, and custom validation. Built with Material-UI and modern React practices.

## Video Demonstration

https://github.com/user-attachments/assets/5c9a57cb-577f-4da8-8245-ec8329528f7c


## Features

### Core Components
* **Text Fields** - Standard text input using Material-UI components
* **Dropdowns** - Custom select fields with configurable options
* **Radio Buttons** - Single-selection option groups
* **Checkboxes** - Boolean selection fields
* **Date Pickers** - Calendar-based date selection
* **Phone Input** - International phone number input with country codes
* **File Upload** - File attachment capabilities
* **Sections** - Group related fields together

### Key Features
* **Nested Forms** - Create complex form structures with unlimited nesting
* **Real-time Validation** - Validate form fields as users type
* **Field Organization** - Intuitive interface for form layout

## Tech Stack
* React.js
* Material-UI (MUI)
* JavaScript (ES6+)
* CSS-in-JS (Styled Components)

## Installation

```bash
# Clone the repository
git clone(https://github.com/Rabeet8/Dynamic-Form-Builder.git)

# Navigate to project directory
cd form-builder

# Install dependencies
npm install

# Start development server
npm start
```

## Usage

### Basic Form Creation
1. Launch the application
2. Use the left sidebar to drag form components onto the canvas
3. Configure field properties in the right panel
4. Preview the form in real-time
5. Test form submission and validation

### Creating Nested Forms
1. Add a Section component to your form
2. Use the section's menu to add fields or sub-sections
3. Preview the nested structure in the form preview

## Project Structure

```
src/
├── components/
│   ├── CustomComponents/
│   │   ├── CustomDropdown.jsx
│   │   ├── CustomRadioButton.jsx
│   │   ├── CustomCheckbox.jsx
│   │   ├── CustomDatePicker.jsx
│   │   ├── CountryPhoneInput.jsx
│   │   └── CustomFileUpload.jsx
│   │   └── CustomTextField.jsx
│   │   └── FormBuilder.jsx
│   │   └── NestedField.jsx
│   │   └── Section.jsx
└── App.js
```
## Author
[Syed Rabeet](https://github.com/Rabeet8)
