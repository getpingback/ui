import * as React from 'react';
import { CheckIcon } from '@stash-ui/regular-icons';

import { cn } from '@/lib/utils';

interface Item {
  value: string;
  label: string;
  icon?: React.ReactNode;
  leadingElement?: React.ReactNode;
  imageUrl?: string;
  description?: string;
}

const DefaultVariant = ({ item, selected, isButtonLabel }: { item: Item; selected: boolean; isButtonLabel?: boolean }) => (
  <div className={cn('flex items-center h-full w-full', selected && 'justify-between', isButtonLabel && 'w-[calc(100%-30px)]')}>
    <span className={`line-clamp-1 ${isButtonLabel ? 'w-full h-full flex items-center' : ''} ${selected ? 'text-visible' : ''}`}>
      {item.label}
    </span>
    {selected && <CheckIcon />}
  </div>
);

const DetailedVariant = ({ item, selected, isButtonLabel }: { item: Item; selected: boolean; isButtonLabel?: boolean }) => (
  <div className={cn('flex items-center w-full max-w-[calc(100%-24px)]', selected && 'justify-between')}>
    <div className="flex items-center w-full">
      {item.leadingElement && !isButtonLabel ? <>{item.leadingElement}</> : null}

      <div className="flex flex-col items-start w-full">
        <div className={`line-clamp-1 text-sm font-medium${isButtonLabel ? ' max-w-[100%]' : ''} ${selected ? 'text-visible' : ''}`}>
          {item.label}
        </div>
        {!isButtonLabel ? <div className="text-xs text-gray-500">{item.description}</div> : null}
      </div>
    </div>

    {selected && <CheckIcon height={20} width={20} />}
  </div>
);

const IconCompactVariant = ({ item, selected }: { item: Item; selected: boolean }) => (
  <div className={cn('w-full h-full flex items-center', selected && 'justify-between')}>
    <div className="flex items-center gap-2 h-full">
      <div className="flex items-center justify-center w-6 h-6 rounded-md">{item.icon || null}</div>
      <div className="text-sm font-medium line-clamp-1">{item.label}</div>
    </div>

    {selected && <CheckIcon height={20} width={20} />}
  </div>
);

const ImageDetailedVariant = ({ item, selected, isButtonLabel }: { item: Item; selected: boolean; isButtonLabel?: boolean }) => (
  <div className={cn('flex items-center w-full h-full', selected && 'justify-between')}>
    <div className="flex items-center gap-4 h-full">
      {item.imageUrl ? (
        <img src={item.imageUrl} alt={item.label} className="w-[64px] h-[48px] rounded-md object-cover" />
      ) : (
        <div className="w-[64px] h-[48px] rounded-md bg-gray-200" />
      )}
      <div className="flex flex-col gap-1">
        <div className={`line-clamp-2 text-sm${isButtonLabel ? ' max-w-[151px] w-full truncate h-full flex items-center' : ''}`}>
          {item.label}
        </div>
        <div className="text-xs text-gray-500">{item.description}</div>
      </div>
    </div>

    {selected && <CheckIcon height={20} width={20} />}
  </div>
);

export { DefaultVariant, DetailedVariant, IconCompactVariant, ImageDetailedVariant };
