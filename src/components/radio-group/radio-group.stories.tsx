import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RadioGroup, RadioItem } from "./radio-group";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      defaultValue: "horizontal",
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ direction }) => (
    <RadioGroup defaultValue="3" direction={direction}>
      <RadioItem value="1" id="opt-1">
        Option 1
      </RadioItem>
      <RadioItem value="2" id="opt-2">
        Option 2
      </RadioItem>
      <RadioItem value="3" id="opt-3" disabled>
        Option 3
      </RadioItem>
    </RadioGroup>
  ),
};
