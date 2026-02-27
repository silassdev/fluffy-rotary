export class TemplateProcessor {
  /**
   * Substitute variables in a prompt template
   * e.g., "Write about {topic}" with { topic: "AI" } → "Write about AI"
   */
  static substituteVariables(
    template: string,
    variables: Record<string, string>
  ): string {
    let result = template;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      result = result.replace(regex, value);
    });
    return result;
  }

  /**
   * Extract variables from a template string
   * e.g., "Write about {topic} in {style}" → ["topic", "style"]
   */
  static extractVariables(template: string): string[] {
    const matches = template.match(/\{(\w+)\}/g);
    if (!matches) return [];
    return [...new Set(matches.map((m) => m.slice(1, -1)))];
  }

  /**
   * Build complete prompt with system message, user input, and variables
   */
  static buildPrompt(
    systemMsg: string,
    userTemplate: string,
    variables: Record<string, string>
  ): { system: string; user: string } {
    return {
      system: this.substituteVariables(systemMsg, variables),
      user: this.substituteVariables(userTemplate, variables),
    };
  }
}