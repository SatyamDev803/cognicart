import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCard({ title, value, icon: Icon }) {
  return (
    <Card className="p-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle> 
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />} 
      </CardHeader>
      <CardContent className="p-0 pt-2"> 
        <div className="text-2xl font-bold">{value}</div> 
      </CardContent>
    </Card>
  );
}