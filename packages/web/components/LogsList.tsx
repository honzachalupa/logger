"use client";

import { Button, VirtualizedList } from "@honzachalupa/design-system";
import { Log, LogActions, useLogger } from "@honzachalupa/logger";
import cx from "classnames";
import moment from "moment";
import { useEffect, useState } from "react";
import config from "../config";

const Item: React.FC<any> = ({
    namespaceId,
    level,
    message,
    stack,
    data,
    timestamp,
}) => {
    const headerItems = [
        {
            label: "Timestamp",
            value: moment(timestamp).format("D.M.YYYY HH:mm:ss"),
        },
        {
            label: "Level",
            value: level,
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
            <header className="flex pb-5">
                {headerItems.map(({ label, value }) => (
                    <div key={label} className="mr-10">
                        <p className="text-sm text-gray-500">{label}</p>

                        <p>{value}</p>
                    </div>
                ))}
            </header>

            {stack && (
                <div className="pb-5">
                    <p className="text-sm text-gray-500">Stack</p>

                    <pre className="whitespace-pre-wrap">{stack}</pre>
                </div>
            )}

            {data && (
                <div className="pb-5">
                    <p className="text-sm text-gray-500">Data</p>

                    <pre className="whitespace-pre-wrap">
                        {JSON.stringify(data, null, 3)}
                    </pre>
                </div>
            )}
        </article>
    );
};

export const LogsList: React.FC = () => {
    const { log } = useLogger(config.namespaceId);

    const [data, setData] = useState<Log[]>([]);

    const fetchData = () => {
        LogActions.search().then(setData);
    };

    const handleAddLog = () => {
        log.warning(new Error("Test message"), { key: "value" });
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Button label="Add test log" onClick={handleAddLog} />

            <VirtualizedList
                items={data}
                renderer={(props) => <Item {...props} />}
            />
        </>
    );
};
