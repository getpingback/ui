import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const tabTriggerVariants = cva(
  'relative w-full h-full !outline-none rounded-md [&[data-state=active]]:opacity-100 font-semibold text-secondary-foreground text-xs opacity-45 hover:opacity-100 transition-all duration-200 ease-in-out',
  {
    variants: {
      type: {
        clear: '[&[data-state=active]]:text-[#9061F9] hover:text-[#9061F9]',
        purple: '[&[data-state=active]]:text-[#7E3AF2] hover:text-[#7E3AF2]',
        'bottom-line': '[&[data-state=active]]:text-[#7E3AF2] hover:text-[#7E3AF2] bg-transparent'
      }
    },
    defaultVariants: {
      type: 'purple'
    }
  }
);

const tabListVariants = cva('inline-flex items-center justify-center rounded-md text-muted-foreground bg-[#71717A0A]', {
  variants: {
    height: {
      medium: 'h-[32px]',
      full: 'h-[40px] p-1'
    }
  },
  defaultVariants: {
    height: 'medium'
  }
});

export interface TabsTriggerProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.Trigger>, 'type'>,
    VariantProps<typeof tabTriggerVariants> {
  layoutId?: string;
}

function TabsTrigger({ className, type, layoutId, ...props }: TabsTriggerProps) {
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
        className={cn(tabTriggerVariants({ type }), 'relative', className)}
        style={{
          WebkitTapHighlightColor: 'transparent'
        }}
        data-testid="tabs-trigger"
        {...props}
      >
        <div className="relative z-30">{props.children}</div>

        {isActive ? (
          <motion.div
            key={props.value}
            className={cn(
              'absolute rounded-md z-20 debug-border',
              type === 'clear' && 'inset-0 z-[-1] bg-[#FFFFFF] [box-shadow:0px_0px_1px_1px_rgba(0,_0,_0,_0.04)] opacity-100',
              type === 'purple' && 'inset-0 bg-[#9061F914] outline-none',
              type === 'bottom-line' && 'bg-[#9061F9] h-[2px] left-0 right-0 bottom-0 rounded-none'
            )}
            layoutId={layoutId ? `${layoutId}-${type}-tab-active-indicator` : `${type}-tab-active-indicator`}
            transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
          />
        ) : null}
      </TabsPrimitive.Trigger>
    </>
  );
}

export interface TabWrapperProps {
  type: string;
  children: React.ReactNode;
  layoutId?: string;
}

function TabWrapper({ type, children, layoutId }: TabWrapperProps) {
  if (React.Children.count(children) !== 1) return;

  const child = React.Children.only(children) as React.ReactElement<any>;
  return React.cloneElement(child, { type, layoutId });
}

export interface TabProps extends Omit<React.ComponentProps<typeof TabsPrimitive.List>, 'type'>, VariantProps<typeof tabTriggerVariants> {
  type: 'purple' | 'clear' | 'bottom-line';
  height: 'medium' | 'full';
  layoutId?: string;
}

function TabsList({ className, type = 'purple', height, layoutId, ...props }: TabProps) {
  return (
    <TabsPrimitive.List
      className={cn(tabListVariants({ height }), 'relative z-[9] outline-none', type === 'bottom-line' && 'bg-transparent', className)}
      data-testid="tabs-list"
      {...props}
    >
      {React.Children.map(props.children, (child, index) => (
        <TabWrapper key={index} type={type} layoutId={layoutId}>
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
