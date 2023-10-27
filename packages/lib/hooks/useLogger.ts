import { useLocation } from "@honzachalupa/design-system";
import { LogActions } from "../actions";
import { LogLevel } from "../types";

export const useLogger = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location?.search);

    const isDebugEnabled = searchParams.get("debug");
    const isDebugAlertEnabled = searchParams.get("debugAlert");

    const log = (error: Error | string, level: LogLevel = "info") => {
        const payload =
            typeof error === "string"
                ? { message: error, level }
                : { message: error.message, level, stack: error.stack };

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

    return log;
};
