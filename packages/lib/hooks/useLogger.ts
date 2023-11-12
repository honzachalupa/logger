import { useLocation } from "@honzachalupa/design-system";
import { LogActions } from "../actions";
import { Log } from "../types";

export const useLogger = (namespaceId: Log["namespaceId"]) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location?.search);

    const isDebugEnabled = searchParams.get("debug");
    const isDebugAlertEnabled = searchParams.get("debugAlert");

    const log = (
        error: Error | string,
        data: Log["data"],
        level: Log["level"] = "info"
    ) => {
        const payload =
            typeof error === "string"
                ? { namespaceId, message: error, level, data }
                : {
                      namespaceId,
                      message: error.message,
                      level,
                      stack: error.stack,
                      data,
                  };

        const isConsoleLogEnabled =
            process.env.NODE_ENV === "development" || isDebugEnabled;

        if (isConsoleLogEnabled) {
            if (isDebugAlertEnabled) {
                const payloadString = JSON.stringify(payload, null, "\t");

                alert(payloadString);
            } else {
                switch (level) {
                    case "error":
                        console.error(payload);
                        break;
                    case "warning":
                        console.warn(payload);
                        break;
                    default:
                        console.log(payload);
                        break;
                }
            }
        }

        LogActions.add(payload);
    };

    const logInfo = (message: string, data?: Log["data"]) =>
        log(message, data, "info");

    const logWarning = (message: Error | string, data?: Log["data"]) =>
        log(message, data, "warning");

    const logError = (message: Error | string, data?: Log["data"]) =>
        log(message, data, "error");

    return {
        log: {
            info: logInfo,
            warning: logWarning,
            error: logError,
        },
    };
};
