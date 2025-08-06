/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, useState } from "react";
import { Card } from "@/components/ui/card";
import { groupForecastData } from "@/utils/format-forecast";
import { getWeatherIcon } from "@/utils/weather-icons";
import { WiBarometer, WiSunrise, WiSunset, WiHumidity, WiWindy  } from "react-icons/wi";
import { motion } from "framer-motion";

export function ForecastCards({ daily, hourly, timezone }: any) {
  const [expanded, setExpanded] = useState(0); // Today open
  const forecast = groupForecastData(daily, hourly, timezone);

  return (
    <section className="flex lg:flex-row flex-col gap-4">
      {forecast.map((day: { date: Key | null | undefined; dayName: string; dayNameShort: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; min: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; max: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; icon: number; wind: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; humidity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; pressure: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; sunrise: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; sunset: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, i: SetStateAction<number>) => {
        const isExpanded = i === expanded;

        return (
          <motion.div
            key={day.date}
            layout
            initial={{ borderRadius: 12 }}
            transition={{ layout: { duration: 0.3, type: "spring", ease: "easeInOut" } }}
            onClick={() => setExpanded(i)}
          >
            <Card
              className={`cursor-pointer transition-all dark:bg-gray-800 dark:text-white lg:h-[180px] ${
                isExpanded ? "p-4 w-[260px]" : "px-4 py-2 lg:w-fit w-[260px]"
              }`}
            >
              {!isExpanded && (
                <div className="flex lg:flex-col items-center text-center justify-between lg:h-[180px] py-2">
                  <span className="font-semibold text-sm">{day.dayNameShort}</span>
                  <span className="text-sm">{day.max}°C</span>
                  <span className="text-3xl">{getWeatherIcon(day.icon)}</span>
                </div>
              )}


              {isExpanded && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{day.dayName}</span>
                    <span>{day.min}°C / {day.max}°C</span>
                  </div>

                  <div className="flex items-center justify-between text-2xl">
                    <span className="text-4xl">{getWeatherIcon(day.icon)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2"><WiWindy className="text-xl" /> {day.wind} km/h</span>
                    <span className="flex items-center gap-2"><WiHumidity className="text-xl"/> {day.humidity}%</span>
                  </div>
                  <div className="flex">
                    <span className="flex items-center gap-2"><WiBarometer className="text-xl"/> {day.pressure} hPa</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><WiSunrise className="text-xl" /> {day.sunrise}</span>
                    <span className="flex items-center gap-1"><WiSunset className="text-xl" /> {day.sunset}</span>
                  </div>
                </div>
              )}

            </Card>
          </motion.div>
        );
      })}
    </section>
  );
}
