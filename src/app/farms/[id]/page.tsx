import { farms } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Sprout, AreaChart, Video, Info } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

export default function FarmDetailPage({ params }: { params: { id: string } }) {
  const farm = farms.find(f => f.id === params.id);

  if (!farm) {
    notFound();
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
                objectFit="cover"
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
                    Smart Farm
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
                    <span className="font-semibold">Available Area:</span>
                    <p className="text-muted-foreground">{farm.availableArea} sq. meters</p>
                  </div>
                </div>
                 <div className="flex items-center gap-3">
                  <Info className="w-8 h-8 text-primary"/>
                  <div>
                    <span className="font-semibold">Address:</span>
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
                  <Video className="text-primary"/> Live Stream
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
                <Sprout className="text-primary"/> Available Crops
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {farm.availableCrops.map(crop => (
                <div key={crop} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <span className="font-medium">{crop}</span>
                  <Button size="sm">Start Growing</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
