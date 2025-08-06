/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { buildWeatherApiUrl } from "@/utils/weather";
import { getWeatherIcon } from "@/utils/weather-icons";
import { RainChart  } from './rain-chart';
import { WeatherCard  } from './weather-card';
import { ForecastCards  } from './weather-forecast-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WiDayCloudy } from "react-icons/wi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

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

export function WeatherClient() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);

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

  if (loading) return <div className="flex flex-row gap-2">
  <div className="animate-pulse bg-gray-300 w-12 h-12 rounded-full"></div>
    <div className="flex flex-col gap-2">
      <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-full"></div>
      <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
    </div>
  </div>;
  
  const rainChartData = getRainChartData(weather.hourly);
  const current = weather.current;
  const daily = weather.daily;

  // Format time
  const now = new Date();
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  // Weather values
  const temperature = `${current.temperature_2m}°C`;
  const icon = getWeatherIcon(current.weathercode);
  const wind = `${current.windspeed_10m} km/h`;
  const pressure = `${current.surface_pressure} hPa`;
  const humidity = `${current.relative_humidity_2m}%`;

  // sunrise/sunset are arrays of one item for today
  const sunrise = new Date(daily.sunrise[0]).toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit"
  });
  const sunset = new Date(daily.sunset[0]).toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit"
  });
  return (
    
    <section id="weather-tabs" className="w-full min-w-sm gap-6 px-4 sm:px-6">
      <div id="weather-header" className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <WiDayCloudy className="text-2xl sm:text-3xl" />
          Weather Forecast
        </h1>
        <div className="flex flex-row items-center gap-1 sm:gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-200">
          <FaMapMarkerAlt />
          <span>{location.city}, {location.country}</span>
        </div>
      </div>

      <Alert variant="default" className="bg-gray-50 dark:bg-gray-800 border-black-200 dark:border-black-700 text-black-800 dark:text-gray-200 my-4">
        <Info className="h-4 w-4 shrink-0" />
            <AlertDescription className="leading-snug">
              Location is estimated based on your IP address or ISP, and may not always be accurate.
            </AlertDescription>
      </Alert>

      <Tabs defaultValue="today">
        <TabsList className="dark:bg-gray-800">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="next_7">Next 7 Days</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <WeatherCard
              day={weekday}
              time={time}
              temperature={temperature}
              icon={icon}
              wind={wind}
              pressure={pressure}
              humidity={humidity}
              sunrise={sunrise}
              sunset={sunset}
            />
            <RainChart data={rainChartData} />
          </div>
        </TabsContent>

        <TabsContent value="next_7" className="mt-2">
          <ForecastCards
            daily={weather.daily}
            hourly={weather.hourly}
            timezone={weather.timezone}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
