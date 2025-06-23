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
        <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
        <CardDescription>Join SmartShare Farms today.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Full Name</Label>
            <Input id="displayName" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-3">
            <Label>I am a...</Label>
            <RadioGroup defaultValue="customer" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="customer" id="customer" />
                <Label htmlFor="customer">Customer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="farmOwner" id="farmOwner" />
                <Label htmlFor="farmOwner">Farm Owner</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full">Create Account</Button>
        </form>
        <div className="my-4 flex items-center">
          <Separator className="flex-grow"/>
          <span className="mx-2 text-xs text-muted-foreground">OR</span>
          <Separator className="flex-grow"/>
        </div>
        <Button variant="outline" className="w-full">
          Sign Up with Google
        </Button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="font-semibold text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
