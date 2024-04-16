"use client";

import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
// import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
// import useData from "~/hooks/useData";
// import { useValue } from "~/hooks/useValue";

// const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov","Dec"];
// const randomNumberGenerator = () => Math.floor(Math.random() * 100);
// const dunmmyData = useData(months).processKeys(months, randomNumberGenerator);
// const data2 = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
export const dummyData = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

type Size = number | `${number}%` | 'auto';

interface AxisProps {
  fill?: string;
  fontSize?: number;
  tickLine?: boolean | [x: boolean, y: boolean];
  axisLine?: boolean | [x: boolean, y: boolean];
  label?: {
    value?: string;
    color?: string;
    position?: "top" | "bottom" | "left" | "right" | "inside" | "outside";
  };
  hide?: boolean;
}

interface BarGraphProps {
  data?: {
    name: string;
    [key: string]: unknown;
  }[];
  xAxis?: AxisProps;
  yAxis?: AxisProps;
  size?: [width: Size | undefined, height: Size | undefined] | { width?: Size | undefined, height?: Size | undefined };
  barDataKey?: string; // Key for bar data
  barFillColor?: string;
  barRadius?: [number, number, number, number];
  showAxis?: boolean;
  margin?: {
    top: number | undefined;
    right: number | undefined;
    bottom: number | undefined;
    left: number | undefined;
  }
}

export const BarGraph: React.FC<BarGraphProps> = ({
  data,
  // xAxis = {},
  // yAxis = {},
  size = { width: '100%', height: 350 },
  barDataKey = "total",
  // barFillColor = "currentColor",
  // barRadius = [4, 4, 0, 0],
  // showAxis = true,
  margin
}) => {
  const chartWidth = Array.isArray(size) ? size[0] : size?.width ?? '100%';
  const chartHeight = Array.isArray(size) ? size[1] : size?.height ?? '100%';

  return (
    <ResponsiveContainer width={chartWidth} height={chartHeight}>
      <BarChart data={data ?? dummyData} margin={margin}>
      <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey={barDataKey ?? "name"}
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        {/* { showAxis && (
        <XAxis
          dataKey="name"
          stroke={xAxis.fill ?? "#888888"}
          fontSize={xAxis.fontSize ?? 12}
          tickLine={useValue(xAxis.tickLine).get(0, false)}
          axisLine={useValue(xAxis.axisLine).get(0, false)}
          label={{ ...xAxis.label }}
          />
        )} */}
        {/* { showAxis && (
          <YAxis
            stroke={yAxis.fill ?? "#888888"}
            fontSize={yAxis.fontSize ?? 12}
            tickLine={useValue(xAxis.tickLine).get(1, false)}
            axisLine={useValue(xAxis.axisLine).get(1, false)}
            label={{ ...yAxis.label }}
            tickFormatter={(value) => `$${value}`}
          />
        )}
        <Bar
          dataKey={barDataKey}
          fill={barFillColor}
          radius={barRadius}
          className="fill-primary"
        /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};