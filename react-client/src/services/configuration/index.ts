import axios from "axios";

const baseURL = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : `:443`}`;
export const axiosClient = axios.create({
    baseURL,
    timeout: 3000
});