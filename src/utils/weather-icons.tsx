import {
  WiDaySunny,
  WiDayCloudy,
  WiCloudy,
  WiShowers,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiNa
} from "react-icons/wi";

export function getWeatherIcon(code: number) {
  if ([0].includes(code)) return <WiDaySunny className="text-yellow-400" />;
  if ([1, 2].includes(code)) return <WiDayCloudy className="text-yellow-300" />;
  if ([3, 45, 48].includes(code)) return <WiCloudy className="text-gray-400" />;
  if ([51, 53, 55, 61, 63, 65, 80, 81].includes(code)) return <WiShowers className="text-blue-500" />;
  if ([66, 67, 82].includes(code)) return <WiRain className="text-indigo-500" />;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <WiSnow className="text-cyan-300" />;
  if ([95, 96, 99].includes(code)) return <WiThunderstorm className="text-yellow-600" />;
  return <WiNa className="text-muted-foreground" />;
}