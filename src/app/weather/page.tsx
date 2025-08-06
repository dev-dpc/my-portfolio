import { ThemeToggle } from '../theme-toggle';
import { WeatherClient } from './weather-client';

export default async function WeatherPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center text-black dark:text-white transition-all duration-300">
        <div className="max-w-6xl sm:p-8 space-y-10">
            <ThemeToggle/>
            <WeatherClient />
        </div>
    </div>
  );
}
