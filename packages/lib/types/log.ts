export enum LogLevels {
    info = "Info",
    warning = "Warning",
    error = "Error",
}

export type LogLevel = keyof typeof LogLevels;

export interface Log {
    appId: string;
    message: string;
    level: LogLevel;
    stack?: string;
    data?: { [key: string]: any } | any[];
    timestamp: string;
}
