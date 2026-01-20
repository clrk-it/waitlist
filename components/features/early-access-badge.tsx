import { Badge } from "@/components/ui/badge";

export function EarlyAccessBadge() {
  return (
    <div className="flex items-center justify-center mb-6">
      <Badge
        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border-0"
        style={{ 
          backgroundColor: "#fbbf24",
          color: "#09090b"
        }}
      >
        Early Access
      </Badge>
    </div>
  );
}
