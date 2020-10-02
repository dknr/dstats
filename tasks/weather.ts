import type { ScheduleTask } from "../lib/schedule.ts"

type Weather = {
  tempC: string;
  tempF: string;
}

export const weather: ScheduleTask<Weather> = {
  initialValue: {
    tempC: '--',
    tempF: '--',
  },
  update: async () => {
    const res = await fetch('https://api.weather.gov/stations/KFLG/observations/latest');
    const json = await res.json();
    console.log({res, json});
    const temp = json.properties.temperature.value;
    return {
      tempC: temp === null ? '??' : Math.round(temp).toString(),
      tempF: temp === null ? '??' : Math.round(temp * (9/5) + 32).toString(),
    };
  },
  interval: 5 * 60 * 1000,
  timeout: 60,
};
