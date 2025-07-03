'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// import { db, storage } from '@/lib/firebase/config';
// import { addDoc, collection } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/context/auth-context';
import { farms } from '@/lib/mock-data'; // Mock data import

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sprout, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  farmName: z.string().min(2, "농장 이름은 2자 이상이어야 합니다."),
  location: z.string().min(2, "위치를 입력해주세요."),
  address: z.string().min(5, "전체 주소를 입력해주세요."),
  description: z.string().min(10, "설명은 10자 이상이어야 합니다."),
  availableCrops: z.string().min(2, "재배 가능 작물을 하나 이상 입력해주세요."),
  availableArea: z.coerce.number().min(1, "사용 가능 면적을 입력해주세요."),
  farmImage: z.instanceof(File).refine(file => file.size > 0, "농장 이미지를 업로드해주세요."),
  isSmartFarm: z.boolean().default(false),
  liveStreamUrl: z.string().optional(),
}).refine(data => !data.isSmartFarm || (data.isSmartFarm && data.liveStreamUrl && z.string().url().safeParse(data.liveStreamUrl).success), {
  message: "스마트 팜인 경우 유효한 URL을 입력해야 합니다.",
  path: ["liveStreamUrl"],
});

export default function RegisterFarmPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, userInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmName: "",
      location: "",
      address: "",
      description: "",
      availableCrops: "",
      availableArea: 0,
      isSmartFarm: false,
      liveStreamUrl: "",
    },
  });

  const onSubmit = async (values) => {
    if (!user || userInfo?.role !== 'farmOwner') {
      toast({ variant: "destructive", title: "오류", description: "농장주만 농장을 등록할 수 있습니다." });
      return;
    }
    setIsLoading(true);
    try {
      // Simulate image upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      const imageUrl = "https://placehold.co/600x400.png?text=Mock+Farm"; // Mock image URL

      // Simulate adding farm data to mock data
      const newFarm = {
        id: `farm-${farms.length + 1}`,
        ownerId: user.uid,
        farmName: values.farmName,
        location: values.location,
        address: values.address,
        description: values.description,
        availableCrops: values.availableCrops.split(',').map(s => s.trim()),
        availableArea: values.availableArea,
        farmImages: [imageUrl],
        isSmartFarm: values.isSmartFarm,
        liveStreamUrl: values.liveStreamUrl || "",
        createdAt: new Date(),
      };
      farms.push(newFarm); // Add to mock data array

      toast({ title: "성공", description: "농장이 성공적으로 등록되었습니다." });
      router.push('/farms');

    } catch (error) {
      console.error("Error registering farm:", error);
      toast({ variant: "destructive", title: "오류", description: "농장 등록 중 오류가 발생했습니다." });
    } finally {
      setIsLoading(false);
    }
  };

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="farmName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>농장 이름</FormLabel>
                    <FormControl><Input placeholder="예: 그린 밸리 유기농" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>위치</FormLabel>
                      <FormControl><Input placeholder="예: 경기도 양평" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>전체 주소</FormLabel>
                      <FormControl><Input placeholder="예: 경기도 양평군 용문면" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>설명</FormLabel>
                    <FormControl><Textarea placeholder="농장에 대해 알려주세요..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="availableCrops"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>재배 가능 작물 (쉼표로 구분)</FormLabel>
                      <FormControl><Input placeholder="예: 토마토, 상추, 당근" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availableArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>사용 가능 면적 (제곱미터)</FormLabel>
                      <FormControl><Input type="number" placeholder="예: 50" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="farmImage"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>농장 대표 이미지</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0])} {...rest} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isSmartFarm"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>스마트 팜</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        이것이 IoT 센서 및 자동화 시스템을 갖춘 스마트 팜인지 체크하세요.
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              {form.watch("isSmartFarm") && (
                <FormField
                  control={form.control}
                  name="liveStreamUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>라이브 스트림 URL (선택사항)</FormLabel>
                      <FormControl><Input placeholder="예: https://youtube.com/..." {...field} /></FormControl>
                      <p className="text-sm text-muted-foreground">농장의 라이브 스트림 URL을 입력하세요.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                농장 등록하기
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
