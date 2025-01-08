import { Responsive, WidthProvider } from "react-grid-layout";
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
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const salesData = [
  { name: "Jan", value: 400 },
  { name: "Fev", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Abr", value: 800 },
  { name: "Mai", value: 500 },
];

const usersData = [
  { name: "Jan", users: 1500, active: 1000 },
  { name: "Fev", users: 2000, active: 1300 },
  { name: "Mar", users: 1800, active: 1200 },
  { name: "Abr", users: 2400, active: 1800 },
  { name: "Mai", users: 2800, active: 2000 },
];

interface AppProps {
  className?: string;
  rowHeight?: number;
}

function App({ className = "layout", rowHeight = 30 }: AppProps) {
  // Layout inicial para o grid
  const layout = [
    { i: "sales", x: 0, y: 0, w: 6, h: 8 },
    { i: "users", x: 6, y: 0, w: 6, h: 8 },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <ResponsiveGridLayout
        className={className}
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={rowHeight}
        isDraggable
        isResizable
      >
        <div key="sales" className="bg-white p-4 rounded-lg shadow">
          <div style={{ width: "100%", height: "100%", minHeight: "200px" }}>
            <h2 className="text-xl font-bold mb-4">Vendas Mensais</h2>
            <ResponsiveContainer>
              <LineChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  name="Vendas"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div key="users" className="bg-white p-4 rounded-lg shadow">
          <div style={{ width: "100%", height: "100%", minHeight: "200px" }}>
            <h2 className="text-xl font-bold mb-4">Usuários Ativos</h2>
            <ResponsiveContainer>
              <LineChart
                data={usersData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  name="Total Usuários"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="#82ca9d"
                  name="Usuários Ativos"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;
