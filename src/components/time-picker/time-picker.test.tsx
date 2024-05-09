import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    it("should display the placeholder text", () => {
      const { getByPlaceholderText } = render(<WithInputProps />);
      expect(getByPlaceholderText("00:00")).toBeInTheDocument();
    });

    it("should show the help text", () => {
      const { getByText } = render(<WithInputProps />);
      expect(getByText("Choose a time from the date above")).toBeInTheDocument();
    });
  });

  describe("TimePicker handleChange tests", () => {
    const setup = (initialProps = {}) => {
      const utils = render(<Default {...initialProps} />);
      const input = utils.getByTestId("time-picker") as HTMLInputElement;
      return {
        input,
        ...utils,
      };
    };
  
    it("ignores non-numeric and non-colon characters", () => {
      const { input } = setup();
      fireEvent.change(input, { target: { value: "12ab:34cd" } });
      expect(input.value).toBe("12:34");
    });
  
    it("adds colon after two numeric inputs if not present", () => {
      const { input } = setup();
      fireEvent.change(input, { target: { value: "12" } });
      expect(input.value).toBe("12:");
    });
  
    it("does not allow hour values greater than 23", () => {
      const { input } = setup();
      fireEvent.change(input, { target: { value: "25:00" } });
      expect(input.value).toBe("23:00");
    });
  
    it("does not allow minute values greater than 59", () => {
      const { input } = setup();
      fireEvent.change(input, { target: { value: "12:60" } });
      expect(input.value).toBe("12:59");
    });
  
    it("calls onChange with the correct value", () => {
      const onChangeMock = jest.fn();
      const { input } = setup({ onChange: onChangeMock });
      fireEvent.change(input, { target: { value: "23:59" } });
      fireEvent.blur(input);
      expect(onChangeMock).toHaveBeenCalledWith("23:59");
    });
  });
});
