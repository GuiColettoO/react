import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Chart from "./Components/Chart";
import { LineChartConfig } from "./@types/chart/LineChart/lineChartConfig";

const ResponsiveGridLayout = WidthProvider(Responsive);

const chartConfigs: LineChartConfig[] = [
  {
    id: "sales",
    title: "Vendas Mensais",
    data: [
      { name: "Jan", value: 400 },
      { name: "Fev", value: 300 },
      { name: "Mar", value: 600 },
      { name: "Abr", value: 800 },
      { name: "Mai", value: 500 },
    ],
    lines: [
      {
        dataKey: "value",
        stroke: "#8884d8",
        name: "Vendas",
      },
    ],
    layout: { x: 0, y: 0, w: 6, h: 8 },
  },
  {
    id: "users",
    title: "Usuários Ativos",
    data: [
      { name: "Jan", users: 1500, active: 1000 },
      { name: "Fev", users: 2000, active: 1300 },
      { name: "Mar", users: 1800, active: 1200 },
      { name: "Abr", users: 2400, active: 1800 },
      { name: "Mai", users: 2800, active: 2000 },
    ],
    lines: [
      {
        dataKey: "users",
        stroke: "#8884d8",
        name: "Total Usuários",
      },
      {
        dataKey: "active",
        stroke: "#82ca9d",
        name: "Usuários Ativos",
      },
    ],
    layout: { x: 6, y: 0, w: 6, h: 8 },
  },
];

interface AppProps {
  className?: string;
  rowHeight?: number;
}

export const App = ({ className = "layout", rowHeight = 30 }: AppProps) => {
  const [selectedCharts, setSelectedCharts] = React.useState<string[]>([
    "sales",
    "users",
  ]);

  const layout = chartConfigs
    .filter((chart) => selectedCharts.includes(chart.id))
    .map((chart) => ({
      i: chart.id,
      ...chart.layout,
    }));

  const toggleChart = (chartId: string) => {
    setSelectedCharts((prev) =>
      prev.includes(chartId)
        ? prev.filter((id) => id !== chartId)
        : [...prev, chartId]
    );
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Selecione os gráficos:</h2>
        {chartConfigs.map((chart) => (
          <button
            key={chart.id}
            onClick={() => toggleChart(chart.id)}
            className={`mr-2 px-4 py-2 rounded ${
              selectedCharts.includes(chart.id)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {chart.title}
          </button>
        ))}
      </div>

      <ResponsiveGridLayout
        className={className}
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={rowHeight}
        isDraggable
        isResizable
      >
        {chartConfigs
          .filter((chart) => selectedCharts.includes(chart.id))
          .map((chart) => (
            <div key={chart.id} className="bg-white p-4 rounded-lg shadow">
              <Chart
                title={chart.title}
                data={chart.data}
                lines={chart.lines}
              />
            </div>
          ))}
      </ResponsiveGridLayout>
    </div>
  );
};
