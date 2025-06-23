import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sprout } from 'lucide-react';

export default function RegisterFarmPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <div className="inline-block bg-primary/10 p-4 rounded-full mx-auto mb-4">
            <Sprout className="w-10 h-10 text-primary"/>
          </div>
          <CardTitle className="text-3xl font-headline">농장 등록하기</CardTitle>
          <CardDescription>당신의 농장을 세상과 공유하세요. 아래 세부 정보를 입력하여 시작하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="farmName">농장 이름</Label>
              <Input id="farmName" placeholder="예: 그린 밸리 유기농" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">위치</Label>
                <Input id="location" placeholder="예: 캘리포니아, 미국" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">전체 주소</Label>
                <Input id="address" placeholder="예: 123 Green Valley Rd, Napa, CA" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea id="description" placeholder="농장에 대해 알려주세요..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <Label htmlFor="availableCrops">재배 가능 작물 (쉼표로 구분)</Label>
                <Input id="availableCrops" placeholder="예: 토마토, 상추, 당근" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availableArea">사용 가능 면적 (제곱미터)</Label>
                <Input id="availableArea" type="number" placeholder="예: 50" />
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="farmImages">농장 이미지 URL</Label>
              <Input id="farmImages" placeholder="https://example.com/farm.jpg" />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="isSmartFarm" />
              <Label htmlFor="isSmartFarm" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                스마트 팜입니다
              </Label>
            </div>
             <div className="space-y-2">
              <Label htmlFor="liveStreamUrl">실시간 스트림 URL (스마트 팜인 경우)</Label>
              <Input id="liveStreamUrl" placeholder="https://youtube.com/live/..." />
            </div>
            <Button type="submit" className="w-full" size="lg">농장 등록</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
