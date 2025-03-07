import { Badge } from "@/components/ui/badge";

const StatusBadge = ({ status }) => {
  const statusClasses = {
    Cancelled: "bg-red-500 text-white",
    Pending: "bg-primary text-white",
    Success: "bg-green-500 text-white",
  };

  return <Badge className={`${statusClasses[status]}`}>{status}</Badge>;
};

export default StatusBadge;
