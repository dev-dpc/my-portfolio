"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "@/utils/custom-tooltip";

type Props = {
    data: { hour: string; rain: number }[];
};

// Custom Y-Axis label (Weather legend by rain %)
const formatWeatherLegend = (val: number) => {
    if (val >= 60) return "heavy";
    if (val >= 20) return "rainy";
    return "sunny";
};

export function RainChart({ data }: Props) {
    return (
        <div className="mb-10 -ml-4">
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                    <XAxis
                        dataKey="hour"
                        stroke="currentColor"
                        className="text-neutral-500"
                        interval={0}
                        tick={{ fontSize: 12, fontFamily: 'inherit' }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        domain={[0, 100]}
                        tickFormatter={formatWeatherLegend}
                        stroke="currentColor"
                        className="text-neutral-500"
                        tick={{ fontSize: 12, fontFamily: 'inherit' }}
                        ticks={[0, 30, 70]}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={false}
                    />

                    <Bar
                        dataKey="rain"
                        fill="currentColor"
                        className="text-emerald-600 dark:text-emerald-400"
                        radius={0}
                        barSize={6}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
