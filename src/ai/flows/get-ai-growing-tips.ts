'use server';
/**
 * @fileOverview An AI agent that provides growing tips for a specific crop.
 *
 * - getAiGrowingTips - A function that returns AI-powered growing tips for a given crop.
 * - GetAiGrowingTipsInput - The input type for the getAiGrowingTips function.
 * - GetAiGrowingTipsOutput - The return type for the getAiGrowingTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetAiGrowingTipsInputSchema = z.object({
  cropName: z.string().describe('The name of the crop to get growing tips for.'),
});
export type GetAiGrowingTipsInput = z.infer<typeof GetAiGrowingTipsInputSchema>;

const GetAiGrowingTipsOutputSchema = z.object({
  growingTips: z.string().describe('AI-powered tips for growing the specified crop.'),
});
export type GetAiGrowingTipsOutput = z.infer<typeof GetAiGrowingTipsOutputSchema>;

export async function getAiGrowingTips(input: GetAiGrowingTipsInput): Promise<GetAiGrowingTipsOutput> {
  return getAiGrowingTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getAiGrowingTipsPrompt',
  input: {schema: GetAiGrowingTipsInputSchema},
  output: {schema: GetAiGrowingTipsOutputSchema},
  prompt: `You are an expert agricultural advisor. Provide simple, weekly care instructions for a beginner growing {{{cropName}}}. Include tips on watering, sunlight, and common problems to watch for.  Format the output as a numbered list.  Limit the response to 5 tips.`,
});

const getAiGrowingTipsFlow = ai.defineFlow(
  {
    name: 'getAiGrowingTipsFlow',
    inputSchema: GetAiGrowingTipsInputSchema,
    outputSchema: GetAiGrowingTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
