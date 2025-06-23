'use client';

import { useState } from 'react';
import { getAiGrowingTips, type GetAiGrowingTipsOutput } from '@/ai/flows/get-ai-growing-tips';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AiTipsGeneratorProps {
  cropName: string;
}

export default function AiTipsGenerator({ cropName }: AiTipsGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tips, setTips] = useState<GetAiGrowingTipsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetTips = async () => {
    setIsLoading(true);
    setError(null);
    setTips(null);
    setIsOpen(true);
    try {
      const result = await getAiGrowingTips({ cropName });
      setTips(result);
    } catch (err) {
      setError('Failed to get AI tips. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const formattedTips = tips?.growingTips.split('\n').map(line => line.replace(/^\d+\.\s*/, '')).filter(line => line.trim() !== '');

  return (
    <>
      <Button onClick={handleGetTips} disabled={isLoading} variant="outline">
        <Wand2 className="mr-2 h-4 w-4" />
        Get AI Growing Tips
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-headline">
              <Wand2 className="text-primary"/> AI Tips for Growing {cropName}
            </DialogTitle>
            <DialogDescription>
              Here are some AI-powered tips to help you get the best harvest.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {isLoading && (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4">Generating tips...</p>
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
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
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
