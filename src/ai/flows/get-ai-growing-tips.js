'use server';
/**
 * @fileOverview 특정 작물에 대한 재배 팁을 제공하는 AI 에이전트입니다.
 *
 * - getAiGrowingTips - 주어진 작물에 대한 AI 기반 재배 팁을 반환하는 함수입니다.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetAiGrowingTipsInputSchema = z.object({
  cropName: z.string().describe('재배 팁을 얻을 작물의 이름입니다.'),
});

const GetAiGrowingTipsOutputSchema = z.object({
  growingTips: z.string().describe('지정된 작물 재배를 위한 AI 기반 팁입니다.'),
});

export async function getAiGrowingTips(input) {
  return getAiGrowingTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getAiGrowingTipsPrompt',
  input: {schema: GetAiGrowingTipsInputSchema},
  output: {schema: GetAiGrowingTipsOutputSchema},
  prompt: `당신은 전문 농업 고문입니다. {{{cropName}}}를 재배하는 초보자를 위해 간단한 주간 관리 지침을 제공해주세요. 물주기, 햇빛, 그리고 주의해야 할 일반적인 문제에 대한 팁을 포함해주세요. 응답은 번호 목록 형식으로 작성하고, 5가지 팁으로 제한해주세요.`,
});

const getAiGrowingTipsFlow = ai.defineFlow(
  {
    name: 'getAiGrowingTipsFlow',
    inputSchema: GetAiGrowingTipsInputSchema,
    outputSchema: GetAiGrowingTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);
