export type LogLevel = "info" | "warning" | "error";

export interface Log {
    message: string;
    level: LogLevel;
    stack?: string;
    data?: { [key: string]: any } | any[];
    timestamp: string;
}
