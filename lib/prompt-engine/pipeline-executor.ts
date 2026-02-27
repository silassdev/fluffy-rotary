import { ObjectId } from 'mongodb';
import { OpenAIEngine } from '../llm-engines/openai-engine';

export class PipelineExecutor {
  constructor(
    private promptModel: any,
    private benchmarkModel: any,
    private llmEngines: Record<string, any>
  ) {}

  async executeBenchmark(
    benchmarkRunId: ObjectId,
    promptId: ObjectId,
    datasetRows: any[],
    userApiKeys: Record<string, string>
  ): Promise<void> {
    try {
      // Fetch prompt template
      const prompt = await this.promptModel.findById(promptId);
      if (!prompt) throw new Error('Prompt not found');

      // Initialize LLM engine
      const apiKey = userApiKeys[prompt.model.split('-')[0].toLowerCase()];
      const engine = this.llmEngines[prompt.model];
      if (!engine) throw new Error(`Engine for ${prompt.model} not found`);

      // Process each row
      const results = [];
      for (let i = 0; i < datasetRows.length; i++) {
        const row = datasetRows[i];

        // Substitute variables
        const userPrompt = this.substituteVars(prompt.template.user, row);
        const systemPrompt = prompt.template.system;

        // Execute
        const { output, tokens, latency } = await engine.executePrompt(
          systemPrompt,
          userPrompt,
          prompt.template.params
        );

        // Calculate cost (example for OpenAI)
        const cost = this.calculateCost(tokens.prompt, tokens.completion);

        results.push({
          rowIndex: i,
          input: row,
          output,
          tokens,
          latency,
          cost,
          score: 0, // Manual or auto-score later
          feedback: '',
        });

        // Update progress
        await this.benchmarkModel.updateProgress(benchmarkRunId, i + 1, datasetRows.length);
      }

      // Save results
      await this.benchmarkModel.savResults(benchmarkRunId, results);
      await this.benchmarkModel.markCompleted(benchmarkRunId);
    } catch (error) {
      console.error('Benchmark execution error:', error);
      await this.benchmarkModel.markFailed(benchmarkRunId, error.message);
    }
  }

  private substituteVars(template: string, data: Record<string, any>): string {
    let result = template;
    Object.entries(data).forEach(([key, value]) => {
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
    });
    return result;
  }

  private calculateCost(promptTokens: number, completionTokens: number): number {
    // OpenAI GPT-4 pricing (as of 2026, adjust as needed)
    const inputCost = promptTokens * 0.00003; // $0.03 per 1k tokens
    const outputCost = completionTokens * 0.00006; // $0.06 per 1k tokens
    return inputCost + outputCost;
  }
}