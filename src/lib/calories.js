const Anthropic = require('@anthropic-ai/sdk');
const { z } = require('zod');
const { zodOutputFormat } = require('@anthropic-ai/sdk/helpers/zod');

const CalorieEstimate = z.object({
  calories_kcal: z.number().int().nullable(),
});

let client = null;
function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!client) client = new Anthropic();
  return client;
}

async function estimateCalories(description) {
  const anthropic = getClient();
  if (!anthropic) return null;

  try {
    const response = await anthropic.messages.parse({
      model: 'claude-opus-5',
      max_tokens: 1024,
      output_config: {
        effort: 'low',
        format: zodOutputFormat(CalorieEstimate),
      },
      system:
        'Você estima calorias de refeições que pacientes de nutrição descrevem em português, ' +
        'no diário alimentar de um app de emagrecimento. Dê sua melhor estimativa realista em ' +
        'kcal para a refeição descrita, considerando porções típicas quando não especificado. ' +
        'Se o texto não descrever comida (ex: está vazio ou sem sentido), responda null.',
      messages: [{ role: 'user', content: description }],
    });
    return response.parsed_output?.calories_kcal ?? null;
  } catch (err) {
    console.error('Falha ao estimar calorias:', err.message);
    return null;
  }
}

module.exports = { estimateCalories };
