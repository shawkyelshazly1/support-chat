import axios from "axios";

let axiosInstance = axios.create({
	baseURL:
		import.meta.env.VITE_NODE_ENV === "production"
			? "https://support-desk-api-9wy1.onrender.com/admin/v1/"
			: "http://localhost:5000/admin/v1/",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json; charset=UTF-8",
		authorization: `Bearer ${localStorage.getItem("accessToken")}`,
	},
	withCredentials: true,
});

export default axiosInstance;
