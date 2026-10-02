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
  ChartLegend,
  ChartLegendContent,
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
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Sample distribution data for platform analytics
const weeklyShipmentData = [
  { day: "Mon", delivered: 42, inTransit: 18, created: 65 },
  { day: "Tue", delivered: 55, inTransit: 24, created: 78 },
  { day: "Wed", delivered: 68, inTransit: 31, created: 85 },
  { day: "Thu", delivered: 62, inTransit: 27, created: 72 },
  { day: "Fri", delivered: 84, inTransit: 38, created: 95 },
  { day: "Sat", delivered: 95, inTransit: 42, created: 110 },
  { day: "Sun", delivered: 70, inTransit: 29, created: 80 },
];

const statusDistributionData = [
  { name: "Delivered", value: 450, color: "var(--color-delivered)" },
  { name: "In Transit", value: 180, color: "var(--color-inTransit)" },
  { name: "Assigned", value: 120, color: "var(--color-assigned)" },
  { name: "Pending", value: 95, color: "var(--color-pending)" },
];

const activityChartConfig = {
  delivered: {
    label: "Delivered",
    color: "hsl(142 76% 36%)",
  },
  inTransit: {
    label: "In Transit",
    color: "hsl(217 91% 60%)",
  },
  created: {
    label: "Total Created",
    color: "hsl(262 83% 58%)",
  },
} satisfies ChartConfig;

const statusChartConfig = {
  delivered: {
    label: "Delivered",
    color: "#16a34a",
  },
  inTransit: {
    label: "In Transit",
    color: "#2563eb",
  },
  assigned: {
    label: "Assigned",
    color: "#8b5cf6",
  },
  pending: {
    label: "Pending",
    color: "#f59e0b",
  },
} satisfies ChartConfig;

const OverviewCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
      {/* 1. Weekly Shipment Traffic Area Chart */}
      <Card className="lg:col-span-4 border">
        <CardHeader>
          <CardTitle>Delivery & Shipment Activity</CardTitle>
          <CardDescription>
            Weekly volume of created, transit, and successfully delivered parcels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={activityChartConfig} className="h-72 w-full">
            <AreaChart
              data={weeklyShipmentData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="deliveredGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="inTransitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="delivered"
                stroke="#16a34a"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#deliveredGrad)"
              />
              <Area
                type="monotone"
                dataKey="inTransit"
                stroke="#2563eb"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#inTransitGrad)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 2. Shipment Status Breakdown Bar Chart */}
      <Card className="lg:col-span-3 border">
        <CardHeader>
          <CardTitle>Parcel Status Distribution</CardTitle>
          <CardDescription>
            Proportion of platform orders by operational status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={statusChartConfig} className="h-72 w-full">
            <BarChart
              data={statusDistributionData}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 15, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {statusDistributionData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={
                      entry.name === "Delivered"
                        ? "#16a34a"
                        : entry.name === "In Transit"
                          ? "#2563eb"
                          : entry.name === "Assigned"
                            ? "#8b5cf6"
                            : "#f59e0b"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCharts;
