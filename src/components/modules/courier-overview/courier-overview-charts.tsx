"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
} from "recharts";

// Sample weekly delivery trends for courier
const courierWeeklyData = [
  { day: "Mon", completed: 12, cash: 3200 },
  { day: "Tue", completed: 16, cash: 4500 },
  { day: "Wed", completed: 14, cash: 3800 },
  { day: "Thu", completed: 19, cash: 5200 },
  { day: "Fri", completed: 22, cash: 6100 },
  { day: "Sat", completed: 25, cash: 7400 },
  { day: "Sun", completed: 18, cash: 4900 },
];

const efficiencyData = [
  { category: "Delivered", count: 85, color: "#16a34a" },
  { category: "In Progress", count: 12, color: "#2563eb" },
  { category: "Returned", count: 3, color: "#ef4444" },
];

const courierPerformanceConfig = {
  completed: {
    label: "Parcels Delivered",
    color: "hsl(142 76% 36%)",
  },
  cash: {
    label: "COD Collected (৳)",
    color: "hsl(217 91% 60%)",
  },
} satisfies ChartConfig;

const efficiencyConfig = {
  delivered: {
    label: "Delivered",
    color: "#16a34a",
  },
  inProgress: {
    label: "In Progress",
    color: "#2563eb",
  },
  returned: {
    label: "Returned",
    color: "#ef4444",
  },
} satisfies ChartConfig;

const CourierOverviewCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
      {/* 1. Weekly Deliveries Performance Area Chart */}
      <Card className="lg:col-span-4 border">
        <CardHeader>
          <CardTitle>Delivery Performance</CardTitle>
          <CardDescription>
            Weekly successful deliveries and fulfillment volume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={courierPerformanceConfig}
            className="h-72 w-full"
          >
            <AreaChart
              data={courierWeeklyData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="courierDeliveredGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#16a34a"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#courierDeliveredGrad)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 2. Success Ratio Bar Chart */}
      <Card className="lg:col-span-3 border">
        <CardHeader>
          <CardTitle>Delivery Fulfillment Ratio</CardTitle>
          <CardDescription>
            Overall delivery completion vs active tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={efficiencyConfig} className="h-72 w-full">
            <BarChart
              data={efficiencyData}
              layout="vertical"
              margin={{ top: 15, right: 20, left: 15, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis
                dataKey="category"
                type="category"
                tickLine={false}
                axisLine={false}
                width={85}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {efficiencyData.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourierOverviewCharts;
