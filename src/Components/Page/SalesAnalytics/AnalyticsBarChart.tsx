import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const COLOR_PALETTE = [
  "#8884d8", // purple
  "#82ca9d", // green
  "#ffc658", // orange
  "#ff8042", // red
  "#0088FE", // blue
  "#A28DFF", // light purple
  "#00C49F", // teal
  "#FFBB28", // yellow
];

interface Props {
  data: Record<string, number>;
  title: string;
  yAxisLabel: string;
}

function AnalyticsBarChart({ data, title, yAxisLabel }: Props) {
  // Convert the data prop (Record<string, number>) into an array of objects
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div>
      <h2 className="m-3" style={{ textAlign: "center" }}>
        {title}
      </h2>
      <div className="chart-wrapper" style={{ height: "350px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: `${yAxisLabel}`,
                angle: -90,
                position: "insideLeft",
                offset: -10,
                style: { textAnchor: "middle" },
              }}
            />
            <Bar dataKey="value" label={{ position: "top", fill: "black" }}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLOR_PALETTE[index % COLOR_PALETTE.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsBarChart;
