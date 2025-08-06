/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/formatForecast.ts
function get12HourTime(date: any): string {
  const now = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, 
  };

  return new Intl.DateTimeFormat('en-US', options).format(now);
}

export function groupForecastData(daily: any, hourly: any, timezone: string) {
  return daily.time.map((date: string, index: number) => {
    const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "long", timeZone: timezone });
    const dayNameShort = new Date(date).toLocaleDateString("en-US", { weekday: "short", timeZone: timezone });

    const hours = hourly.time.reduce((acc: any[], t: string, i: number) => {
      if (t.startsWith(date)) {
        acc.push({
          time: t,
          temp: hourly.temperature_2m[i],
          rain: hourly.precipitation_probability[i],
          icon: hourly.weathercode[i],
        });
      }
      return acc;
    }, []);

    return {
      date,
      dayName,
      dayNameShort,
      max: Math.round(daily.temperature_2m_max[index]),
      min: Math.round(daily.temperature_2m_min[index]),
      icon: daily.weathercode[index],
      sunrise: get12HourTime(daily.sunrise[index]),
      sunset: get12HourTime(daily.sunset[index]),
      wind: daily.windspeed_10m_max?.[index],
      humidity: daily.relative_humidity_2m_max?.[index],
      pressure: daily.surface_pressure_max?.[index],
      hours,
    };
  });
}
