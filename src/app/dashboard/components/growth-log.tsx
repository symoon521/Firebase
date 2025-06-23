'use client';

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { UserCrop } from "@/lib/mock-data";
import { CheckCircle2 } from "lucide-react";

interface GrowthLogProps {
  log: UserCrop['growthLog'];
}

const newEvents = [
  "일조량 최적.",
  "토양 수분 확인: 65%.",
  "잎 건강 분석 결과 양호.",
  "자동 해충 스캔 완료."
];

export default function GrowthLog({ log }: GrowthLogProps) {
  const [currentLog, setCurrentLog] = useState(log);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLog(prevLog => {
        if (prevLog.length > 10) return prevLog; // Cap log length for demo
        const newEvent = {
          timestamp: new Date(),
          event: newEvents[Math.floor(Math.random() * newEvents.length)]
        };
        return [...prevLog, newEvent];
      });
    }, 5000); // Add a new log entry every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-secondary/50">
      <ScrollArea className="h-64">
        <CardContent className="p-4 space-y-4">
          {currentLog.map((entry, index) => (
            <div 
              key={index} 
              className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: `${index < log.length ? 0 : 100}ms` }}
            >
              <div className="pt-1">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{entry.event}</p>
                <p className="text-xs text-muted-foreground">
                  {entry.timestamp.toLocaleString('ko-KR')}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
