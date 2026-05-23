import { generateYAxis } from "@/app/lib/utils";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { Revenue } from "@/app/lib/definitions";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart({
  revenue,
}: {
  revenue: Revenue[];
}) {
  const chartHeight = 350;
  // NOTE: Uncomment this code in Chapter 7

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="md:col-span-4 w-full">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      {/* NOTE: Uncomment this code in Chapter 7 */}

      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="items-end gap-2 md:gap-4 grid grid-cols-12 sm:grid-cols-13 bg-white mt-0 p-4 rounded-md">
          <div
            className="hidden sm:flex flex-col justify-between mb-6 text-gray-400 text-sm"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="bg-blue-300 rounded-md w-full"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="text-gray-400 text-sm -rotate-90 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pt-6 pb-2">
          <CalendarIcon className="w-5 h-5 text-gray-500" />
          <h3 className="ml-2 text-gray-500 text-sm">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
