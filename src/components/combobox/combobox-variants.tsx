import * as React from 'react';
import { CheckIcon, ChevronRightIcon } from '@stash-ui/regular-icons';

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

const DefaultVariant = ({
  item,
  selected,
  isButtonLabel,
  hasStep
}: {
  item: Item;
  selected: boolean;
  isStep?: boolean;
  isButtonLabel?: boolean;
  hasStep?: boolean;
}) => (
  <>
    <span
      className={`line-clamp-1 ${isButtonLabel ? 'w-full h-full min-h-5 text-secondary text-sm font-medium flex items-center' : ''} ${
        selected ? 'text-visible' : ''
      }`}
    >
      {item.label}
    </span>
    {hasStep && <ChevronRightIcon className="text-icon-tertiary" width={20} height={20} />}
    {selected && <CheckIcon className="min-w-6 min-h-6 text-icon-primary" />}
  </>
);

const DetailedVariant = ({ item, selected, isButtonLabel }: { item: Item; selected: boolean; isButtonLabel?: boolean }) => (
  <>
    <div className="flex items-center w-full">
      {item.leadingElement && !isButtonLabel ? <>{item.leadingElement}</> : null}

      <div className="flex flex-col items-start w-full">
        <div
          className={`line-clamp-1 text-sm text-secondary font-medium ${isButtonLabel ? 'max-w-[100%]' : ''} ${
            selected ? 'text-visible' : ''
          }`}
        >
          {item.label}
        </div>
        {!isButtonLabel ? <div className="text-xs text-tertiary">{item.description}</div> : null}
      </div>
    </div>

    {selected && <CheckIcon height={20} width={20} />}
  </>
);

const IconCompactVariant = ({ item, selected }: { item: Item; selected: boolean }) => (
  <>
    <div className="flex items-center gap-2 h-full">
      <div className="flex items-center justify-center w-6 h-6 rounded-lg">{item.icon || null}</div>
      <div className="text-sm font-medium text-secondary line-clamp-1">{item.label}</div>
    </div>

    {selected && <CheckIcon height={20} width={20} />}
  </>
);

const ImageDetailedVariant = ({ item, selected, isButtonLabel }: { item: Item; selected: boolean; isButtonLabel?: boolean }) => (
  <>
    <div className="w-full flex items-center gap-4 h-full">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.label}
          className={cn('w-16 h-12 min-w-16 rounded-xl object-cover', isButtonLabel && 'w-8 min-w-8 h-6 rounded-[4px]')}
        />
      ) : (
        <div className={cn('w-16 h-12 min-w-16 object-cover rounded-xl bg-gray-200', isButtonLabel && 'w-8 min-w-8 h-6 rounded-[4px]')} />
      )}
      <div className="flex flex-col gap-1 min-w-0">
        <span className={cn('text-secondary font-medium text-sm line-clamp-2', isButtonLabel && 'line-clamp-1 text-wrap')}>
          {item.label}
        </span>
        <div className="text-xs text-tertiary">{item.description}</div>
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
          className="ml-1 rounded-full outline-none hover:[box-shadow:0px_0px_0px_3px_rgba(240,_82,_82,_0.12)] focus:[box-shadow:0px_0px_0px_3px_rgba(240,_82,_82,_0.12)]"
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
