import type { Meta, StoryObj } from "@storybook/react";

import { VariableInput } from "./variable-input";

const meta = {
  title: "Components/VariableInput",
  component: VariableInput,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} satisfies Meta<typeof VariableInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: "Email", value: "email" },
  { label: "Name", value: "name" },
  { label: "Phone", value: "phone" },
];

export const Default: Story = {
  args: {
    options,
  },
};

export const WithInputProps: Story = {
  args: {
    label: "URL",
    placeholder: "https://www.example.com",
    helperText: "Enter the URL of the page you want to redirect to",
    options,
  },
};