import { Select } from "@honzachalupa/design-system";
import { LogLevel, LogLevels } from "@honzachalupa/logger";
import { useEffect, useState } from "react";
import config from "../../../config";

export interface Filter {
    levels: LogLevel[];
    namespaces: string[];
}

export const LogsListFilter: React.FC<{
    onChange: (filter: Filter) => void;
}> = ({ onChange }) => {
    const [levelsFilter, setLevelsFilter] = useState<Filter["levels"]>([]);
    const [namespacesFilter, setNamespacesFilter] = useState<
        Filter["namespaces"]
    >([]);

    const levelOptions = Object.entries(LogLevels).map(([value, label]) => ({
        value,
        label,
    }));

    const namespacesOptions = [
        {
            value: config.namespaceId,
            label: config.namespaceId,
        },
        {
            value: "admin",
            label: "admin",
        },
        {
            value: "travel-app",
            label: "travel-app",
        },
    ];

    useEffect(() => {
        onChange({
            levels: levelsFilter,
            namespaces: namespacesFilter,
        });
    }, [levelsFilter, namespacesFilter]);

    const inputClassName = "md:mr-5 basis-full md:basis-1/3";

    return (
        <div className="flex px-5 pt-3 flex-wrap">
            <Select<LogLevel[]>
                placeholder="Filter by level"
                options={levelOptions}
                className={inputClassName}
                isMulti
                // TODO: Fix type
                // @ts-ignore
                onChange={setLevelsFilter}
            />

            <Select<string[]>
                placeholder="Filter by namespace ID"
                options={namespacesOptions}
                className={inputClassName}
                isMulti
                // @ts-ignore
                onChange={setNamespacesFilter}
            />
        </div>
    );
};
