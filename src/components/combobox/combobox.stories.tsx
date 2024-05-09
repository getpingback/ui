import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Combobox } from "./combobox";
import { ArticleIcon, CogIcon, EnvelopeFlyingIcon, ListAddIcon } from "@stash-ui/regular-icons";

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {},
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Selecione o link",
    searchPlaceholder: "Pesquise pelo link...",
    emptySearchPlaceholder: "Nenhum resultado encontrado.",
    options: [
      {
        items: [
          {
            label: "https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/",
            value: "https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/",
          },
          {
            label: "https://pingback.com/juliano-fabbro",
            value: "https://pingback.com/juliano-fabbro",
          },
          {
            label: "https://pingback.com/juliano-fabbro/pods-construcao-civil",
            value: "https://pingback.com/juliano-fabbro/pods-construcao-civil",
          },
          {
            label: "https://blog.pipelovers.net/",
            value: "https://blog.pipelovers.net/",
          },
        ],
      },
    ],
  },
};

export const Detailed: Story = {
  args: {
    variant: "detailed",
    placeholder: "Selecione a lista",
    searchPlaceholder: "Pesquise por uma lista...",
    emptySearchPlaceholder: "Nenhum resultado encontrado.",
    options: [
      {
        items: [
          {
            label: "Comunidades inativas",
            description: "117 membros",
            value: "comunidades inativas",
          },
          {
            label: "Foodies",
            description: "45 membros",
            value: "foodies",
          },
          {
            label: "Pagantes",
            description: "67 membros",
            value: "pagantes",
          },
          {
            label: "Base quente",
            description: "566 membros",
            value: "base quente",
          },
        ],
      },
    ],
  },
};

export const ImageDetailed: Story = {
  args: {
    variant: "image-detailed",
    placeholder: "Escolha um conteúdo",
    searchPlaceholder: "Pesquise conteúdo...",
    emptySearchPlaceholder: "Nenhum resultado encontrado.",
    options: [
      {
        items: [
          {
            label: "8 métricas essenciais para acompanhar no seu blog post",
            imageUrl: "https://source.unsplash.com/100x100/?blog",
            value: "8 métricas essenciais para acompanhar no seu blog post",
          },
          {
            label: "Dicas para criar emails de final de ano que brilham",
            imageUrl: "https://source.unsplash.com/100x100/?blog",
            value: "dicas para criar emails de final de ano que brilham",
          },
          {
            label: "O que é KPI? Tudo sobre os indicadores chaves",
            imageUrl: "https://source.unsplash.com/100x100/?blog",
            value: "o que é kpi? tudo sobre os indicadores chaves",
          },
          {
            label: "Estratégias práticas de SEO usando o TikTok",
            value: "estratégias práticas de seo usando o tiktok",
          },
        ],
      },
    ],
  },
};

export const IconCompact: Story = {
  args: {
    variant: "icon-compact",
    placeholder: "Selecione uma ação",
    searchPlaceholder: "Pesquise por uma ação...",
    emptySearchPlaceholder: "Nenhum resultado encontrado.",
    options: [
      {
        items: [
          {
            label: "Enviar a newsletter...",
            icon: (
              <div className='flex items-center justify-center rounded-md h-6 w-6 border-[0.75px] border-[#e4e4e7] bg-[#fafafa]'>
                <EnvelopeFlyingIcon color='#71717a' width={18} height={18} />
              </div>
            ),
            value: "enviar a newsletter",
          },
          {
            label: "Publicar o artigo...",
            icon: (
              <div className='flex items-center justify-center rounded-md h-6 w-6 border-[0.75px] border-[#e4e4e7] bg-[#fafafa]'>
                <ArticleIcon color='#71717a' width={18} height={18} />
              </div>
            ),
            value: "publicar o artigo",
          },
          {
            label: "Adicionar a lista...",
            icon: (
              <div className='flex items-center justify-center rounded-md h-6 w-6 border-[0.75px] border-[#fdf6b2] bg-[#fdfdea]'>
                <ListAddIcon color='#e3a008' width={18} height={18} />
              </div>
            ),
            value: "adicionar a lista",
          },
          {
            label: "Adicionar a automação...",
            icon: (
              <div className='flex items-center justify-center rounded-md h-6 w-6 border-[0.75px] border-[#99f6e4] bg-[#f0fdfa]'>
                <CogIcon color='#14b8a6' width={18} height={18} />
              </div>
            ),
            value: "adicionar a automação",
          },
        ],
      },
    ],
  },
};

export const ShouldFilterFalse: Story = {
  args: {
    shouldFilter: false,
    onChangeSearchValue: (value: string) => console.log("onChangeSearchValue", value),
    placeholder: "Selecione o link",
    searchPlaceholder: "Pesquise pelo link...",
    emptySearchPlaceholder: "Nenhum resultado encontrado.",
    options: [
      {
        items: [
          {
            label: "https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/",
            value: "https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/",
          },
          {
            label: "https://pingback.com/juliano-fabbro",
            value: "https://pingback.com/juliano-fabbro",
          },
          {
            label: "https://pingback.com/juliano-fabbro/pods-construcao-civil",
            value: "https://pingback.com/juliano-fabbro/pods-construcao-civil",
          },
          {
            label: "https://blog.pipelovers.net/",
            value: "https://blog.pipelovers.net/",
          },
        ],
      },
    ],
  },
};

export const WithLabelAndHelperText: Story = {
  args: {
    label: "Link",
    helperText: "Selecione um link para adicionar ao seu email.",
    placeholder: "Selecione o link",
    searchPlaceholder: "Pesquise pelo link...",
    emptySearchPlaceholder: "Nenhum resultado encontrado.",
    options: [
      {
        items: [
          {
            label: "https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/",
            value: "https://pt.semrush.com/blog/bounce-rate-taxa-de-rejeicao/",
          },
          {
            label: "https://pingback.com/juliano-fabbro",
            value: "https://pingback.com/juliano-fabbro",
          },
          {
            label: "https://pingback.com/juliano-fabbro/pods-construcao-civil",
            value: "https://pingback.com/juliano-fabbro/pods-construcao-civil",
          },
          {
            label: "https://blog.pipelovers.net/",
            value: "https://blog.pipelovers.net/",
          },
        ],
      },
    ],
  },
};

export const GroupHeading: Story = {
  args: {
    label: 'Lista',
    variant: "detailed",
    placeholder: "Selecione a lista",
    searchPlaceholder: "Pesquise por uma lista...",
    emptySearchPlaceholder: "Nenhum resultado encontrado.",
    options: [
      {
        heading: "Listas inteligentes",
        items: [
          {
            label: "Engajados",
            description: "117 membros",
            value: "engajados",
          },
          {
            label: "Envolvidos",
            description: "45 membros",
            value: "envolvidos",
          },
          {
            label: "Passivos",
            description: "67 membros",
            value: "passivos",
          },
          {
            label: "Desinteressados",
            description: "566 membros",
            value: "desinteressados",
          },
        ],
      },
      {
        heading: "Suas listas",
        items: [
          {
            label: "Comunidades inativas",
            description: "117 membros",
            value: "comunidades inativas",
          },
          {
            label: "Foodies",
            description: "45 membros",
            value: "foodies",
          },
          {
            label: "Pagantes",
            description: "67 membros",
            value: "pagantes",
          },
          {
            label: "Base quente",
            description: "566 membros",
            value: "base quente",
          },
        ],
      },
    ],
  },
};