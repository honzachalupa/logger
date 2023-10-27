export const headers = {
    "Access-Control-Allow-Methods": "GET,PUT,POST,PATCH,DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
};

export type TRequestProps = { params: any };

export const extractRequestData = async (
    request: Request,
    { params }: TRequestProps
) => {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams.entries()) as any;

    let body: any = undefined;

    try {
        body = await request.json();
    } catch (error) {}

    return {
        params,
        searchParams,
        body,
    };
};

export const checkOrigin = (req: Request) => {
    const isBlocked =
        !req.headers.get("host")?.includes("localhost") &&
        !req.headers.get("host")?.includes("janchalupa.dev") &&
        !req.headers.get("host")?.includes("vyletuje.me");

    if (isBlocked) {
        throw new Error("Unauthorized");
    }
};

export const resolveResponse = (data: unknown, error?: unknown) => {
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
};
