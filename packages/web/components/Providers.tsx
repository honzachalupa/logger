"use client";

import { AuthContextProvider } from "@honzachalupa/admin";
import { DesignSystemContextProvider } from "@honzachalupa/design-system";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import config from "../config";

interface IProps {
    children: ReactNode;
}

export const Providers: React.FC<IProps> = ({ children }) => {
    return (
        <>
            <DesignSystemContextProvider>
                {/* TODO: Add App ID to admin package. */}
                <AuthContextProvider namespaceId={config.appId as "admin"}>
                    {children}
                </AuthContextProvider>
            </DesignSystemContextProvider>

            <Analytics />
        </>
    );
};
