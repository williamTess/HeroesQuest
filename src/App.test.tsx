import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { root } from ".";
import { shallow } from "enzyme";

test("Open main page", () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});

// test("index should render", () => {
//   const div = document.createElement("div");
//   div.id = "root";
//   document.body.appendChild(div);
//   expect(root.render).toHaveBeenCalledWith(<App />, div);
// });
