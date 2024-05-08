import React from "react";
import { render } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./time-picker.stories";

const { Default, WithInputProps } = composeStories(stories);

describe("TimePicker", () => {
  describe("Default", () => {
    it("should render without any text", () => {
      const { getByTestId } = render(<Default />);
      const input = getByTestId("time-picker");

      expect(input).toBeInTheDocument();
      expect(input).toHaveValue("");
    });
  });

  describe("WithInputProps", () => {
    it("should render with the correct label", () => {
      const { getByText } = render(<WithInputProps />);
      expect(getByText("Time")).toBeInTheDocument();
    });

    it("should display the placeholder text when no date is selected", () => {
      const { getByPlaceholderText } = render(<WithInputProps />);
      expect(getByPlaceholderText("00:00")).toBeInTheDocument();
    });

    it("should show the help text", () => {
      const { getByText } = render(<WithInputProps />);
      expect(getByText("Choose a time from the date above")).toBeInTheDocument();
    });
  });
});
