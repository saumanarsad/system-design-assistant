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
            role: "user",
            content: "Explain DB sharding in 2 sentences",
          },
        ],
      });
    const reply: string | null | undefined =
      response.choices[0]?.message.content;
    if (response.usage) {
      console.log(`Prompt tokens: ${response.usage.prompt_tokens}`);
      console.log(`Completion tokens: ${response.usage.completion_tokens}`);
      console.log(`Total tokens used: ${response.usage.total_tokens}`);
    }

    console.log(reply);
  } catch (error) {
    console.log(error);
  }
}
main();
