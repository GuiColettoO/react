import { dataLineChart } from "./dataLineChart";

export interface LineChartConfig {
  id: string;
  title: string;
  data: dataLineChart[];
  lines: Array<{
    dataKey: string;
    stroke: string;
    name: string;
  }>;
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}
