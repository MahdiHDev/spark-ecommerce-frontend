"use client";

import { useEffect, useState } from "react";

export function CurrentYear() {
    const [year, setYear] = useState(2026);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setYear(new Date().getFullYear());
    }, []);

    return <>{year}</>;
}
