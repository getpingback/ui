import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./date-picker.stories";

const { Default, WithInputProps } = composeStories(stories);

describe("DatePicker", () => {
  describe("Default", () => {
    it("should render without any text", () => {
      const { getByTestId } = render(<Default />);
      const button = getByTestId("date-picker-button-popover-trigger");

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Pick a date");
    });

    it("should open the calendar popover when the button is clicked", () => {
      const { getByTestId } = render(<Default />);
      const button = getByTestId("date-picker-button-popover-trigger");
      fireEvent.click(button);
      expect(getByTestId("date-picker-popover-content")).toBeInTheDocument();
    });
  });

  describe("WithInputProps", () => {
    it("should render with the correct label", () => {
      const { getByText } = render(<WithInputProps />);
      expect(getByText("Date")).toBeInTheDocument();
    });

    it("should display the placeholder text when no date is selected", () => {
      const { getByText } = render(<WithInputProps />);
      expect(getByText("Select a date")).toBeInTheDocument();
    });

    it("should show the help text", () => {
      const { getByText } = render(<WithInputProps />);
      expect(getByText("Choose a date from the calendar")).toBeInTheDocument();
    });
  });
});
