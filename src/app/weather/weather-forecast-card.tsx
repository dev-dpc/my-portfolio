/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { groupForecastData } from "@/utils/format-forecast";
import { getWeatherIcon, getWeatherLabel } from "@/utils/weather-icons";
import { WiBarometer, WiSunrise, WiSunset, WiHumidity, WiWindy } from "react-icons/wi";

export function ForecastLog({ daily, hourly, timezone }: any) {
  const [expanded, setExpanded] = useState(0);
  const forecast = groupForecastData(daily, hourly, timezone);

  return (
    <div className="space-y-1">
      {forecast.map((day: any, i: number) => {
        const isExpanded = i === expanded;
        return (
          <div key={day.date} className="border-t border-neutral-200 dark:border-neutral-800 first:border-t-0 pt-2 first:pt-0">
            <button
              onClick={() => setExpanded(isExpanded ? -1 : i)}
              className="w-full flex items-center justify-between text-left hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="text-neutral-400">{isExpanded ? '-' : '+'}</span>
                {day.dayName.toLowerCase()}.log
              </span>
              <span className="flex items-center gap-2 text-neutral-500">
                {day.min}&deg;/{day.max}&deg;C
                {getWeatherIcon(day.icon)}
              </span>
            </button>

            {isExpanded && (
              <div className="pl-4 mt-2 mb-3 space-y-2 text-neutral-600 dark:text-neutral-400">
                <div className="text-5xl">{getWeatherIcon(day.icon)}</div>
                <p><span className="text-neutral-500">condition:</span> {getWeatherLabel(day.icon)}</p>
                <p className="flex items-center gap-2"><WiWindy className="text-lg" /><span className="text-neutral-500">wind:</span> {day.wind} km/h</p>
                <p className="flex items-center gap-2"><WiHumidity className="text-lg" /><span className="text-neutral-500">humidity:</span> {day.humidity}%</p>
                <p className="flex items-center gap-2"><WiBarometer className="text-lg" /><span className="text-neutral-500">pressure:</span> {day.pressure} hPa</p>
                <p className="flex items-center gap-2"><WiSunrise className="text-lg" /><span className="text-neutral-500">sunrise:</span> {day.sunrise}</p>
                <p className="flex items-center gap-2"><WiSunset className="text-lg" /><span className="text-neutral-500">sunset:</span> {day.sunset}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
