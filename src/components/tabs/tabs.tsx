import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { buttonVariants } from '@/components/button';
import { motion, LayoutGroup } from 'framer-motion';

import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { createContext, useContext } from 'react';

export type TabsVariant = 'primary' | 'secondary';
export interface TabsContextType {
  variant: TabsVariant;
}

export const TabsListContext = createContext<TabsContextType>({
  variant: 'primary'
});

export const useTabsListContext = () => {
  const context = useContext(TabsListContext);
  if (!context) {
    throw new Error('useTabsListContext must be used within a TabsListProvider');
  }
  return context;
};

const tabsTriggerVariants = cva('absolute rounded-full flex items-center  justify-center inset-0  mix-blend-exclusion', {
  variants: {
    variant: {
      primary: 'bg-button-solid text-button-solid-label',
      secondary: 'bg-surface border-[2px] border-default'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});

const Tabs = TabsPrimitive.Root;

export interface TabsTriggerProps extends Omit<React.ComponentProps<typeof TabsPrimitive.Trigger>, 'type'> {}

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  const [isActive, setIsActive] = React.useState(false);
  const triggerRef: React.MutableRefObject<HTMLButtonElement | null> = React.useRef(null);
  const { variant } = useTabsListContext();

  const isSecondary = variant === 'secondary';

  React.useEffect(() => {
    const handleStateChange = () => {
      if (triggerRef.current && triggerRef.current.getAttribute('data-state') === 'active') {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    handleStateChange();

    const observer = new MutationObserver(handleStateChange);
    if (triggerRef.current) {
      observer.observe(triggerRef.current, { attributes: true, attributeFilter: ['data-state'] });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const activeTriggerStyles = !isSecondary ? 'bg-transparent text-button-solid-label' : 'text-primary';
  const inactiveTriggerStyles = !isSecondary ? buttonVariants({ variant: 'ghost', rounded: 'full' }) : 'text-primary';

  return (
    <>
      <TabsPrimitive.Trigger
        ref={triggerRef}
        className={cn(
          `relative w-fit !h-full !px-3 !outline-none font-semibold text-xs transition-all duration-300 ease-in-out ${
            isActive ? activeTriggerStyles : inactiveTriggerStyles
          }`,
          isSecondary && '!h-8',
          className
        )}
        style={{
          WebkitTapHighlightColor: 'transparent'
        }}
        data-testid="tabs-trigger"
        {...props}
      >
        <span className="relative z-10">{props.children}</span>

        {isActive && (
          <motion.span
            layoutId={'tab-active-indicator'}
            className={cn(tabsTriggerVariants({ variant }))}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
      </TabsPrimitive.Trigger>
    </>
  );
}

export interface TabProps extends Omit<React.ComponentProps<typeof TabsPrimitive.List>, 'type'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

function TabsList({ className, children, variant = 'primary', ...props }: TabProps) {
  const layoutGroupId = React.useId();

  return (
    <LayoutGroup id={layoutGroupId}>
      <TabsListContext.Provider value={{ variant }}>
        <TabsPrimitive.List
          className={cn(
            'max-w-fit relative z-[9] h-[28px] outline-none inline-flex gap-2 items-center',
            className,
            variant === 'secondary' && 'bg-neutral rounded-full text-secondary-inverse gap-0'
          )}
          data-testid="tabs-list"
          {...props}
        >
          {children}
        </TabsPrimitive.List>
      </TabsListContext.Provider>
    </LayoutGroup>
  );
}

export interface TabContentProps extends React.ComponentProps<typeof TabsPrimitive.Content> {}

function TabsContent({ className, ...props }: TabContentProps) {
  return (
    <TabsPrimitive.Content
      className={cn('mt-2 !outline-none focus-visible:!outline-none focus:!outline-none', className)}
      data-testid="tabs-content"
      {...props}
    />
  );
}

export { Tabs, TabsTrigger, TabsList, TabsContent };
