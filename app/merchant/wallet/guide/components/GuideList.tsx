import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { guideItems } from "@/data/wallet/merchantGuideContents";

export default function GuideAccordion() {
  return (
    <Accordion type="single" collapsible className="mb-6">
      {guideItems.map(({ value, icon: Icon, title, content }) => (
        <AccordionItem
          key={value}
          value={value}
          className="border-b border-[#E0E0E0]"
        >
          <AccordionTrigger className="py-4 text-[#1A1A1A]">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#FFB020]/20 flex items-center justify-center mr-3">
                <Icon className="h-4 w-4 text-[#FFB020]" />
              </div>
              <span>{title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-11 text-sm text-[#666666] leading-relaxed">
            <div
              dangerouslySetInnerHTML={{
                __html: content.replace(/\n/g, "<br />"),
              }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
