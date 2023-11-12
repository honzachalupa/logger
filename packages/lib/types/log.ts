export type LogLevel = "info" | "warning" | "error";

export interface Log {
    namespaceId: "admin" | "logger" | "travel-app";
    message: string;
    level: LogLevel;
    stack?: string;
    data?: { [key: string]: any } | any[];
    timestamp: string;
}
