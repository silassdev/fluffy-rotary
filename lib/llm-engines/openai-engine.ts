import OpenAI from 'openai';

export class OpenAIEngine {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async executePrompt(
    system: string,
    user: string,
    params: {
      temperature: number;
      maxTokens: number;
      topP: number;
      model: string;
    }
  ): Promise<{
    output: string;
    tokens: { prompt: number; completion: number };
    latency: number;
  }> {
    const startTime = Date.now();

    try {
      const response = await this.client.chat.completions.create({
        model: params.model,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        temperature: params.temperature,
        max_tokens: params.maxTokens,
        top_p: params.topP,
      });

      const latency = Date.now() - startTime;
      const output = response.choices[0].message.content || '';
      const tokens = {
        prompt: response.usage?.prompt_tokens || 0,
        completion: response.usage?.completion_tokens || 0,
      };

      return { output, tokens, latency };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }

  async listModels(): Promise<string[]> {
    const models = await this.client.models.list();
    return models.data.map((m) => m.id).filter((id) => id.includes('gpt'));
  }
}