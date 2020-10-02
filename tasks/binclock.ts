import { braille, mapBraille } from "../lib/braille.ts";
import type { ScheduleTask } from "../lib/schedule.ts";

const update = () => {
  const now = new Date();
  const seconds = (now.getTime() / 1000);
  return String.fromCharCode(
    mapBraille(seconds / 256),
    mapBraille(seconds),
  );
};

export const binclock: ScheduleTask<string> = {
  initialValue: update(),
  update,
  interval: 1000,
};

// const map = [
//   '⠀', '⢀', '⠠', '⢠', '⠐', '⢐', '⠆', '⢰', '⠈', '⢈',
//   '⡀', '⣀', '⡠', '⣠', '⡐', '⣐', '⡰', '⣰', '⡈', '⣈',
//   '⠄', '⢄', '⠤', '⢤', '⠔', '⢔', '⠴', ''
// ]
