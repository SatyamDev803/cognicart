import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCard({ title, value, icon: Icon }) {
  return (
    <Card className="p-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
        {/* Adjusted title to be more standard font-medium and text-sm for consistency */}
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle> 
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />} {/* Slightly smaller icon for balance */}
      </CardHeader>
      <CardContent className="p-0 pt-2"> {/* Added pt-2 for spacing between title and value */}
        <div className="text-2xl font-bold">{value}</div> {/* Slightly smaller for better fit, still prominent */}
      </CardContent>
    </Card>
  );
}