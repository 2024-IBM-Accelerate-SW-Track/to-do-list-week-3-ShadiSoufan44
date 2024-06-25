import { render, screen, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import App from "./App";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("test that App component doesn't render dupicate Task", () => {
  render(<App />);

  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });
  const dueDate = "03/13/2023";

  //first item
  fireEvent.change(inputTask, { target: { value: "dupeCheck" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);

  //its duplicate
  fireEvent.change(inputTask, { target: { value: "dupeCheck" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);

  //check length to see if there is only one "dupeCheck"
  const check = screen.getAllByText(/dupeCheck/i);
  expect(check.length).toBe(1);
});

test("test that App component doesn't add a task without task name", () => {
  render(<App />);

  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });

  const dueDate = "03/13/2023";

  //add componenet without task name
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);

  //check that its not on the screen
  const check = screen.queryByText(/03\/13\/2023/i);
  expect(check).not.toBeInTheDocument();
});

test("test that App component doesn't add a task without due date", () => {
  render(<App />);

  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const element = screen.getByRole("button", { name: /Add/i });

  //add component without due date
  fireEvent.change(inputTask, { target: { value: "test1" } });

  fireEvent.click(element);

  //check that its not on the screen
  const check = screen.queryByText(/test1/i);
  expect(check).not.toBeInTheDocument();
});

test("test that App component can be deleted thru checkbox", () => {
  render(<App />);

  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });
  const dueDate = "03/13/2023";

  //create component
  fireEvent.change(inputTask, { target: { value: "test1" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);

  //click on checkbox
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  //make sure checkbox was deleted
  const check = screen.queryByText(/test1/i);
  expect(check).not.toBeInTheDocument();
});

test("test that App component renders different colors for past due events", () => {
  render(<App />);

  const inputTask = screen.getByRole("textbox", { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole("button", { name: /Add/i });

  //create date in the past
  const dueDate = "05/30/2023";

  //add component
  fireEvent.change(inputTask, { target: { value: "test1" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);

  const taskCard = screen.getByTestId(/test1/i);
  const backgroundColor = taskCard.style.backgroundColor;
  expect(backgroundColor).toBe("rgb(139, 0, 0)");
});
