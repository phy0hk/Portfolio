import React from "react";

export interface displayProps {
    type: "history" | "output" | "element";
    value?: string;
    element?: React.ReactNode;
}
