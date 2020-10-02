import type { ScheduleTask } from "../lib/schedule.ts"

type Battery = {
  capacity: number;
}

export const battery: ScheduleTask<Battery> = {
  initialValue: {
    capacity: 0,
  },
  update: async () => ({
    capacity: parseInt(await Deno.readTextFile('/sys/class/power_supply/BAT0/capacity'), 10),
  }),
  interval: 60 * 1000,
  timeout: 0,
};
