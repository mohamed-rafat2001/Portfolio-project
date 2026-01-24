import mainApi from "../../../api/mainApi";

export const trackVisit = async () => {
	const res = await mainApi.post("analytics/track");
	return res.data;
};
