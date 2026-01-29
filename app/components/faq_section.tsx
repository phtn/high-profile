import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
} from "./ui/accordion";

const FAQ_ITEMS = [
  {
    value: "what",
    question: "What is High Profile?",
    answer:
      "High Profile is a crypto payment gateway. Merchants integrate once to accept Bitcoin, Ethereum, and stablecoins, with optional instant conversion to fiat and transparent fees.",
  },
  {
    value: "how-buy",
    question: "How do I accept crypto payments?",
    answer:
      "Create an account, verify your business, and integrate our API or SDK. We provide webhooks for payment events and a sandbox for testing. Go live when you're ready.",
  },
  {
    value: "where",
    question: "Where is High Profile available?",
    answer:
      "High Profile is available to businesses in supported jurisdictions. Check our documentation for the latest list of supported countries and compliance requirements.",
  },
  {
    value: "fees",
    question: "What are the fees?",
    answer:
      "We charge a transparent percentage per transaction, with no hidden fees. Volume discounts apply. See our pricing page for current rates.",
  },
] as const;

export function FaqSection() {
  return (
    <section
      id="faq"
      className="border-t border-neutral-200 bg-neutral-50/50 px-4 py-20 dark:border-neutral-800 dark:bg-neutral-900/30 sm:px-6 sm:py-28 lg:px-8"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-2xl">
        <h2
          id="faq-heading"
          className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-3xl"
        >
          Questions? We've got answers.
        </h2>
        <AccordionRoot className="mt-10">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionHeader>
                <AccordionTrigger>{item.question}</AccordionTrigger>
              </AccordionHeader>
              <AccordionPanel>{item.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </div>
    </section>
  );
}
