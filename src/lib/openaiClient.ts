import OpenAI from 'openai';

// Support both Vite (import.meta.env) and Node.js/Express (process.env) environments
const getEnvVar = (viteKey: string, nodeKey: string): string | undefined => {
  // Node.js/Server environment (Express)
  if (typeof process !== 'undefined' && process.env) {
    if (process.env[nodeKey]) return process.env[nodeKey];
    if (process.env[viteKey]) return process.env[viteKey];
  }
  // Vite/Browser environment
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[viteKey];
  }
  return undefined;
};

const apiKey = getEnvVar('VITE_OPENAI_API_KEY', 'OPENAI_API_KEY');

if (!apiKey) {
  throw new Error(
    'Missing OpenAI API key. Please set VITE_OPENAI_API_KEY or OPENAI_API_KEY environment variable.'
  );
}

let openaiClient: OpenAI | null = null;

/**
 * Get a configured OpenAI client instance
 * Creates a singleton instance to reuse across requests
 */
export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: apiKey,
    });
  }
  return openaiClient;
}

