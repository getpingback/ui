import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button';
import { Combobox } from '../combobox';
import { NodeFlow, NodeLine } from './node-flow';

const meta = {
  title: 'Components/NodeFlow',
  component: NodeFlow,

  tags: ['autodocs']
} satisfies Meta<typeof NodeFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <NodeFlow parent={<Button variant="outline">NodeFlow</Button>}>
        <NodeLine>
          <div className="bg-gray-100 w-full text-xs h-16 rounded-md p-4 opacity-65">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam quaerat odio
            repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit culpa?
          </div>
        </NodeLine>

        <NodeLine conectionHeight={20}>
          <NodeFlow
            parent={<Button>NodeFlow Child</Button>}
            suffix={<div className="w-fit rounded-md text-xs opacity-65 text-purple-600">Remove this node</div>}
            status="default"
          >
            <NodeLine>
              <div className="bg-gray-100 w-full text-xs h-16 rounded-md p-4 opacity-65">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam quaerat odio
                repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit culpa?
              </div>
            </NodeLine>
            <NodeLine>
              <div className="bg-gray-100 w-full text-xs h-16 rounded-md p-4 opacity-65">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam quaerat odio
                repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit culpa?
              </div>
            </NodeLine>
            <NodeLine>
              <div className="bg-gray-100 w-full text-xs h-16 rounded-md p-4 opacity-65">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam quaerat odio
                repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit culpa?
              </div>
            </NodeLine>
            <NodeLine>
              <div className="bg-gray-100 w-full text-xs h-16 rounded-md p-4 opacity-65">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam quaerat odio
                repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit culpa?
              </div>
            </NodeLine>
          </NodeFlow>
        </NodeLine>

        <NodeLine>
          <div className="bg-gray-100 w-full text-xs h-16 rounded-md p-4 opacity-65">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam quaerat odio
            repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit culpa?
          </div>
        </NodeLine>
        <NodeLine>
          <div className="bg-gray-100 w-full text-xs h-16 rounded-md p-4 opacity-65">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam quaerat odio
            repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit culpa?
          </div>
        </NodeLine>
      </NodeFlow>
    );
  }
};

export const OnlyOneNode: Story = {
  render: () => {
    return (
      <NodeFlow parent={<Button variant="outline">NodeFlow</Button>}>
        <NodeLine>
          <div className="bg-gray-100 w-full text-xs h-16 rounded-md p-4 opacity-65">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam nam deserunt nemo commodi saepe ullam quaerat odio
            repellendus tenetur, omnis assumenda rerum, nulla, voluptatum consequuntur pariatur reprehenderit culpa?
          </div>
        </NodeLine>
      </NodeFlow>
    );
  }
};
