import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Combobox } from './combobox';
import { ArticleIcon, CogIcon, EnvelopeFlyingIcon, ListAddIcon } from '@stash-ui/regular-icons';

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text'
    },
    tooltipText: {
      control: 'text'
    }
  },
  args: {
    onChangeSearchValue: undefined
  }
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Selecione o link',
    searchPlaceholder: 'Pesquise pelo link...',
    emptySearchPlaceholder: 'Nenhum resultado encontrado.',
    className: 'w-[352px]',
    options: [
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
    ]
  }
};

export const Step: Story = {
  args: {
    placeholder: 'Selecione o link',
    searchPlaceholder: 'Pesquise pelo link...',
    emptySearchPlaceholder: 'Nenhum resultado encontrado.',
    className: 'w-[352px]',
    variant: 'detailed',
    options: [
      {
        items: [
          {
            label: 'Atributos do contato',
            value: 'contact-attributes',
            items: [
              {
                heading: 'Informações do contato',
                items: [
                  {
                    label: 'Nome',
                    value: 'name'
                  },
                  {
                    label: 'Email',
                    value: 'email'
                  },
                  {
                    label: 'Telefone',
                    value: 'phone'
                  }
                ]
              },
              {
                heading: 'Custom fields',
                items: [
                  {
                    label: 'Cargo',
                    value: 'Cargo'
                  },
                  {
                    label: 'Empresa',
                    value: 'Empresa'
                  },
                  {
                    label: 'Cidade',
                    value: 'Cidade'
                  }
                ]
              }
            ]
          },
          {
            label: 'Eventos',
            value: 'events',
            items: [
              {
                heading: 'Email',
                items: [
                  {
                    label: 'Abriu o email ...',
                    value: 'abriu-o-email'
                  },
                  {
                    label: 'Clicou no link ...',
                    value: 'email'
                  }
                ]
              },
              {
                heading: 'Lista',
                items: [
                  {
                    label: 'Está na lista ...',
                    value: 'esta-na-lista'
                  },
                  {
                    label: 'Não está na lista ...',
                    value: 'nao-esta-na-lista'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

export const Detailed: Story = {
  args: {
    variant: 'detailed',
    placeholder: 'Selecione a lista',
    searchPlaceholder: 'Pesquise por uma lista...',
    emptySearchPlaceholder: 'Nenhum resultado encontrado.',
    options: [
      {
        items: [
          {
            label: 'Comunidades inativas',
            description: '117 membros',
            value: 'comunidades inativas'
          },
          {
            label: 'Foodies',
            description: '45 membros',
            value: 'foodies'
          },
          {
            label: 'Pagantes',
            description: '67 membros',
            value: 'pagantes'
          },
          {
            label: 'Base quente',
            description: '566 membros',
            value: 'base quente'
          }
        ]
      }
    ]
  }
};

export const ImageDetailed: Story = {
  args: {
    variant: 'image-detailed',
    placeholder: 'Escolha um conteúdo',
    searchPlaceholder: 'Pesquise conteúdo...',
    emptySearchPlaceholder: 'Nenhum resultado encontrado.',
    options: [
      {
        items: [
          {
            label: '8 métricas essenciais para acompanhar no seu blog post',
            imageUrl: 'https://picsum.photos/200/300',
            value: '8 métricas essenciais para acompanhar no seu blog post'
          },
          {
            label: 'Dicas para criar emails de final de ano que brilham',
            imageUrl: 'https://picsum.photos/200/300',
            value: 'dicas para criar emails de final de ano que brilham'
          },
          {
            label: 'O que é KPI? Tudo sobre os indicadores chaves',
            imageUrl: 'https://picsum.photos/200/300',
            value: 'o que é kpi? tudo sobre os indicadores chaves'
          },
          {
            label: 'Estratégias práticas de SEO usando o TikTok',
            value: 'estratégias práticas de seo usando o tiktok'
          }
        ]
      }
    ]
  }
};

export const IconCompact: Story = {
  args: {
    variant: 'icon-compact',
    placeholder: 'Selecione uma ação',
    searchPlaceholder: 'Pesquise por uma ação...',
    emptySearchPlaceholder: 'Nenhum resultado encontrado.',
    options: [
      {
        items: [
          {
            label: 'Enviar a newsletter...',
            icon: (
              <div className="flex items-center justify-center rounded-md h-6 w-6 border-[0.75px] border-[#e4e4e7] bg-[#fafafa]">
                <EnvelopeFlyingIcon color="#71717a" width={18} height={18} />
              </div>
            ),
            value: 'enviar a newsletter'
          },
          {
            label: 'Publicar o artigo...',
            icon: (
              <div className="flex items-center justify-center rounded-md h-6 w-6 border-[0.75px] border-[#e4e4e7] bg-[#fafafa]">
                <ArticleIcon color="#71717a" width={18} height={18} />
              </div>
            ),
            value: 'publicar o artigo'
          },
          {
            label: 'Adicionar a lista...',
            icon: (
              <div className="flex items-center justify-center rounded-md h-6 w-6 border-[0.75px] border-[#fdf6b2] bg-[#fdfdea]">
                <ListAddIcon color="#e3a008" width={18} height={18} />
              </div>
            ),
            value: 'adicionar a lista'
          },
          {
            label: 'Adicionar a automação...',
            icon: (
              <div className="flex items-center justify-center rounded-md h-6 w-6 border-[0.75px] border-[#99f6e4] bg-[#f0fdfa]">
                <CogIcon color="#14b8a6" width={18} height={18} />
              </div>
            ),
            value: 'adicionar a automação'
          }
        ]
      }
    ]
  }
};

export const ShouldFilterFalse: Story = {
  args: {
    onChangeSearchValue: () => {},
    placeholder: 'Selecione o link',
    searchPlaceholder: 'Pesquise pelo link...',
    emptySearchPlaceholder: 'Nenhum resultado encontrado.',
    options: [
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
    ]
  }
};

export const EmptyContentRender: Story = {
  args: {
    onChangeSearchValue: () => {},
    placeholder: 'Selecione o link',
    searchPlaceholder: 'Pesquise pelo link...',
    emptySearchPlaceholder: 'Nenhum resultado encontrado.',
    emptyContentRender: <div className="w-full flex items-center justify-center my-6">not found</div>,
    options: [
      {
        items: []
      }
    ]
  }
};

export const WithLabelAndHelperText: Story = {
  args: {
    label: 'Link',
    helperText: 'Selecione um link para adicionar ao seu email.',
    placeholder: 'Selecione o link',
    searchPlaceholder: 'Pesquise pelo link...',
    emptySearchPlaceholder: 'Nenhum resultado encontrado.',
    options: [
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
    ]
  }
};

export const GroupHeading: Story = {
  args: {
    label: 'Lista',
    onEndReached: () => {},
    variant: 'detailed',
    className: 'w-[480px]',
    placeholder: 'Selecione a lista',
    searchPlaceholder: 'Pesquise por uma lista...',
    emptySearchPlaceholder: 'Nenhum resultado encontrado.',
    options: [
      {
        heading: 'Listas inteligentes',
        items: [
          {
            label: 'Engajados',
            description: '117 membros',
            leadingElement: <div className="flex items-center justify-center rounded-full mr-4 h-7 w-7 bg-[#FBD5D5]">😍</div>,
            value: 'engajados'
          },
          {
            label: 'Envolvidos',
            description: '45 membros',
            leadingElement: <div className="flex items-center justify-center rounded-full mr-4 h-7 w-7 bg-[#FCD9BD]">😁</div>,
            value: 'envolvidos'
          },
          {
            label: 'Passivos',
            description: '67 membros',
            leadingElement: <div className="flex items-center justify-center rounded-full mr-4 h-7 w-7 bg-[#FDF6B2]">🙂</div>,
            value: 'passivos'
          },
          {
            label: 'Desinteressados',
            description: '566 membros',
            leadingElement: <div className="flex items-center justify-center rounded-full mr-4 h-7 w-7 bg-[#BCF0DA]">🥱</div>,
            value: 'desinteressados'
          }
        ]
      },
      {
        heading: 'Suas listas',
        items: [
          {
            label: 'Comunidades inativas',
            description: '117 membros',
            value: 'comunidades inativas'
          },
          {
            label: 'Foodies',
            description: '45 membros',
            value: 'foodies'
          },
          {
            label: 'Pagantes',
            description: '67 membros',
            value: 'pagantes'
          },
          {
            label: 'Base quente',
            description: '566 membros',
            value: 'base quente'
          }
        ]
      }
    ]
  }
};

export const ScrollToEnd: Story = {
  args: {
    label: 'Lista',
    options: [
      {
        items: [
          {
            label: 'Item 1',
            value: 'item-1'
          },
          {
            label: 'Item 2',
            value: 'item-2'
          },
          {
            label: 'Item 3',
            value: 'item-3'
          },
          {
            label: 'Item 4',
            value: 'item-4'
          },
          {
            label: 'Item 5',
            value: 'item-5'
          },
          {
            label: 'Item 6',
            value: 'item-6'
          },
          {
            label: 'Item 7',
            value: 'item-7'
          },
          {
            label: 'Item 8',
            value: 'item-8'
          }
        ]
      }
    ]
  },
  decorators: [
    (Story, { args }) => {
      const [options, setOptions] = React.useState(args.options);
      const [isLoading, setIsLoading] = React.useState(false);

      const onEndReached = () => {
        setIsLoading(true);
        setTimeout(() => {
          setOptions([
            ...options,
            {
              items: [
                {
                  label: `Item ${Math.floor(Math.random() * 1000)}`,
                  value: `item-${Math.floor(Math.random() * 1000)}`
                },
                {
                  label: `Item ${Math.floor(Math.random() * 1000)}`,
                  value: `item-${Math.floor(Math.random() * 1000)}`
                }
              ]
            }
          ]);
          setIsLoading(false);
        }, 1000);
      };

      const enhancedArgs = {
        ...args,
        isLoading,
        options,
        onEndReached
      };

      return <Story args={enhancedArgs} />;
    }
  ]
};

export const Multiple: Story = {
  args: {
    variant: 'multiple',
    placeholder: 'Selecione uma lista',
    options: [
      {
        items: [
          {
            label: 'Item 1',
            value: 'item-1'
          },
          {
            label: 'Item 2',
            value: 'item-2'
          },
          {
            label: 'Item 3',
            value: 'item-3'
          },
          {
            label: 'Item 4',
            value: 'item-4'
          },
          {
            label: 'Item 5',
            value: 'item-5'
          },
          {
            label: 'Item 6',
            value: 'item-6'
          },
          {
            label: 'Item 7',
            value: 'item-7'
          },
          {
            label: 'Item 8',
            value: 'item-8'
          },
          {
            label: 'Item 9',
            value: 'item-9'
          },
          {
            label: 'Item 10',
            value: 'item-10'
          }
        ]
      }
    ]
  }
};

export const ErrorMessage: Story = {
  args: {
    errorMessage: 'Erro ao carregar as listas',
    options: [
      {
        items: []
      }
    ]
  }
};
