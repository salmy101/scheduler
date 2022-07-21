import React from "react";
import { getByText, queryByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText} from "@testing-library/react";


import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async() => {
    const { getByText } = render(<Application/>)
    //wait for an element to appear after an asynchronous operation
    //waitForElement returns a promise which we returned from the test function
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  
  })
  
  
  // it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  //   const { getByText, getByPlaceholderText, queryByAltText, } = render(<Application/>)
  
  //   await waitForElement(() => getByText( "Archie Cohen"));
  //     fireEvent.click(queryByAltText("Add"));
  //     fireEvent.change(getByPlaceholderText("Enter Student Name"), {
  //       target: { value: "Lydia Miller-Jones" }
  //     });
  //     fireEvent.click(queryByAltText("Sylvia Palmer"));
  //     fireEvent.click(getByText("SAVE"))
  //     expect(getByText(/Saving/i)).toBeInTheDocument();
  //     expect(getByText(/Lydia Miller-Jones/i)).toBeInTheDocument();
  //     waitForElement(() => getByText( "Lydia Miller-Jones").toBeInTheDocument());
  // })

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment")[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "SAVING...")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    debug(); 
    console.log(prettyDOM(day));
  });
 

  
})