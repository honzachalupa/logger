import { LogLevel, LogLevels } from "@honzachalupa/logger/build";
import cx from "classnames";
import moment from "moment";

export const LogsListItem: React.FC<{
    namespaceId: string;
    level: LogLevel;
    message: string;
    stack?: string;
    data?: any;
    timestamp: string;
}> = ({ namespaceId, level, message, stack, data, timestamp }) => {
    const headerItems = [
        {
            label: "Timestamp",
            value: moment(timestamp).format("D.M.YYYY HH:mm:ss"),
        },
        {
            label: "Level",
            value: LogLevels[level],
        },
        {
            label: "App ID",
            value: namespaceId,
        },
        {
            label: "Message",
            value: message,
        },
    ].filter(({ value }) => value);

    return (
        <article
            className={cx("p-8 border-b-2 border-b-slate-800", {
                "border-l-4 border-l-orange-600": level === "warning",
                "border-l-4 border-l-red-600": level === "error",
            })}
        >
            <header className="flex pb-5 flex-wrap">
                {headerItems.map(({ label, value }) => (
                    <div
                        key={label}
                        className="basis-full sm:basis-1/2 md:basis-auto md:mr-10"
                    >
                        <p className="text-sm text-gray-500 mb-1">{label}</p>

                        <p>{value}</p>
                    </div>
                ))}
            </header>

            {stack && (
                <div className="pb-5">
                    <p className="text-xs text-gray-500 mb-1">Stack</p>

                    <pre className="text-xs md:text-base whitespace-pre-wrap">
                        {stack}
                    </pre>
                </div>
            )}

            {data && (
                <div className="pb-5">
                    <p className="text-sm text-gray-500 mb-1">Data</p>

                    <pre className="text-xs md:text-base whitespace-pre-wrap">
                        {JSON.stringify(data, null, 3)}
                    </pre>
                </div>
            )}
        </article>
    );
};
