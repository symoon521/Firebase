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
          <CardTitle className="text-3xl font-headline">Register Your Farm</CardTitle>
          <CardDescription>Share your farm with the world. Fill out the details below to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="farmName">Farm Name</Label>
              <Input id="farmName" placeholder="e.g., Green Valley Organics" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., California, USA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input id="address" placeholder="e.g., 123 Green Valley Rd, Napa, CA" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Tell us about your farm..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <Label htmlFor="availableCrops">Available Crops (comma-separated)</Label>
                <Input id="availableCrops" placeholder="e.g., Tomato, Lettuce, Carrot" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availableArea">Available Area (sq. meters)</Label>
                <Input id="availableArea" type="number" placeholder="e.g., 50" />
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="farmImages">Farm Image URL</Label>
              <Input id="farmImages" placeholder="https://example.com/farm.jpg" />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="isSmartFarm" />
              <Label htmlFor="isSmartFarm" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                This is a Smart Farm
              </Label>
            </div>
             <div className="space-y-2">
              <Label htmlFor="liveStreamUrl">Live Stream URL (if Smart Farm)</Label>
              <Input id="liveStreamUrl" placeholder="https://youtube.com/live/..." />
            </div>
            <Button type="submit" className="w-full" size="lg">Register Farm</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
