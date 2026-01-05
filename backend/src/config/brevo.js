import axios from "axios";
import env from "./env.js";

const brevoClient = axios.create({
  baseURL: "https://api.brevo.com/v3",
  headers: {
    "api-key": env.brevoApiKey,
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  timeout: 10000
});

export default brevoClient;
