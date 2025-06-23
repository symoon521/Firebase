import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/logo";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignUpPage() {
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
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">이름</Label>
            <Input id="displayName" placeholder="홍길동" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-3">
            <Label>가입 유형</Label>
            <RadioGroup defaultValue="customer" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="customer" id="customer" />
                <Label htmlFor="customer">고객</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="farmOwner" id="farmOwner" />
                <Label htmlFor="farmOwner">농장주</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full">계정 만들기</Button>
        </form>
        <div className="my-4 flex items-center">
          <Separator className="flex-grow"/>
          <span className="mx-2 text-xs text-muted-foreground">또는</span>
          <Separator className="flex-grow"/>
        </div>
        <Button variant="outline" className="w-full">
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
