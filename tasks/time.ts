import type { ScheduleTask } from "../lib/schedule.ts";

type Time = {
  now: Date;
  time: string
}

const update = () => {
  const now = new Date();
  return {
    now,
    time: `${now.getHours()}:${now.getMinutes()}`,
  }
};

export const time: ScheduleTask<Time> = {
  initialValue: update(),
  update,
  interval: 6 * 1000,
};
