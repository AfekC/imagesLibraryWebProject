import { fetchWeatherApi } from 'openmeteo';
import { Weather } from "../../types";

const params = {
    "latitude": 34.84243,
    "longitude": 31.9688,
    "current": "temperature_2m",
    "forecast_days": 1
};
const url = "https://api.open-meteo.com/v1/forecast";


export const getCurrentWeather = async (): Promise<Weather> => {
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    return {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature: current.variables(0)!.value(),
    };
}