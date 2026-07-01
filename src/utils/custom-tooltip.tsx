import { TooltipProps } from "recharts";

export function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;

  const rain = payload[0].value ?? 0;

  return (
    <div className="font-[inherit] text-xs sm:text-sm text-neutral-800 dark:text-neutral-300 bg-neutral-50 dark:bg-black px-2 py-1">
      <span className="text-neutral-500">{label}:</span> {rain}% rain
    </div>
  );
}