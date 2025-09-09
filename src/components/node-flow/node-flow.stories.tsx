import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { NodeFlow, NodeLine, NodeParent } from './node-flow';

const meta = {
  title: 'Components/NodeFlow',
  component: NodeFlow,
  args: { children: null },
  tags: ['autodocs']
} satisfies Meta<typeof NodeFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => {
    return (
      <NodeFlow status="active">
        <AccordionPrimitive.Root type="single" collapsible defaultValue="cascade" className="w-full">
          <AccordionPrimitive.Item value="cascade" className="group relative">
            <AccordionPrimitive.Trigger className="w-full flex items-center justify-between [&[data-state=open]>span>svg]:rotate-180">
              <NodeParent>
                <Button variant="outline">NodeFlow</Button>
              </NodeParent>
            </AccordionPrimitive.Trigger>
            <AccordionPrimitive.Content className="data-[state=open]:animate-slide-up data-[state=closed]:animate-slide-down">
              <NodeLine conectionHeight={20}>
                <div className="bg-info w-full text-xs text-secondary h-16 rounded-md p-4 opacity-65">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam quaerat
                  odio repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit culpa?
                </div>
              </NodeLine>

              <NodeLine conectionHeight={20}>
                <NodeFlow status="default">
                  <AccordionPrimitive.Root type="single" collapsible defaultValue="cascade" className="w-full">
                    <AccordionPrimitive.Item value="cascade" className="group relative">
                      <AccordionPrimitive.Trigger className="w-full flex items-center justify-between [&[data-state=open]>span>svg]:rotate-180">
                        <NodeParent>
                          <Button variant="outline">NodeFlow</Button>
                        </NodeParent>
                      </AccordionPrimitive.Trigger>
                      <AccordionPrimitive.Content className="data-[state=open]:animate-slide-up data-[state=closed]:animate-slide-down">
                        <NodeLine>
                          <div className="bg-info w-full text-xs text-secondary h-16 rounded-md p-4 opacity-65">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam
                            quaerat odio repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit
                            culpa?
                          </div>
                        </NodeLine>
                        <NodeLine>
                          <div className="bg-info w-full text-xs text-secondary h-16 rounded-md p-4 opacity-65">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam
                            quaerat odio repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit
                            culpa?
                          </div>
                        </NodeLine>
                      </AccordionPrimitive.Content>
                    </AccordionPrimitive.Item>
                  </AccordionPrimitive.Root>
                </NodeFlow>
              </NodeLine>
              <NodeLine>
                <div className="bg-info w-full text-xs text-secondary h-16 rounded-md p-4 opacity-65">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam quaerat
                  odio repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit culpa?
                </div>
              </NodeLine>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        </AccordionPrimitive.Root>
      </NodeFlow>
    );
  }
};

export const OnlyOneNode: Story = {
  args: { children: null },
  render: () => {
    return (
      <NodeFlow>
        <NodeParent>
          <Button variant="outline">NodeFlow</Button>
        </NodeParent>
        <NodeLine>
          <div className="bg-info w-full text-xs h-16 rounded-md p-4 opacity-65">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam quaerat odio
            repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit culpa?
          </div>
        </NodeLine>
      </NodeFlow>
    );
  }
};
