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
        <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
        <CardDescription>Sign in to access your farm dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <div className="my-4 flex items-center">
          <Separator className="flex-grow"/>
          <span className="mx-2 text-xs text-muted-foreground">OR</span>
          <Separator className="flex-grow"/>
        </div>
        <Button variant="outline" className="w-full">
          Sign In with Google
        </Button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/auth/sign-up" className="font-semibold text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
