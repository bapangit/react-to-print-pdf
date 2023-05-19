import axios from "axios";
import { ApiEndPoints } from "Service/ApiEndPoints/endpoints";

const instance = axios.create({ baseURL: ApiEndPoints.Base });

export default instance;
