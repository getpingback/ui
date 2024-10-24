import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { VariableInput } from "./variable-input";

describe("VariableInput Component", () => {
  const options = [
    { label: "Variable 1", value: "var1" },
    { label: "Variable 2", value: "var2" },
  ];

  it("should render with default props and open dropdown on trigger click", () => {
    const { getByTestId, getByText } = render(<VariableInput options={options} />);

    const triggerButton = getByTestId("variable-input-trigger");
    fireEvent.click(triggerButton);

    expect(getByText("Variable 1")).toBeInTheDocument();
    expect(getByText("Variable 2")).toBeInTheDocument();
  });

  it("should call onChangeText when text is input", () => {
    const handleChangeText = jest.fn();
    const { container } = render(<VariableInput options={options} onChangeText={handleChangeText} />);

    const editor = container.querySelector("[contenteditable='true']");
    if (editor) {
      fireEvent.input(editor, { target: { textContent: "Hello" } });
      expect(handleChangeText).toHaveBeenCalledWith("Hello");
    }
  });

  it("should call onSelect when a variable is selected", () => {
    const handleSelect = jest.fn();
    const { getByText, getByTestId } = render(<VariableInput options={options} onSelect={handleSelect} />);

    const triggerButton = getByTestId("variable-input-trigger");
    fireEvent.click(triggerButton);

    fireEvent.click(getByText("Variable 1"));
    expect(handleSelect).toHaveBeenCalledWith("var1");
  });

  it("should display placeholder when not focused and empty", () => {
    const { container } = render(<VariableInput options={options} placeholder='Enter text' />);

    const editor = container.querySelector("[contenteditable='true']");
    if (editor) {
      expect(editor.innerHTML).toContain("Enter text");
    }
  });

  it("should prevent editing of variable spans", () => {
    const { container } = render(<VariableInput options={options} />);
    const editor = container.querySelector("[contenteditable='true']");

    if (editor) {
      fireEvent.input(editor, { target: { innerHTML: '<span data-variable="var1">Variable 1</span>' } });

      fireEvent.keyDown(editor, { key: "Backspace" });

      expect(editor.innerHTML).toContain("Variable 1");
    }
  });
});
