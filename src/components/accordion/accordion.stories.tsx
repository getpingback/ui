import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "./accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
  },

  tags: ["autodocs"],

  argTypes: {},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
        <>
            <span>Accordion item 1</span>
            <span>Accordion item 2</span>
            <span>Accordion item 3</span>    
        </>
    ),
    label: "Accordion Label",
  },
};