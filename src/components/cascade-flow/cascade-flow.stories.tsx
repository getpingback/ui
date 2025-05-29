import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../badge';
import { Combobox } from '../combobox';
import { CascadeFlow, NodeLine } from './cascade-flow';

const meta = {
  title: 'Components/CascadeFlow',
  component: CascadeFlow,

  tags: ['autodocs']
} satisfies Meta<typeof CascadeFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <CascadeFlow
        parent={<Badge type="purple">E / OU</Badge>}
        suffix={<div className="w-fit rounded-md p-4 text-xs">Remove this node</div>}
      >
        <NodeLine>
          <div className="bg-gray-100 w-full h-16 rounded-md p-4">First Child</div>
        </NodeLine>

        <NodeLine>
          <CascadeFlow
            parent={<Badge type="purple">E / OU</Badge>}
            suffix={<div className="w-fit rounded-md p-4 text-xs">Remove this node</div>}
          >
            <div className="bg-gray-100 w-full h-16 rounded-md p-4">lorem ipsum dolor sit amet</div>
          </CascadeFlow>
        </NodeLine>

        <NodeLine>
          <div className="bg-gray-100 w-full h-[200px] rounded-md p-4">
            <div>Third Child</div>
            <Combobox
              placeholder="Selecione o link"
              searchPlaceholder="Pesquise pelo link..."
              emptySearchPlaceholder="Nenhum resultado encontrado."
              className="w-[352px]"
              options={[
                {
                  items: [
                    {
                      label: 'https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/',
                      value: 'https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/'
                    },
                    {
                      label: 'https://pingback.com/juliano-fabbro',
                      value: 'https://pingback.com/juliano-fabbro'
                    },
                    {
                      label: 'https://pingback.com/juliano-fabbro/pods-construcao-civil',
                      value: 'https://pingback.com/juliano-fabbro/pods-construcao-civil'
                    },
                    {
                      label: 'https://blog.pipelovers.net/',
                      value: 'https://blog.pipelovers.net/'
                    }
                  ]
                }
              ]}
            />
          </div>
        </NodeLine>
      </CascadeFlow>
    );
  }
};
