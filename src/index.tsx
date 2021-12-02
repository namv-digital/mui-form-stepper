import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ProjectCreateForm } from "./form";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ProjectCreateForm />
  </StrictMode>,
  rootElement
);
