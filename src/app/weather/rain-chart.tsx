"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { CustomTooltip } from "@/utils/custom-tooltip";

type Props = {
    data: { hour: string; rain: number }[];
};

// Custom Y-Axis label (Weather legend by rain %)
const formatWeatherLegend = (val: number) => {
    if (val >= 60) return "Heavy";
    if (val >= 20) return "Rainy";
    return "Sunny";
};

export function RainChart({ data }: Props) {
    return (
        <section id="rain-chart" className="p-2">
            <h2 className="text-md font-semibold">Chance of rain</h2>
            <ResponsiveContainer className="-ml-5" width="100%" height={250}>
                <BarChart data={data}>
                    {/* Time-based X-axis */}
                    <XAxis
                        dataKey="hour"
                        stroke="#888"
                        interval={0}
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    {/* Rain chance scale → weather condition */}
                    <YAxis
                        domain={[0, 100]}
                        tickFormatter={formatWeatherLegend}
                        stroke="#888"
                        tick={{ fontSize: 12 }}
                        ticks={[0, 30, 70]}
                        axisLine={false}
                        tickLine={false}
                    />

                    <CartesianGrid
                        horizontal={true}
                        vertical={false}
                        strokeDasharray="4 4"
                        stroke="#ccc"
                        syncWithTicks={true}
                    />

                    <Tooltip 
                        content={<CustomTooltip />}
                        cursor={false}
                    />

                    {/* Bar width reduced */}
                    <Bar
                        dataKey="rain"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                        barSize={8}
                    />
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
}
