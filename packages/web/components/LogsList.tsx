"use client";

import { Button, VirtualizedList } from "@honzachalupa/design-system";
import { Log, LogActions, useLogger } from "@honzachalupa/logger";
import moment from "moment";
import { useEffect, useState } from "react";

export const LogsList: React.FC = () => {
    const log = useLogger();

    const [data, setData] = useState<Log[]>([]);

    const fetchData = () => {
        LogActions.search().then(setData);
    };

    const handleAddLog = () => {
        log(new Error("Test message"));
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
            <Button label="Add" onClick={handleAddLog} />

            <VirtualizedList
                items={data}
                renderer={({ timestamp, level, message, stack }) => {
                    const headerItems = [
                        {
                            label: "Timestamp",
                            value: moment(timestamp).format(
                                "D.M.YYYY HH:mm:ss"
                            ),
                        },
                        {
                            label: "Level",
                            value: level.toUpperCase(),
                        },
                        {
                            label: "Message",
                            value: message,
                        },
                    ].filter(({ value }) => value);

                    return (
                        <article className="p-8 border-b-slate-800 border-b-2">
                            <header className="flex pb-5">
                                {headerItems.map(({ label, value }) => (
                                    <div key={label} className="mr-10">
                                        <p className="text-sm text-gray-500">
                                            {label}
                                        </p>

                                        <p>{value}</p>
                                    </div>
                                ))}
                            </header>

                            {stack && (
                                <div className="mr-10">
                                    <p className="text-sm text-gray-500">
                                        Stack
                                    </p>

                                    <pre>{stack}</pre>
                                </div>
                            )}
                        </article>
                    );
                }}
            />
        </>
    );
};
