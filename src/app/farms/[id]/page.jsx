'use client';

import { useState, useEffect } from 'react';
// import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import { db } from '@/lib/firebase/config';
import { useAuth } from '@/context/auth-context';
import { useRouter, notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Sprout, AreaChart, Video, Info, Loader2 } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { farms as mockFarms, userCrops as mockUserCrops } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function FarmDetailPage({ params }) {
  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(false); // Always false for mock
  const [isStartingCrop, setIsStartingCrop] = useState(null);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Use mock data directly
    const foundFarm = mockFarms.find(f => f.id === params.id);
    if (foundFarm) {
      setFarm(foundFarm);
    } else {
      notFound();
    }
  }, [params.id]);

  const handleStartGrowing = async (cropName) => {
    if (!user) {
      toast({ variant: 'destructive', title: '로그인 필요', description: '작물 재배를 시작하려면 먼저 로그인해주세요.' });
      router.push('/sign-in');
      return;
    }

    if (!farm) return;

    setIsStartingCrop(cropName);
    try {
      // Simulate adding to mock userCrops
      await new Promise(resolve => setTimeout(resolve, 1000));
      const startDate = new Date();
      const estimatedHarvestDate = new Date();
      estimatedHarvestDate.setDate(startDate.getDate() + 60); // Default 60 days for harvest

      const newUserCrop = {
        id: `usercrop-${mockUserCrops.length + 1}`,
        userId: user.uid,
        farmId: farm.id,
        farmName: farm.farmName,
        cropName: cropName,
        startDate: startDate,
        estimatedHarvestDate: estimatedHarvestDate,
        status: 'planting',
        growthLog: [
          { timestamp: new Date(), event: '재배를 시작했습니다.' }
        ],
        tagId: `${farm.farmName.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 100)}-${cropName.substring(0, 3).toUpperCase()}`
      };
      mockUserCrops.push(newUserCrop); // Add to mock data array

      toast({ title: '재배 시작!', description: `${cropName} 재배가 시작되었습니다. 대시보드에서 확인하세요.` });
      router.push('/dashboard');

    } catch (error) {
      console.error("Error starting crop:", error);
      toast({ variant: 'destructive', title: '오류', description: '작물 재배 시작 중 오류가 발생했습니다.' });
    } finally {
      setIsStartingCrop(null);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">농장 정보를 불러오는 중...</div>;
  }

  if (!farm) {
    return <div className="container mx-auto px-4 py-8 text-center">농장을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={farm.farmImages[0]}
                alt={`Image of ${farm.farmName}`}
                layout="fill"
                style={{ objectFit: 'cover' }}
                data-ai-hint="farm landscape"
              />
            </div>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-4xl font-bold font-headline mb-2">{farm.farmName}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <p>{farm.location}</p>
                  </div>
                </div>
                {farm.isSmartFarm && (
                  <Badge variant="destructive" className="mt-2 md:mt-0 bg-accent text-accent-foreground py-2 px-4 rounded-full text-sm">
                    <Video className="w-4 h-4 mr-2"/>
                    스마트 팜
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{farm.description}</p>
              <Separator className="my-6"/>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <AreaChart className="w-8 h-8 text-primary"/>
                  <div>
                    <span className="font-semibold">사용 가능 면적:</span>
                    <p className="text-muted-foreground">{farm.availableArea} 제곱미터</p>
                  </div>
                </div>
                 <div className="flex items-center gap-3">
                  <Info className="w-8 h-8 text-primary"/>
                  <div>
                    <span className="font-semibold">주소:</span>
                    <p className="text-muted-foreground">{farm.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {farm.isSmartFarm && farm.liveStreamUrl && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <Video className="text-primary"/> 실시간 스트림
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full rounded-lg overflow-hidden border shadow-inner">
                   <iframe
                      className="w-full h-full"
                      src={farm.liveStreamUrl}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Sprout className="text-primary"/> 재배 가능 작물
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {farm.availableCrops.map(crop => (
                <div key={crop} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <span className="font-medium">{crop}</span>
                  <Button size="sm" onClick={() => handleStartGrowing(crop)} disabled={isStartingCrop === crop}>
                    {isStartingCrop === crop && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    재배 시작하기
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
