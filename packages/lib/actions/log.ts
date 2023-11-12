import moment from "moment";
import { Log } from "../types/log";
import { callAPI } from "../utils/api";

const search = (): Promise<Log[]> =>
    callAPI("GET", "/api/db/logger/logs").then((data) =>
        data.sort(
            (a: Log, b: Log) =>
                moment(b.timestamp).valueOf() - moment(a.timestamp).valueOf()
        )
    );

const add = (payload: Omit<Log, "timestamp">) =>
    callAPI("POST", "/api/db/logger/logs", {
        body: {
            ...payload,
            timestamp: moment().format(),
        },
    });

export const LogActions = {
    search,
    add,
};
