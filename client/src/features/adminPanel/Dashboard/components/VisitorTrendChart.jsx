import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { motion as Motion } from "framer-motion";

const VisitorTrendChart = ({ data }) => {
	return (
		<Motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm"
		>
			<div className="flex items-center justify-between mb-8">
				<div>
					<h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
						Visitor Trends
					</h3>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Website traffic over the last 7 days
					</p>
				</div>
			</div>

			<div className="h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={data}>
						<defs>
							<linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
								<stop offset="95%" stopColor="#f97316" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid
							strokeDasharray="3 3"
							vertical={false}
							stroke="#f1f5f9"
							className="dark:stroke-gray-800"
						/>
						<XAxis
							dataKey="date"
							axisLine={false}
							tickLine={false}
							tick={{ fill: "#94a3b8", fontSize: 12 }}
							dy={10}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fill: "#94a3b8", fontSize: 12 }}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "#1a1a1a",
								border: "none",
								borderRadius: "12px",
								color: "#fff",
							}}
							itemStyle={{ color: "#f97316" }}
						/>
						<Area
							type="monotone"
							dataKey="count"
							stroke="#f97316"
							strokeWidth={3}
							fillOpacity={1}
							fill="url(#colorVisitors)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</Motion.div>
	);
};

export default VisitorTrendChart;
