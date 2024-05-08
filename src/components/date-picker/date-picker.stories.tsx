import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "./date-picker";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithInputProps: Story = {
  args: {
    label: "Date",
    placeholder: "Select a date",
    helperText: "Choose a date from the calendar",
  },
};

export const WithDisabledDaysBeforeToday: Story = {
  args: {
    disabled: { before: new Date() },
  },
};
