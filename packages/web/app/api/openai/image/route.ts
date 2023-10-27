import { CreateImageRequestSizeEnum } from "openai";
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

    const body: { prompt: string; size: CreateImageRequestSizeEnum } =
        data.body;

    const response = await OpenAI.createImage({
        prompt: body.prompt,
        size: body.size || "1024x1024",
    });

    return resolveResponse(response.data);
}
