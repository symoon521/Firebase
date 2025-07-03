'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn, googleSignIn } from '@/lib/firebase/auth';
import { useAuth } from '@/context/auth-context';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await signIn(values.email, values.password);
      // Mock user info based on email for demonstration
      let role = 'customer';
      if (values.email === "farm@test.com") {
        role = 'farmOwner';
      }
      login({ uid: "mock-user-" + Date.now(), email: values.email, displayName: values.email.split('@')[0] }, { displayName: values.email.split('@')[0], role: role });
      toast({ title: "성공", description: "로그인되었습니다. 대시보드로 이동합니다." });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "오류", description: "이메일 또는 비밀번호가 잘못되었습니다." });
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
        <CardTitle className="text-2xl font-headline">다시 오신 것을 환영합니다</CardTitle>
        <CardDescription>농장 대시보드에 접근하려면 로그인하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              로그인
            </Button>
          </form>
        </Form>
        <div className="my-4 flex items-center">
          <Separator className="flex-grow"/>
          <span className="mx-2 text-xs text-muted-foreground">또는</span>
          <Separator className="flex-grow"/>
        </div>
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
          Google로 로그인
        </Button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          계정이 없으신가요?{' '}
          <Link href="/sign-up" className="font-semibold text-primary hover:underline">
            가입하기
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
