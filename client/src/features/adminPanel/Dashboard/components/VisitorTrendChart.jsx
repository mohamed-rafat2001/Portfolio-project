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
import { HiArrowTrendingUp } from "react-icons/hi2";
import { useTheme } from "../../../../shared/context/ThemeContext";

const VisitorTrendChart = ({ data }) => {
	const { isDark } = useTheme();

	return (
		<Motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white dark:bg-[#0b1120] rounded-[3rem] p-10 border border-gray-100 dark:border-white/5 shadow-2xl h-full relative"
		>
			<div className="flex items-center justify-between mb-12">
				<div>
					<h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-2">
						Visitor Trend
					</h3>
					<p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
						LAST 7 DAYS
					</p>
				</div>
                <div className="w-12 h-12 bg-orange/10 border border-orange/20 rounded-2xl flex items-center justify-center text-orange shadow-2xl">
                    <HiArrowTrendingUp className="text-2xl" />
                </div>
			</div>

			<div className="h-[320px] w-full min-w-0">
				<ResponsiveContainer width="100%" height="100%" minWidth={0}>
					<AreaChart data={data}>
						<defs>
							<linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
								<stop offset="95%" stopColor="#f97316" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid
							strokeDasharray="4 4"
							vertical={false}
							stroke="currentColor"
							className="text-gray-200 dark:text-white/5"
						/>
						<XAxis
							dataKey="day"
							axisLine={false}
							tickLine={false}
							tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: '900' }}
							dy={15}
						/>
						<YAxis
                            hide
							axisLine={false}
							tickLine={false}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: isDark ? "#030712" : "#ffffff",
								border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
								borderRadius: "16px",
								fontSize: '12px',
                                fontWeight: '900',
                                textTransform: 'uppercase',
                                color: isDark ? "#ffffff" : "#111827",
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
							}}
							itemStyle={{ color: "#f97316" }}
                            cursor={{ stroke: '#f97316', strokeWidth: 2, strokeDasharray: '4 4' }}
						/>
						<Area
							type="monotone"
							dataKey="count"
							stroke="#f97316"
							strokeWidth={4}
							fillOpacity={1}
							fill="url(#colorVisitors)"
                            animationDuration={2000}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</Motion.div>
	);
};

export default VisitorTrendChart;
