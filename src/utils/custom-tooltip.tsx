import { TooltipProps } from "recharts";
import {
  WiDaySunny,
  WiShowers,
  WiThunderstorm
} from "react-icons/wi";

export function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;

  const rain = payload[0].value ?? 0;

  const getRainIcon = (value: number) => {
    if (value >= 60) return <WiThunderstorm className="text-yellow-600 text-2xl" />;
    if (value >= 30) return <WiShowers className="text-blue-500 text-2xl" />;
    return <WiDaySunny className="text-yellow-400 text-2xl" />;
  };

  return (
    <div className="rounded-md border border-border bg-popover p-3 shadow-md text-sm text-foreground dark:bg-gray-800 dark:text-white">
      <div className="font-semibold">{label}</div>
      <div className="mt-1 flex flex-row">
        <span className="font-medium">{getRainIcon(rain)} {rain}% chance of rain</span> 
      </div>
    </div>
  );
}