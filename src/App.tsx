import React from "react";
import "./App.css";
import FileUploadComponent from "./components/UploadFile";
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <h1>Lower Your Server Management Costs with ControlPlane</h1>
      <p>
        Discover how ControlPlane's automation solutions can reduce your server
        management costs. <br /> With our easy-to-use web page!,
        <br /> simply download our batch file, run it on your servers,
        <br /> and upload the generated JSON file to receive a detailed report
        and personalized price quote.
      </p>
      <FileUploadComponent></FileUploadComponent>
    </div>
  );
}

export default App;
