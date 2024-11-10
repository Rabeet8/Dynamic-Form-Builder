import React from "react";
import FormBuilder from "./Components/FormBuilder";

const App = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
          margin: 0,
        }}
      >
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            margin: "20px 0",
            textAlign: "center",
          }}
        >
          Dynamic Form Builder - Task (Plutus21)
        </h1>
      </div>
      <FormBuilder />
    </div>
  );
};

export default App;
