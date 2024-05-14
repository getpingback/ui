import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { MultiSelect } from "./multi-select";

const meta = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [selected, setSelected] = React.useState<string[]>([]);

  return (
    <MultiSelect
      placeholder="Select a framework..."
      options={[
        {
          value: "next.js",
          label: "Next.js",
        },
        {
          value: "sveltekit",
          label: "SvelteKit",
        },
        {
          value: "nuxt.js",
          label: "Nuxt.js",
        },
        {
          value: "remix",
          label: "Remix",
        },
        {
          value: "astro",
          label: "Astro",
        },
        {
          value: "wordpress",
          label: "WordPress",
        },
        {
          value: "express.js",
          label: "Express.js",
        },
      ]}
      selected={selected}
      onChange={setSelected}
      className='w-[352px]'
    />
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
};
