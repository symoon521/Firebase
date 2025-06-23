import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Video } from "lucide-react";
import type { Farm } from "@/lib/mock-data";

interface FarmCardProps {
  farm: Farm;
}

export default function FarmCard({ farm }: FarmCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={farm.farmImages[0]}
            alt={`Image of ${farm.farmName}`}
            layout="fill"
            objectFit="cover"
            data-ai-hint="farm landscape"
          />
          {farm.isSmartFarm && (
            <Badge variant="destructive" className="absolute top-2 right-2 bg-accent text-accent-foreground">
              <Video className="w-4 h-4 mr-2"/>
              Smart Farm
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl mb-2">{farm.farmName}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          {farm.location}
        </CardDescription>
        <p className="text-sm text-foreground mb-4 line-clamp-3">
          {farm.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {farm.availableCrops.slice(0, 4).map(crop => (
            <Badge key={crop} variant="secondary">{crop}</Badge>
          ))}
          {farm.availableCrops.length > 4 && (
            <Badge variant="secondary">+{farm.availableCrops.length - 4} more</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/farms/${farm.id}`}>
            View Farm <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
