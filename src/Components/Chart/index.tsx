import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type data = {
  name?: string;
  users?: number;
  value?: number;
  active?: number;
};

interface LineConfig {
  dataKey: string;
  stroke: string;
  name: string;
}

interface ChartProps {
  title: string;
  data: data[];
  lines: LineConfig[];
}

function Chart({ title, data, lines }: ChartProps) {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "200px" }}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={line.name}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
