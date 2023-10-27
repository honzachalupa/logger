import { ChatCompletionRequestMessage } from "openai";
import {
    OpenAI,
    TRequestProps,
    checkOrigin,
    extractRequestData,
    resolveResponse,
} from "../../../../utils";

export async function OPTIONS(request: Request) {
    checkOrigin(request);

    return resolveResponse({});
}

export async function POST(request: Request, requestParams: TRequestProps) {
    checkOrigin(request);

    const data = await extractRequestData(request, requestParams);

    const body: {
        message: ChatCompletionRequestMessage;
        history?: ChatCompletionRequestMessage[];
    } = data.body;

    const response = await OpenAI.createChatCompletion({
        model: "gpt-4",
        messages: [...(body.history || []), body.message],
    });

    return resolveResponse(response.data);
}
