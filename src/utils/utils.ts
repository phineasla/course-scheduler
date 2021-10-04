import { Dayjs } from "dayjs";

export const timeRange = (
  start: Dayjs,
  end: Dayjs,
  step: number,
  unit: string
) => {
//   if (end.isBefore(start)) throw "Wrong time order";
  const current = start;
  const range = [start];
  while (current.isBefore(end)) {
    range.push(current.add(step, unit));
  }
  return range;
};
