import { userCrops } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import GrowthLog from "./components/growth-log";
import AiTipsGenerator from "./components/ai-tips-generator";
import { CalendarDays, Sprout, Tag } from "lucide-react";

export default function DashboardPage() {
  const getStatusText = (status: string) => {
    switch (status) {
      case "planting":
        return "파종";
      case "growing":
        return "성장 중";
      case "ready_for_harvest":
        return "수확 준비";
      case "harvested":
        return "수확 완료";
      default:
        return status;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "planting":
        return "secondary";
      case "growing":
        return "default";
      case "ready_for_harvest":
        return "destructive";
      case "harvested":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">내 대시보드</h1>
        <p className="text-lg text-muted-foreground mt-2">작물을 추적하고 자라는 모습을 지켜보세요.</p>
      </div>

      <div className="space-y-8">
        {userCrops.map((crop) => (
          <Card key={crop.id} className="shadow-lg">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle className="text-2xl font-headline flex items-center gap-2">
                    <Sprout className="text-primary"/> {crop.cropName}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    <span className="font-semibold text-primary">{crop.farmName}</span>에서
                  </CardDescription>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-2">
                   <Badge variant={getStatusBadgeVariant(crop.status)} className="py-1 px-3 text-sm">
                    {getStatusText(crop.status)}
                  </Badge>
                  <Badge variant="secondary" className="font-mono">
                    <Tag className="w-4 h-4 mr-2"/>
                    {crop.tagId}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-6" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-lg">작물 정보</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="w-5 h-5 text-muted-foreground"/>
                      <div>
                        <strong>시작일:</strong> {crop.startDate.toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CalendarDays className="w-5 h-5 text-muted-foreground"/>
                      <div>
                        <strong>예상 수확일:</strong> {crop.estimatedHarvestDate.toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <AiTipsGenerator cropName={crop.cropName} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-lg">성장 기록</h3>
                  <GrowthLog log={crop.growthLog} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
