/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Geist_Mono } from "next/font/google";
import { useTheme } from "next-themes";
import { buildWeatherApiUrl } from "@/utils/weather";
import { getWeatherIcon, getWeatherLabel } from "@/utils/weather-icons";
import { RainChart } from './rain-chart';
import { ForecastLog } from './weather-forecast-card';

const mono = Geist_Mono({ subsets: ['latin'] });

function getRainChartData(hourly: any) {
  const now = new Date();
  const past = new Date(now.getTime() - 1 * 60 * 60 * 1000);
  const future = new Date(now.getTime() + 5 * 60 * 60 * 1000);

  const result = [];

  for (let i = 0; i < hourly.time.length; i++) {
    const entryTime = new Date(hourly.time[i]);
    if (entryTime >= past && entryTime <= future) {
      result.push({
        hour: entryTime.toLocaleTimeString("en-US", { hour: "numeric" }).replace(" ", ""),
        rain: hourly.precipitation_probability[i] || 0,
      });
    }
  }

  return result;
}

function useTypewriter(text: string, startDelay = 0, speed = 35) {
  const [output, setOutput] = useState('');

  useEffect(() => {
    setOutput('');
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setOutput(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, startDelay, speed]);

  return output;
}

function PromptLine({ typed, done }: { typed: string; done: boolean }) {
  return (
    <p className="text-emerald-600 dark:text-emerald-400 mb-3">
      <span className="text-neutral-500 dark:text-neutral-500">user</span>
      <span className="text-neutral-400 dark:text-neutral-600">:~$ </span>
      {typed}
      {!done && <span className="inline-block w-2 h-4 -mb-0.5 bg-emerald-600 dark:bg-emerald-400 animate-pulse ml-0.5" />}
    </p>
  );
}

// Types out the command, then reveals its output only once typing finishes.
function CommandBlock({ cmd, delay = 0, children }: { cmd: string; delay?: number; children?: React.ReactNode }) {
  const typed = useTypewriter(cmd, delay);
  const done = typed.length === cmd.length;
  return (
    <>
      <PromptLine typed={typed} done={done} />
      {done && children}
    </>
  );
}

function Comment({ children }: { children: React.ReactNode }) {
  return <p className="text-neutral-400 dark:text-neutral-600"># {children}</p>;
}

function ThemeCmd() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span>&nbsp;</span>;
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
    >
      ./toggle-theme --{theme === 'light' ? 'dark' : 'light'}
    </button>
  );
}

export function WeatherClient() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [view, setView] = useState<'today' | 'week'>('today');

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      let lat = 0;
      let lon = 0;

      const locRes = await fetch("https://ipwho.is/");
      const locData = await locRes.json();


      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
          },
          (error) => {
            console.error("Geolocation error:", error.message);
          }
        );
      } else {
        console.warn("Geolocation is not supported by this browser.");
        lat = locData.latitude;
        lon = locData.longitude;
      }

      setLocation({
        city: locData.city,
        region: locData.region,
        country: locData.country,
      });

      const url = buildWeatherApiUrl(lat, lon);

      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <main className={`${mono.className} min-h-screen bg-neutral-50 dark:bg-black text-neutral-800 dark:text-neutral-300 text-sm sm:text-base leading-relaxed`}>
      <div className="max-w-3xl mx-auto px-6 py-16">

        <div className="flex justify-between items-start mb-10">
          <CommandBlock cmd="curl ./location">
            {location && weather && (
              <>
                <p className="mb-1 text-neutral-900 dark:text-neutral-100">{location.city}, {location.region}, {location.country}</p>
                <p className="text-neutral-500">
                  &gt; note: location is estimated from your IP address and may not always be accurate.
                </p>
              </>
            )}
          </CommandBlock>
          <ThemeCmd />
        </div>

        {loading || !location || !weather ? (
          <p className="mb-10">
            &gt; fetching weather data
            <span className="inline-block w-2.5 h-4 bg-emerald-600 dark:bg-emerald-400 align-middle animate-pulse ml-2" />
          </p>
        ) : (
          <WeatherOutput weather={weather} view={view} setView={setView} />
        )}
      </div>
    </main>
  );
}

function WeatherOutput({
  weather,
  view,
  setView,
}: {
  weather: any;
  view: 'today' | 'week';
  setView: (v: 'today' | 'week') => void;
}) {
  const rainChartData = getRainChartData(weather.hourly);
  const current = weather.current;
  const daily = weather.daily;

  const now = new Date();
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  const sunrise = new Date(daily.sunrise[0]).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const sunset = new Date(daily.sunset[0]).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <>
      <CommandBlock cmd="./forecast --help" delay={300}>
        <div className="mb-10 flex gap-6">
          <button
            onClick={() => setView('today')}
            className={view === 'today' ? 'text-emerald-600 dark:text-emerald-400 underline' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'}
          >
            --today
          </button>
          <button
            onClick={() => setView('week')}
            className={view === 'week' ? 'text-emerald-600 dark:text-emerald-400 underline' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'}
          >
            --week
          </button>
        </div>
      </CommandBlock>

      {view === 'today' ? (
        <>
          <CommandBlock cmd="cat ./current.log" delay={600}>
            <div className="mb-10 space-y-1">
              <Comment>{weekday}, {time}</Comment>
              <p className="flex items-center gap-2">
                <span className="text-neutral-500">condition:</span>
                {getWeatherIcon(current.weathercode)}
                {getWeatherLabel(current.weathercode)}
              </p>
              <p><span className="text-neutral-500">temp:</span> {current.temperature_2m}&deg;C</p>
              <p><span className="text-neutral-500">wind:</span> {current.windspeed_10m} km/h</p>
              <p><span className="text-neutral-500">pressure:</span> {current.surface_pressure} hPa</p>
              <p><span className="text-neutral-500">humidity:</span> {current.relative_humidity_2m}%</p>
              <p><span className="text-neutral-500">sunrise:</span> {sunrise}</p>
              <p><span className="text-neutral-500">sunset:</span> {sunset}</p>
            </div>
          </CommandBlock>

          <CommandBlock cmd="plot ./rain_chance.dat" delay={900}>
            <RainChart data={rainChartData} />
          </CommandBlock>
        </>
      ) : (
        <CommandBlock cmd="ls ./forecast/*.log" delay={600}>
          <ForecastLog daily={weather.daily} hourly={weather.hourly} timezone={weather.timezone} />
        </CommandBlock>
      )}
    </>
  );
}
