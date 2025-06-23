import Link from "next/link";
import { Button } from "@/components/ui/button";
import FarmCard from "@/components/farm-card";
import { farms } from "@/lib/mock-data";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredFarms = farms.slice(0, 3);

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-card py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8 shadow-2xl">
            <Image
              src="https://placehold.co/1200x400.png"
              alt="A lush green farm"
              layout="fill"
              objectFit="cover"
              className="z-0"
              data-ai-hint="lush farm"
            />
            <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-headline animate-fade-in-down">
                스마트셰어 팜에 오신 것을 환영합니다
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl animate-fade-in-up animation-delay-200">
                땅과 연결되고, 직접 식량을 키우며, 농업의 미래를 경험하세요.
              </p>
              <Button asChild size="lg" className="animate-fade-in-up animation-delay-400">
                <Link href="/farms">
                  농장 둘러보기 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 font-headline">추천 농장</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFarms.map((farm, index) => (
               <div key={farm.id} className={`animate-fade-in-up animation-delay-${index * 200}`}>
                <FarmCard farm={farm} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
