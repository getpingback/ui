import * as React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import { RadioGroup, RadioItem } from "./radio-group";

describe("RadioGroup", () => {
  it("should render component properly", () => {
    const label = "Option 1";

    render(
      <RadioGroup>
        <RadioItem id="1" value="opt-1">
          {label}
        </RadioItem>
      </RadioGroup>
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("should render horizontal radios", () => {
    render(
      <RadioGroup defaultValue="opt-1" direction="horizontal">
        <RadioItem id="1" value="opt-1">
          Option 1
        </RadioItem>
      </RadioGroup>
    );

    const radioGroup = screen.getByRole("radiogroup");

    expect(radioGroup).toHaveClass(/flex-col/);
  });

  it("should render selected item", () => {
    render(
      <RadioGroup defaultValue="opt-1">
        <RadioItem id="1" value="opt-1">
          Option 1
        </RadioItem>
        <RadioItem id="2" value="opt-2">
          Option 2
        </RadioItem>
      </RadioGroup>
    );

    const radioItem1 = screen.getAllByRole("radio")[0];
    const radioItem2 = screen.getAllByRole("radio")[1];

    expect(radioItem1).toBeChecked();
    expect(radioItem2).not.toBeChecked();
  });

  it("should render disabled item", () => {
    render(
      <RadioGroup defaultValue="opt-1">
        <RadioItem id="1" value="opt-1" disabled>
          Option 1
        </RadioItem>
      </RadioGroup>
    );

    const radioItem = screen.getByRole("radio");

    expect(radioItem).toBeDisabled();
  });

  it("should change selected item", () => {
    const mockOnChange = jest.fn();

    render(
      <RadioGroup onValueChange={mockOnChange}>
        <RadioItem id="1" value="opt-1">
          Option 1
        </RadioItem>
        <RadioItem id="2" value="opt-2">
          Option 2
        </RadioItem>
      </RadioGroup>
    );

    const radioItem = screen.getAllByRole("radio")[0];

    fireEvent.click(radioItem);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(radioItem).toBeChecked();
  });
});
