import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

class AddTodo extends Component {
  // Create a local react state of the this component with both content date property set to nothing.

  constructor() {
    super();
    this.state = {
      content: "",
      date: "",
      due: null,
    };
  }

  // The handleChange function updates the react state with the new input value provided from the user and the current date/time.
  // "event" is the defined action a user takes. In this case, the event is triggered when the user types something
  // into the text field.

  handleChange = (event) => {
    this.setState({
      content: event.target.value,
      date: new Date().toLocaleString("en-US"),
    });
  };

  handleDateChange = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    this.setState({
      due: formattedDate,
    });
  };

  // The handleSubmit function collects the forms input and puts it into the react state.
  // event.preventDefault() is called to prevents default event behavior like refreshing the browser.
  // this.props.addTodo(this.state) passes the current state (or user input and current date/time) into the addTodo function defined
  // in the Home.js file which then adds the input into the list.

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.content.trim() &&
      this.state.due &&
      this.state.due !== "Invalid Date"
    ) {
      this.props.addTodo({
        content: this.state.content,
        date: this.state.date,
        due: this.state.due,
      });
      this.setState({
        content: "",
        date: "",
        due: null,
      });
    }
  };

  render() {
    return (
      // 1. When rendering a component, you can render as many elements as you like as long as it is wrapped inside
      // one div element.
      // 2. The return statement should include a text field input with the handleChange function from above that
      // is passed into an onChange event.
      // 3. The return should also include a button with the handleSubmit function from above that is passed into
      // an OnClick event.
      // 4. The value of the text field also should reflect the local state of this component.
      <div>
        <TextField
          label="Add New Item"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.content}
          inputProps={{ "data-testid": "new-item-input" }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            id="new-item-date"
            label="Due Date"
            value={this.state.due}
            onChange={this.handleDateChange}
            renderInput={(params) => (
              <TextField {...params} placeholder="mm/dd/yyyy" />
            )}
          />
        </LocalizationProvider>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
          data-testid="new-item-button"
        >
          Add
        </Button>
      </div>
    );
  }
}

export default AddTodo;
