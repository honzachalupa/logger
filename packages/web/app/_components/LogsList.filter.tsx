import { Select } from "@honzachalupa/design-system";
import { LogLevel, LogLevels } from "@honzachalupa/logger";
import { useEffect, useState } from "react";
import config from "../../config";

export interface Filter {
    level: LogLevel[];
    appId: string[];
}

export const LogsListFilter: React.FC<{
    onChange: (filter: Filter) => void;
}> = ({ onChange }) => {
    const [levelFilter, setLevelsFilter] = useState<Filter["level"]>([]);
    const [appIdFilter, setAppIdFilter] = useState<Filter["appId"]>([]);

    const levelOptions = Object.entries(LogLevels).map(([value, label]) => ({
        value,
        label,
    }));

    const appIdOptions = [
        {
            value: config.appId,
            label: config.appId,
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
            level: levelFilter,
            appId: appIdFilter,
        });
    }, [levelFilter, appIdFilter]);

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
                placeholder="Filter by App ID"
                options={appIdOptions}
                className={inputClassName}
                isMulti
                // @ts-ignore
                onChange={setAppIdFilter}
            />
        </div>
    );
};
