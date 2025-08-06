import { Card, CardContent } from "@/components/ui/card";

type WeatherCardProps = {
  day: string;
  time: string;
  temperature: string;
  icon: React.ReactNode;
  wind: string;
  pressure: string;
  humidity: string;
  sunrise: string;
  sunset: string;
};

export function WeatherCard({
  day,
  time,
  temperature,
  icon,
  wind,
  pressure,
  humidity,
  sunrise,
  sunset,
}: WeatherCardProps) {
  return (
    <Card className="w-auto py-0 h-full shadow-md dark:bg-gray-800 dark:text-white">
      <CardContent className="p-4 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between text-xl font-semibold text-zinc-600 dark:text-zinc-300 mb-2">
          <span>{day}</span>
          <span>{time}</span>
        </div>

        {/* Temp + Icon */}
        <div className="flex items-center justify-between mb-4 px-4">
          <div className="text-4xl font-bold">{temperature}</div>
          <div className="text-6xl">{icon}</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Wind: </span>
            <span className="text-black dark:text-neutral-100">{wind}</span>
          </div>
          <div className="flex items-center gap-2">
            <span >Sunrise: </span>
            <span className="text-black dark:text-neutral-100">{sunrise}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Pressure: </span>
            <span className="text-black dark:text-neutral-100">{pressure}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Sunset: </span>
            <span className="text-black dark:text-neutral-100">{sunset}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <span>Humidity: </span>
            <span className="text-black dark:text-neutral-100">{humidity}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
