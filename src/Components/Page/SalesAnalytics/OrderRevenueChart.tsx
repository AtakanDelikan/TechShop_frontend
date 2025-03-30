import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: Record<number, number[]>;
  isRevenue?: boolean;
}

type ViewMode = "yearly-quarters" | "yearly-months" | "daily";
type YearData = { year: number; isLeapYear: boolean };

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

function OrderRevenueChart({ data, isRevenue = true }: Props) {
  // State management
  const [viewMode, setViewMode] = useState<ViewMode>("yearly-quarters");
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [showMonthModal, setShowMonthModal] = useState<boolean>(false);
  const [selectedYears, setSelectedYears] = useState<number[]>(
    Object.keys(data)
      .map(Number)
      .sort((a, b) => b - a) // Sort descending (newest first)
      .slice(0, 2) // Default: two most recent years
  );

  // Prepare year information
  const availableYears: YearData[] = useMemo(
    () =>
      Object.keys(data).map((year) => ({
        year: Number(year),
        isLeapYear: data[Number(year)].length === 366,
      })),
    //.sort((a, b) => b.year - a.year), // Sort years descending
    [data]
  );

  // Create consistent color mapping
  const yearColorMap = useMemo(() => {
    const map: Record<number, string> = {};
    availableYears.forEach((yearData, index) => {
      map[yearData.year] = COLOR_PALETTE[index % COLOR_PALETTE.length];
    });
    return map;
  }, [availableYears]);

  // Validate all year data lengths
  for (const [year, yearData] of Object.entries(data)) {
    const expectedLength = Number(year) % 4 === 0 ? 366 : 365;
    if (yearData.length !== expectedLength) {
      return (
        <div className="alert alert-danger">
          Error: Data for {year} should have {expectedLength} days
        </div>
      );
    }
  }

  // Data processing functions
  const getQuarterlyData = (yearData: YearData) => {
    const quarters = [
      { name: "Q1", start: 0, end: yearData.isLeapYear ? 90 : 89 },
      {
        name: "Q2",
        start: yearData.isLeapYear ? 91 : 90,
        end: yearData.isLeapYear ? 181 : 181,
      },
      {
        name: "Q3",
        start: yearData.isLeapYear ? 182 : 182,
        end: yearData.isLeapYear ? 273 : 273,
      },
      {
        name: "Q4",
        start: yearData.isLeapYear ? 274 : 274,
        end: data[yearData.year].length - 1,
      },
    ];

    return quarters.map((q) => ({
      name: q.name,
      [`${yearData.year}`]: data[yearData.year]
        .slice(q.start, q.end + 1)
        .reduce((sum, val) => sum + val, 0),
    }));
  };

  const getMonthlyData = (yearData: YearData) => {
    const months = [
      { name: "Jan", days: 31 },
      { name: "Feb", days: yearData.isLeapYear ? 29 : 28 },
      { name: "Mar", days: 31 },
      { name: "Apr", days: 30 },
      { name: "May", days: 31 },
      { name: "Jun", days: 30 },
      { name: "Jul", days: 31 },
      { name: "Aug", days: 31 },
      { name: "Sep", days: 30 },
      { name: "Oct", days: 31 },
      { name: "Nov", days: 30 },
      { name: "Dec", days: 31 },
    ];

    let dayIndex = 0;
    return months.map((month, index) => {
      const monthlyRevenue = data[yearData.year]
        .slice(dayIndex, dayIndex + month.days)
        .reduce((sum, val) => sum + val, 0);
      dayIndex += month.days;
      return {
        name: month.name,
        [`${yearData.year}`]: monthlyRevenue,
        monthIndex: index,
      };
    });
  };

  const getDailyData = (year: number, monthIndex: number) => {
    const yearData = availableYears.find((y) => y.year === year);
    if (!yearData) return [];

    const months = [
      31,
      yearData.isLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    let startDay = 0;
    for (let m = 0; m < monthIndex; m++) {
      startDay += months[m];
    }

    const monthDays = months[monthIndex];
    const monthName = new Date(year, monthIndex, 1).toLocaleString("default", {
      month: "short",
    });

    return Array.from({ length: monthDays }, (_, i) => ({
      name: `${i + 1}`,
      [`${year}`]: data[year][startDay + i],
      date: `${monthName} ${i + 1}`,
    }));
  };

  const getCombinedChartData = () => {
    if (viewMode === "yearly-quarters") {
      const allQuarters = selectedYears.map((year) => {
        const yearData = availableYears.find((y) => y.year === year);
        return yearData ? getQuarterlyData(yearData) : [];
      });

      return allQuarters[0]?.map((q, i) => {
        const combined: any = { name: q.name };
        selectedYears.forEach((year, idx) => {
          combined[year] = allQuarters[idx][i][year];
        });
        return combined;
      });
    } else if (viewMode === "yearly-months") {
      const allMonths = selectedYears.map((year) => {
        const yearData = availableYears.find((y) => y.year === year);
        return yearData ? getMonthlyData(yearData) : [];
      });

      return allMonths[0]?.map((m, i) => {
        const combined: any = { name: m.name };
        selectedYears.forEach((year, idx) => {
          combined[year] = allMonths[idx][i][year];
        });
        return combined;
      });
    } else {
      const allDays = selectedYears.map((year) =>
        getDailyData(year, selectedMonth)
      );
      const maxDays = Math.max(...allDays.map((days) => days.length));

      return Array.from({ length: maxDays }, (_, i) => {
        const combined: any = { name: `${i + 1}` };
        selectedYears.forEach((year, idx) => {
          combined[year] =
            i < allDays[idx].length ? allDays[idx][i][year] : null;
        });
        return combined;
      });
    }
  };

  const chartData = getCombinedChartData();
  const firstYearData = availableYears.find((y) => y.year === selectedYears[0]);
  const monthlyData = firstYearData ? getMonthlyData(firstYearData) : [];

  const handleDailyViewClick = () => {
    setShowMonthModal(true);
  };

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setViewMode("daily");
    setShowMonthModal(false);
  };

  const toggleYearSelection = (year: number) => {
    if (selectedYears.length === 1 && selectedYears[0] === year) return;
    setSelectedYears(
      (prev) =>
        prev.includes(year)
          ? prev.filter((y) => y !== year)
          : [...prev, year].sort((a, b) => b - a) // Keep sorted descending
    );
  };

  return (
    <div
      className="revenue-chart-container p-5 m-5 card"
      style={{
        // border: "2px solid gray",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Month Selection Modal */}
      <div
        className={`modal fade ${showMonthModal ? "show" : ""}`}
        style={{ display: showMonthModal ? "block" : "none" }}
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Month</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowMonthModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {monthlyData.map((month) => (
                  <div key={month.name} className="col-3 mb-2">
                    <button
                      className={`btn w-100 ${
                        selectedMonth === month.monthIndex
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handleMonthSelect(month.monthIndex)}
                    >
                      {month.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowMonthModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {showMonthModal && <div className="modal-backdrop fade show"></div>}

      <div>
        <span className="chart-controls mb-4">
          {/* Year Selection */}
          <div className="mb-3">
            <h6>Select Years to Compare:</h6>
            <div className="btn-group flex-wrap" role="group">
              {availableYears.map((yearData) => (
                <button
                  key={yearData.year}
                  onClick={() => toggleYearSelection(yearData.year)}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: selectedYears.includes(yearData.year)
                      ? yearColorMap[yearData.year]
                      : "transparent",
                    color: selectedYears.includes(yearData.year)
                      ? "white"
                      : yearColorMap[yearData.year],
                    borderColor: yearColorMap[yearData.year],
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                >
                  {yearData.year}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Selection */}
          <div className="btn-group mb-3" role="group">
            <button
              onClick={() => setViewMode("yearly-quarters")}
              className={`btn ${
                viewMode === "yearly-quarters"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setViewMode("yearly-months")}
              className={`btn ${
                viewMode === "yearly-months"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={handleDailyViewClick}
              className={`btn ${
                viewMode === "daily" ? "btn-primary" : "btn-outline-primary"
              }`}
            >
              Daily
              {viewMode === "daily" && (
                <span className="">
                  {" ("}
                  {monthlyData[selectedMonth]?.name}
                  {") "}
                </span>
              )}
            </button>
          </div>
        </span>
        <span style={{ display: "inline-block", width: "70%" }}>
          <h2 style={{ textAlign: "center" }}>
            {isRevenue ? "Revenue" : "Orders"} Trend Analysis
          </h2>
        </span>
      </div>

      <div className="chart-wrapper" style={{ height: "500px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#999" />
            <XAxis
              dataKey="name"
              angle={viewMode === "daily" ? -45 : 0}
              height={viewMode === "daily" ? 60 : 40}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(value) =>
                `${isRevenue ? "€" : ""}${value?.toLocaleString() ?? "0"}`
              }
              width={80}
              label={{
                value: `${isRevenue ? "Revenue (€)" : "Number of Orders"}`,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${isRevenue ? "€" : ""}${Number(value).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`,
                name,
              ]}
              labelFormatter={(label) =>
                viewMode === "daily" ? `Day ${label}` : label
              }
            />
            <Legend />
            {selectedYears.map((year) => (
              <Line
                key={year}
                type="monotone"
                dataKey={year.toString()}
                stroke={yearColorMap[year]}
                strokeWidth={2}
                dot={viewMode !== "daily"}
                activeDot={{ r: 8 }}
                name={`${year} ${isRevenue ? "Revenue" : "Orders"}`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default OrderRevenueChart;
