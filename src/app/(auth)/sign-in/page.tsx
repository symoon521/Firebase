import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/logo";

export default function SignInPage() {
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
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">로그인</Button>
        </form>
        <div className="my-4 flex items-center">
          <Separator className="flex-grow"/>
          <span className="mx-2 text-xs text-muted-foreground">또는</span>
          <Separator className="flex-grow"/>
        </div>
        <Button variant="outline" className="w-full">
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
