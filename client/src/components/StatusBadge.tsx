import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: 'low' | 'medium' | 'high';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    low: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
    high: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100",
  };

  const labels = {
    low: "Low Capacity",
    medium: "Moderate Capacity",
    high: "High Capacity",
  };

  return (
    <Badge variant="outline" className={`${styles[status]} border shadow-sm`}>
      {labels[status]}
    </Badge>
  );
}
