import mainApi from "../../../../api/mainApi";

export const getAnalyticsStats = async () => {
	const res = await mainApi.get("analytics/stats");
	return res.data;
};
