// lib/buildWeatherApiUrl.ts or utils/weather.ts

export function buildWeatherApiUrl(latitude: number, longitude: number, options?: {
  hourly?: string[],
  daily?: string[],
  current?: string[],
  timezone?: string,
}) {
  const baseUrl = "https://api.open-meteo.com/v1/forecast";

  const defaultCurrent = [
    "temperature_2m",
    "weathercode",
    "windspeed_10m",
    "relative_humidity_2m",
    "surface_pressure",
  ];

  const defaultHourly = [
    "temperature_2m",
    "weathercode",
    "precipitation_probability",
    "relative_humidity_2m",
    "windspeed_10m",
    "surface_pressure",
  ];

  const defaultDaily = [
    "temperature_2m_max",
    "temperature_2m_min",
    "weathercode",
    "sunrise",
    "sunset",
    "windspeed_10m_max",
    "relative_humidity_2m_max",
    "surface_pressure_max",
  ];

  const timezone = options?.timezone || "auto";
  const hourly = (options?.hourly || defaultHourly).join(",");
  const daily = (options?.daily || defaultDaily).join(",");
  const current = (options?.current || defaultCurrent).join(",");

  return `${baseUrl}?latitude=${latitude}&longitude=${longitude}` +
         `&current=${current}` +
         `&hourly=${hourly}` +
         `&daily=${daily}` +
         `&timezone=${timezone}`;
}
