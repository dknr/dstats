export type ScheduleTask<T> = {
  initialValue: T;
  update: (props: TaskUpdateProps<T>) => T | Promise<T>;
  interval?: number;
  timeout?: number;
};
type TaskUpdateProps<T> = {
  resolve: () => void;
  value: T;
};
type Schedule<T> = {
  [S in keyof T]: ScheduleTask<T[S]>;
};

export const runSchedule = async <T>(
  schedule: Schedule<T>,
  onUpdate: (state: T) => void,
): Promise<T> => {
  let intervals = [] as number[];
  let timeouts = [] as number[];
  let state = {} as T;

  for (let key in schedule) {
    state[key] = schedule[key].initialValue;
  }
  onUpdate(state);

  await new Promise(async (resolve) => {
    for (let key in schedule) {
      const task = schedule[key];

      const update = async () => {
        state[key] = await task.update({
          resolve,
          value: state[key],
        });
        onUpdate(state);
      };

      if (task.interval !== undefined) {
        intervals.push(setInterval(update, task.interval));
      }
      if (task.timeout !== undefined) {
        timeouts.push(setTimeout(update, task.timeout));
      }
    }
  });

  intervals.forEach(clearInterval);
  timeouts.forEach(clearTimeout);
  return state;
};
