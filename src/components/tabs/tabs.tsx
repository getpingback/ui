import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { buttonVariants } from '@/components/button';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

export interface TabsTriggerProps extends Omit<React.ComponentProps<typeof TabsPrimitive.Trigger>, 'type'> {
  layoutId?: string;
}

function TabsTrigger({ className, layoutId, ...props }: TabsTriggerProps) {
  const [isActive, setIsActive] = React.useState(false);
  const triggerRef: React.MutableRefObject<HTMLButtonElement | null> = React.useRef(null);

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

  return (
    <>
      <TabsPrimitive.Trigger
        ref={triggerRef}
        className={cn(
          `relative w-fit !h-full !px-3 !outline-none rounded-full font-semibold text-xs transition-all duration-300 ease-in-out ${
            isActive ? 'bg-transparent text-button-solid-label' : buttonVariants({ variant: 'ghost' })
          }`,
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
            layoutId={`${layoutId}-tab-active-indicator`}
            className="absolute rounded-full flex items-center text-button-solid-label justify-center inset-0 bg-button-solid mix-blend-exclusion"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
      </TabsPrimitive.Trigger>
    </>
  );
}

export interface TabWrapperProps {
  children: React.ReactNode;
  layoutId?: string;
}

function TabWrapper({ children, layoutId }: TabWrapperProps) {
  if (React.Children.count(children) !== 1) return;

  const child = React.Children.only(children) as React.ReactElement<any>;
  return React.cloneElement(child, { layoutId });
}

export interface TabProps extends Omit<React.ComponentProps<typeof TabsPrimitive.List>, 'type'> {
  layoutId?: string;
}

function TabsList({ className, layoutId, ...props }: TabProps) {
  return (
    <TabsPrimitive.List
      className={cn('relative z-[9] h-[28px] outline-none inline-flex gap-2 items-center justify-center', className)}
      data-testid="tabs-list"
      {...props}
    >
      {React.Children.map(props.children, (child, index) => (
        <TabWrapper key={index} layoutId={layoutId}>
          {child}
        </TabWrapper>
      ))}
    </TabsPrimitive.List>
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
