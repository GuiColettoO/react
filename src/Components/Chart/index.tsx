import React from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

interface ChartProps {
  data: DataPoint[];
  title: string;
  showUV?: boolean;
  showPV?: boolean;
  showAMT?: boolean;
}

function Chart({
  data,
  title,
  showUV = true,
  showPV = true,
  showAMT = false,
}: ChartProps) {
  return (
    <Card className="w-full h-full min-h-[400px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {" "}
        {/* Altura fixa para o container do gráfico */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {showPV && (
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            )}
            {showUV && <Line type="monotone" dataKey="uv" stroke="#82ca9d" />}
            {showAMT && <Line type="monotone" dataKey="amt" stroke="#ff7300" />}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default Chart;
