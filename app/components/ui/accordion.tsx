"use client";

import { Accordion } from "@base-ui/react/accordion";

const accordionRoot =
  "w-full divide-y divide-neutral-200 dark:divide-neutral-800";

const accordionItem = "";

const accordionHeader = "flex w-full list-none outline-none";

const accordionTrigger =
  "flex flex-1 cursor-pointer items-center justify-between gap-4 py-5 text-left text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:pointer-events-none dark:text-white dark:hover:text-neutral-300 dark:focus-visible:outline-neutral-500 [&[data-open]]:text-neutral-600 dark:[&[data-open]]:text-neutral-300";

const accordionPanel =
  "overflow-hidden text-sm text-neutral-600 transition-all duration-200 ease-out dark:text-neutral-400";

const accordionChevron =
  "size-4 shrink-0 transition-transform duration-200 [.trigger[data-open]_&]:rotate-180";

export function AccordionRoot({
  className = "",
  ...props
}: Accordion.Root.Props) {
  return (
    <Accordion.Root
      className={`${accordionRoot} ${className}`}
      {...props}
    />
  );
}

export function AccordionItem({
  className = "",
  ...props
}: Accordion.Item.Props) {
  return <Accordion.Item className={accordionItem} {...props} />;
}

export function AccordionHeader({
  className = "",
  ...props
}: Accordion.Header.Props) {
  return (
    <Accordion.Header className={`${accordionHeader} ${className}`} {...props} />
  );
}

export function AccordionTrigger({
  className = "",
  children,
  ...props
}: Accordion.Trigger.Props) {
  return (
    <Accordion.Trigger
      className={`trigger ${accordionTrigger} ${className}`}
      {...props}
    >
      {children}
      <svg
        className={accordionChevron}
        fill="none"
        strokeWidth={1.5}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </Accordion.Trigger>
  );
}

export function AccordionPanel({
  className = "",
  ...props
}: Accordion.Panel.Props) {
  return (
    <Accordion.Panel
      className={`pb-5 pt-0 ${accordionPanel} ${className}`}
      {...props}
    />
  );
}
