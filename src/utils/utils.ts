import { Dayjs } from "dayjs";

export const timeRange = (
  start: Dayjs,
  end: Dayjs,
  step: number,
  unit: string
) => {
  if (end.isBefore(start)) throw new Error("Wrong time order");
  const range = [start];
  let current = start;
  while (current.isBefore(end)) {
    current = current.add(step, unit);
    range.push(current);
  }
  return range;
};
