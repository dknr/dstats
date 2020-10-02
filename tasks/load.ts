import type { ScheduleTask } from "../lib/schedule.ts";

export const load: ScheduleTask<string> = {
  initialValue: "",
  update: () => {
    const loadavg = Deno.loadavg().join(" ");
    return loadavg;
  },
  interval: 10 * 1000,
  timeout: 0,
};
