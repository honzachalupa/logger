import { Database, TAppNamespace } from "@honzachalupa/admin";
import { v4 as uuid } from "uuid";
import {
    TRequestProps,
    checkOrigin,
    extractRequestData,
    resolveResponse,
} from "../../../../../utils/api";

interface IParams {
    appId: TAppNamespace;
    tableName: string;
}

/* const applyMiddleware = async (
    request: Request,
    requestParams: TRequestProps,
    callback: (x: any) => void
) => {
    const requestData = await extractRequestData(request, requestParams);

    const params: IParams = requestData.params;

    checkOrigin(request);

    const db = await Database(params.appId, params.tableName);

    callback({ requestData, db });
}; */

export async function OPTIONS(request: Request) {
    checkOrigin(request);

    return resolveResponse({});
}

export async function GET(request: Request, requestParams: TRequestProps) {
    checkOrigin(request);

    const requestData = await extractRequestData(request, requestParams);

    const params: IParams = requestData.params;
    const searchParams: { id?: string; returnFirst?: boolean } =
        requestData.searchParams;

    const db = await Database(params.appId, params.tableName);
    const dbSearch = searchParams.returnFirst ? "searchSingle" : "search";

    const { data, error } = await db[dbSearch](searchParams.id!);

    return resolveResponse(data, error);

    /* return applyMiddleware(
        request,
        requestParams,
        async ({ requestData, db }) => {
            const searchParams: { id?: string; returnFirst?: boolean } =
                requestData.searchParams;

            const { data, error } = searchParams.returnFirst
                ? await db.searchSingle(searchParams.id!)
                : await db.search();

            if (error) {
                return new Response(JSON.stringify(error), {
                    status: 500,
                    headers,
                });
            }

            return new Response(JSON.stringify(data), {
                status: 200,
                headers,
            });
        }
    ); */
}

export async function POST(request: Request, requestParams: TRequestProps) {
    checkOrigin(request);

    const data = await extractRequestData(request, requestParams);

    const params: IParams = data.params;

    const id = uuid();

    const { error } = await Database(params.appId, params.tableName).create({
        id,
        ...data.body,
    });

    return resolveResponse({ id }, error);
}

export async function PATCH(request: Request, requestParams: TRequestProps) {
    checkOrigin(request);

    const data = await extractRequestData(request, requestParams);

    const params: IParams = data.params;

    const searchParams: {
        id: string;
    } = data.searchParams;

    const { error } = await Database(params.appId, params.tableName).update(
        searchParams.id,
        data.body
    );

    return resolveResponse({ id: searchParams.id }, error);
}

export async function DELETE(request: Request, requestParams: TRequestProps) {
    checkOrigin(request);

    const data = await extractRequestData(request, requestParams);

    const params: IParams = data.params;

    const searchParams: {
        id: string;
    } = data.searchParams;

    const { error } = await Database(params.appId, params.tableName).delete(
        searchParams.id
    );

    return resolveResponse({ id: searchParams.id }, error);
}
