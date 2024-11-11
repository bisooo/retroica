import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductDetailsProps {
  details: { [key: string]: string };
  specs: { [key: string]: string };
}

const specEmojis: { [key: string]: string } = {
  "short-description": "📷",
  "short-specs": "💥",
  Lens: "🔍",
  "Focal Length": "📏",
  "Shutter Speed": "⏱️",
  "ISO Range": "🔆",
  storage: "💾",
  condition: "👀",
  battery: "🔋",
  Weight: "⚖️",
  Dimensions: "📐",
  testing: "⚙️",
  delivery: "🚚",
};

export function ProductDetails({ details, specs }: ProductDetailsProps) {
  return (
    <Accordion type="single" defaultValue="details" className="w-full">
      <AccordionItem value="details" className="border-[#CCCCCC]">
        <AccordionTrigger className="hover:text-[#00FF00]">
          DETAILS
        </AccordionTrigger>
        <AccordionContent>
          <dl className="space-y-2">
            {Object.entries(details).map(([key, value]) => (
              <div key={key} className="grid text-sm">
                <dt className="font-semibold">
                  {specEmojis[key] || "🔧"} {value}
                </dt>
              </div>
            ))}
          </dl>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="specs" className="border-[#CCCCCC]">
        <AccordionTrigger className="hover:text-[#00FF00]">
          SPECIFICATIONS
        </AccordionTrigger>
        <AccordionContent>
          <dl className="space-y-2">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 text-sm">
                <dt className="font-semibold">
                  {specEmojis[key] || "🔧"} {key}:
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping" className="border-[#CCCCCC]">
        <AccordionTrigger className="hover:text-[#00FF00]">
          SHIPPING
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-sm">
            🌍 Free worldwide shipping on orders over $1000.
          </p>
          <p className="text-sm">📦 Ships within 3-5 business days.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
