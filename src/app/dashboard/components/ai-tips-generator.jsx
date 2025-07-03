'use client';

import { useState } from 'react';
import { getAiGrowingTips } from '@/ai/flows/get-ai-growing-tips';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AiTipsGenerator({ cropName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tips, setTips] = useState(null);
  const [error, setError] = useState(null);

  const handleGetTips = async () => {
    setIsLoading(true);
    setError(null);
    setTips(null);
    setIsOpen(true);
    try {
      const result = await getAiGrowingTips({ cropName });
      setTips(result);
    } catch (err) {
      setError('AI 팁을 가져오는데 실패했습니다. 나중에 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const formattedTips = tips?.growingTips.split('\n').map(line => line.replace(/^\d+\.\s*/, '')).filter(line => line.trim() !== '');

  return (
    <>
      <Button onClick={handleGetTips} disabled={isLoading} variant="outline">
        <Wand2 className="mr-2 h-4 w-4" />
        AI 재배 팁 받기
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-headline">
              <Wand2 className="text-primary"/> {cropName} 재배를 위한 AI 팁
            </DialogTitle>
            <DialogDescription>
              최고의 수확을 위한 AI 기반 팁입니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {isLoading && (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4">팁 생성 중...</p>
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>오류</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {formattedTips && (
              <ul className="space-y-3 list-disc list-inside text-sm">
                {formattedTips.map((tip, index) => (
                  <li key={index} className="pl-2">{tip}</li>
                ))}
              </ul>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>닫기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
