"use client";

import { AuthContextProvider } from "@honzachalupa/admin";
import { DesignSystemContextProvider } from "@honzachalupa/design-system";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
}

export const Providers: React.FC<IProps> = ({ children }) => {
    return (
        <>
            <DesignSystemContextProvider>
                <AuthContextProvider namespaceId="admin">
                    {children}
                </AuthContextProvider>
            </DesignSystemContextProvider>

            <Analytics />
        </>
    );
};
