"use client";

import { VirtualizedList } from "@honzachalupa/design-system";
import { Log, LogActions } from "@honzachalupa/logger";
import { useEffect, useMemo, useState } from "react";
import { Filter, LogsListFilter } from "./LogsList.filter";
import { LogsListItem } from "./LogsList.item";

export const LogsList: React.FC = () => {
    const [items, setItems] = useState<Log[]>([]);
    const [filter, setFilter] = useState<Filter>();

    const filteredItems = useMemo(
        () =>
            items.filter(
                ({ level, appId }) =>
                    (!filter?.level.length || filter?.level.includes(level)) &&
                    (!filter?.appId.length || filter?.appId.includes(appId))
            ),
        [items, filter]
    );

    const fetchData = () => {
        LogActions.search().then(setItems);
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
            <LogsListFilter onChange={setFilter} />

            <VirtualizedList
                items={filteredItems}
                renderer={(props) => <LogsListItem {...props} />}
            />
        </>
    );
};
