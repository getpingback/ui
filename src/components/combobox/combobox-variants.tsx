import * as React from 'react';
import { CheckIcon } from '@stash-ui/regular-icons';

import { cn } from '@/lib/utils';
import { Badge } from '../badge';
import { TimesIcon } from '@stash-ui/light-icons';

interface Item {
  value: string;
  label: string;
  icon?: React.ReactNode;
  leadingElement?: React.ReactNode;
  imageUrl?: string;
  description?: string;
}

const DefaultVariant = ({ item, selected, isButtonLabel }: { item: Item; selected: boolean; isButtonLabel?: boolean }) => (
  <>
    <span className={`line-clamp-1 ${isButtonLabel ? 'w-full h-full flex items-center' : ''} ${selected ? 'text-visible' : ''}`}>
      {item.label}
    </span>
    {selected && <CheckIcon className="min-w-6 min-h-6" />}
  </>
);

const DetailedVariant = ({ item, selected, isButtonLabel }: { item: Item; selected: boolean; isButtonLabel?: boolean }) => (
  <>
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
  </>
);

const IconCompactVariant = ({ item, selected }: { item: Item; selected: boolean }) => (
  <>
    <div className="flex items-center gap-2 h-full">
      <div className="flex items-center justify-center w-6 h-6 rounded-md">{item.icon || null}</div>
      <div className="text-sm font-medium line-clamp-1">{item.label}</div>
    </div>

    {selected && <CheckIcon height={20} width={20} />}
  </>
);

const ImageDetailedVariant = ({ item, selected, isButtonLabel }: { item: Item; selected: boolean; isButtonLabel?: boolean }) => (
  <>
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
  </>
);

const MultipleVariant = ({ items, handleUnselect }: { items: Item[]; handleUnselect: (item: Item) => void }) => (
  <div className="flex gap-1 flex-wrap max-h-[56px] overflow-y-auto">
    {items.map((item) => (
      <Badge
        data-testid="combobox-item"
        variant="ghost"
        key={item.value}
        className="mr-1"
        onClick={(e) => {
          e.stopPropagation();
          handleUnselect(item);
        }}
      >
        {item.label}
        <div
          role="button"
          className="ml-1 ring-offset-background rounded-full outline-none hover:[box-shadow:0px_0px_0px_3px_rgba(240,_82,_82,_0.12)] focus:[box-shadow:0px_0px_0px_3px_rgba(240,_82,_82,_0.12)]"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleUnselect(item);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleUnselect(item);
          }}
        >
          <TimesIcon className="h-4 w-4" />
        </div>
      </Badge>
    ))}
  </div>
);

export { DefaultVariant, DetailedVariant, IconCompactVariant, ImageDetailedVariant, MultipleVariant };
