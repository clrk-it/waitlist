import { Badge } from "@/components/ui/badge";

export default function EarlyAccessCard() {
  return (
    <div className={`flex items-center justify-center mb-2`}>
      <Badge
        className={`inline-flex items-center rounded-full border border-white/10
       bg-white/5 px-3 py-1 text-xs font-medium text-white
       backdrop-blur-lg shadow-2xl select-none whitespace-nowrap`}
      >
        Early Access — Be First
      </Badge>
    </div>
  );
}
