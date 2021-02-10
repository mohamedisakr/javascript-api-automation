import suprttest from "supertest";
import { baseUrl } from "../config/app-config";
const request = suprttest(baseUrl);

export default request;
