import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export function ProductActions() {
  return (
    <div className="space-y-4">
      <Button className="w-full bg-[#000000] text-white text-xl border border-[#FFFFFF] hover:bg-[#CCCCCC] hover:text-black transition-colors">
        ADD TO CART
      </Button>
      <Button className="w-full bg-[#00FF00] text-black text-xl border border-[#000000] hover:bg-[#00FF00] hover:border-[#FFFFFF] transition-colors">
        BUY IT NOW
      </Button>
      <Button
        variant="ghost"
        className="w-full bg-[#000000] text-white text-xl border border-[#FFFFFF] hover:text-black hover:bg-[#1DA1F2] transition-colors"
      >
        <Share2 className="w-4 h-4 mr-2" />
        SHARE IT
      </Button>
    </div>
  );
}
