import axios, { AxiosResponse } from "axios";


export class APIClientConfig {
	private _apiURL : string = ""
	private _token : string = ""
	tokenCallback ?: () => string | undefined


	set apiURL(apiURL : string) {
		this._apiURL = apiURL;
		axios.defaults.baseURL = apiURL;
	}
	get apiURL() : string {
		return this._apiURL
	}
}

export class APIClient {
	private constructor() {
	}
	public static shared = new APIClient()
	public config = new APIClientConfig()
	public logoutCallback ?: () => void

	// initAxios() {
	//     const self = this
	//     axios.interceptors.request.use(function (config) {
	//         let token:string | undefined
	//         if(self.config.tokenCallback) {
	//             token = self.config.tokenCallback()
	//         }
	//         if (token && token !== "") {
	//             config.headers!["token"] = token;
	//         }
	//         return config;
	//     });

	//     axios.interceptors.response.use(function (response) {
	//         return response;
	//     }, function (error) {
	//         var msg = "";
	//         switch (error.response && error.response.status) {
	//             case 400:
	//                 msg = error.response.data.msg;
	//                 break;
	//             case 404:
	//                 msg = "请求地址没有找到（404）"
	//                 break;
	//             case 401:
	//                 if(self.logoutCallback) {
	//                     self.logoutCallback()
	//                 }
	//             default:
	//                 msg = "未知错误"
	//                 break;
	//         }
	//         return Promise.reject({ error: error, msg: msg, status: error?.response?.status });
	//     });
	// }

	get<T>(path : string,data:any) {

		return uni.request({
			url: `${this.config.apiURL}${path}`,
			method: "GET",
			data:data,
		})
	}
	post(path : string, data ?: any) {
		return uni.request({
			url: `${this.config.apiURL}${path}`,
			method: "POST",
			data: data,
		})
	}
}
