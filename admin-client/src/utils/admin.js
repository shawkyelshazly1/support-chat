import axiosInstance from "../axiosConfig";

export const validateAuth = async () => {
	let response = await axiosInstance
		.get("/")
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			return { error: error.response.data.error };
		});

	return response;
};
