import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Open main page", () => {
  render(<App />);
  const linkElement = screen.getByText(/TXT/i);
  expect(linkElement).toBeInTheDocument();
});
