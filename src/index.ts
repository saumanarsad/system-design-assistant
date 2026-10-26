import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

async function main() {
  try {
    const response: OpenAI.Chat.ChatCompletion =
      await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a senior backend engineer. Answer in plain language, max 3 sentences.",
          },
          {
            role: "user",
            content: "Whats my name",
          },
        ],
      });
    const reply: string | null | undefined =
      response.choices[0]?.message.content;
    if (response.usage) {
      console.log(`Prompt tokens: ${response.usage.prompt_tokens}`);
      console.log(`Completion tokens: ${response.usage.completion_tokens}`);
      console.log(`Total tokens used: ${response.usage.total_tokens}`);
      console.log(
        `Total Price`,
        calculatePrice(
          response.usage.prompt_tokens,
          response.usage.completion_tokens,
        ),
      );
    }

    console.log(reply);
  } catch (error) {
    console.log(error);
  }
}
main();

function calculatePrice(prompt_tokens: number, completion_tokens: number) {
  const promptPrice = (prompt_tokens / 1000000) * 0.15;
  const completionPrice = (completion_tokens / 1000000) * 0.6;
  return {
    promptPrice,
    completionPrice,
    total: promptPrice + completionPrice,
  };
}
