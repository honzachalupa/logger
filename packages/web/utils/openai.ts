import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    apiKey: process.env.OPENAI_API_KEY!,
});

export const OpenAI = new OpenAIApi(configuration);
