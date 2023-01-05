import axios, { AxiosInstance } from "axios";
import { getAuthFromCache } from "./AuthenticationClient";
import IHateOASLink from "../models/IHateOASLink";

interface ICONFIG {
  baseURL: string;
}

export interface IArrayRestResponse<TType> {
  data: Array<TType>;
  offset: number;
  limit: number;
  total: number;
  links?: Array<IHateOASLink>;
}

export default class RESTClient {
  protected axios: AxiosInstance;
  protected baseUrl: string;

  constructor(config: ICONFIG) {
    const { baseURL } = config;
    this.baseUrl = baseURL;
    this.axios = axios.create({ baseURL });

    this.axios.interceptors.request.use(
      async (config) => {
        if (!config) {
          return config;
        }
        if (!config.headers) {
          config.headers = {};
        }

        const auth = await getAuthFromCache();
        if (!auth) {
          return config;
        }

        const jwt = auth.user!;

        config.headers["Authorization"] = `${jwt.token_type.toLowerCase()} ${jwt.access_token}`;

        return config;
      },
      (error) => {
        throw error;
      }
    );

    // Add a 401 response interceptor
    this.axios.interceptors.response.use((response) => response, function (error) {
      if (!error.response) {
        throw error;
      }

      switch (error.response.status) {
        case 401:
          //localStorage.removeItem();
          //window.location.reload();
          // alert(LOCALIZATION.ACCESS_DENIED.MESSAGE)
          throw error;
        case 403:
          throw error;
        default:
          throw error;
      }
    });
  }
}
