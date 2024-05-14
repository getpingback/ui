import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
  },
};
export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium",
    radius: "medium",
  },
};
export const Full: Story = {
  args: {
    children: "Full",
    radius: "full",
  },
};
