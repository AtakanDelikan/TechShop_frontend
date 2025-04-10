import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLOR_PALETTE = [
  "#8884d8", // Purple
  "#82ca9d", // Green
  "#ffc658", // Orange
  "#ff8042", // Red
  "#0088FE", // Blue
  "#A28DFF", // Light Purple
  "#00C49F", // Teal
  "#FFBB28", // Yellow
];

interface LabelProps {
  name: string;
  value: number;
  percent: number;
}

// Custom Label Function to Show Name, Value, and Percentage
const renderLabel = ({ name, percent }: LabelProps): string => {
  return `${name}: (${(percent * 100).toFixed(0)}%)`;
};

interface Props {
  data: Record<string, number>;
  title: string;
}

function AnalyticsPieChart({ data, title }: Props) {
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
        <div style={{ width: "100%", height: "100%" }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                label={renderLabel} // Custom Label
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLOR_PALETTE[index % COLOR_PALETTE.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPieChart;
