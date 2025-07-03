'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signUp, googleSignIn } from '@/lib/firebase/auth';
import { useAuth } from '@/context/auth-context';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  displayName: z.string().min(1, { message: "이름을 입력해주세요." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z.string().min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
  role: z.enum(["customer", "farmOwner"]),
});

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      role: "customer",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const newUser = await signUp(values.email, values.password, values.displayName, values.role);
      login({ uid: newUser.uid, email: newUser.email, displayName: newUser.displayName }, { displayName: newUser.displayName, role: values.role });
      toast({ title: "성공", description: "회원가입이 완료되었습니다. 대시보드로 이동합니다." });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "오류", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      login({ uid: result.user.uid, email: result.user.email, displayName: result.user.displayName }, { displayName: result.user.displayName, role: 'customer' });
      toast({ title: "성공", description: "Google 계정으로 로그인되었습니다." });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "오류", description: error.message });
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mb-4">
           <Link href="/"><Logo /></Link>
        </div>
        <CardTitle className="text-2xl font-headline">계정 생성</CardTitle>
        <CardDescription>지금 스마트셰어 팜에 가입하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="홍길동" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>가입 유형</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="customer" id="customer" />
                        </FormControl>
                        <FormLabel htmlFor="customer" className="font-normal">고객</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="farmOwner" id="farmOwner" />
                        </FormControl>
                        <FormLabel htmlFor="farmOwner" className="font-normal">농장주</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              계정 만들기
            </Button>
          </form>
        </Form>
        <div className="my-4 flex items-center">
          <Separator className="flex-grow"/>
          <span className="mx-2 text-xs text-muted-foreground">또는</span>
          <Separator className="flex-grow"/>
        </div>
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
          Google로 가입
        </Button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{' '}
          <Link href="/sign-in" className="font-semibold text-primary hover:underline">
            로그인
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}



    

