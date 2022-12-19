import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "../context/Context";

const renderWithContext = (component) => (
  render(
  <Provider>
    {component}
  </Provider>
  )
);

export default renderWithContext;