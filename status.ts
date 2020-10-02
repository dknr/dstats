import { runSchedule } from "./lib/schedule.ts";
import { weather } from "./tasks/weather.ts";
import { time } from "./tasks/time.ts";
import { battery } from "./tasks/battery.ts";
// import { binclock } from './tasks/binclock.ts';
import { load } from './tasks/load.ts';

if (import.meta.main) {
  await runSchedule({
    time,
    weather,
    battery,
    // binclock,
    load,
  }, async (s) => {
    console.log(s);
    const status = [
      s.load,
      '🌪' + s.weather.tempF + '℉',
      '🔋' + s.battery.capacity,
      s.time.time,
      // s.binclock,
    ].join(' ');
    const xsetroot = Deno.run({
      cmd: ["xsetroot", "-name", status],
    });
    await xsetroot.status();
    xsetroot.close();
  });
}