import { Card } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="m-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="h-60"></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
};

export default DashboardPage;
