import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@stash-ui/regular-icons';
import { cn } from '@/lib/utils';

interface AccordionProps extends Omit<AccordionPrimitive.AccordionItemProps, 'value'> {
  children: React.ReactNode;
  label: React.ReactNode | string;
  isInitialStateOpen?: boolean;
  isOpen?: boolean;
}

function Accordion({ className, children, label, isInitialStateOpen = false, isOpen = false, ...props }: AccordionProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const content = contentRef.current;

    if (!ref.current || !content) return;

    const resizeObserver = new ResizeObserver(() => {
      const currentHeight = ref?.current?.clientHeight;

      content.style.cssText = `--radix-accordion-content-height: ${currentHeight}px;`;
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [children]);

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      data-testid="navigation-trigger"
      className={cn('w-full', className)}
      defaultValue={isInitialStateOpen ? 'accordion' : undefined}
      value={isOpen ? 'accordion' : undefined}
    >
      <AccordionPrimitive.Item {...props} value="accordion">
        <AccordionPrimitive.Trigger
          className={cn(
            'w-full h-[40px] inline-flex items-center justify-between cursor-pointer hover:bg-neutral-hover bg-neutral text-secondary py-2 px-4 rounded-xl text-sm font-semibold [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:bg-neutral-active [&[data-state=open]]:hover:bg-neutral-active-hover transition duration-300 ease-in-out'
          )}
        >
          {label}
          <ChevronDownIcon className="shrink-0 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content
          ref={contentRef}
          className="w-full overflow-hidden data-[state=open]:animate-slide-up data-[state=closed]:animate-slide-down"
        >
          <div className="w-full flex flex-col" ref={ref}>
            {children}
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}

export { Accordion };
