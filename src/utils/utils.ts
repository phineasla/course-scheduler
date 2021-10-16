import {
  set,
  setDay,
  differenceInMinutes,
  isWithinInterval,
  setHours,
  toDate,
} from "date-fns";
import { Box } from "../types";

/**
 * Shorthand for `new Date(0)`, [`setDay()`](https://date-fns.org/v2.25.0/docs/setDay)
 * and [`set()`](https://date-fns.org/v2.25.0/docs/set)
 * @returns Date
 */
export const setOnly = (
  {
    day,
    hour,
    min,
    sec,
    ms,
  }: {
    day?: number;
    hour?: number;
    min?: number;
    sec?: number;
    ms?: number;
  },
  date: Date | number = 0
) => {
  return set(day != null ? setDay(date, day) : date, {
    hours: hour,
    minutes: min,
    seconds: sec,
    milliseconds: ms,
  });
};

/**
 * Is the given time within the interval (ignoring date).
 * @param time - the time to check.
 * @param interval - the interval to check.
 */
export const isWithinTimeInterval = (time: Date | number, interval: Interval) => {
  const startTime = toDate(interval.start);
  const date = {
    year: startTime.getFullYear(),
    month: startTime.getMonth(),
    date: startTime.getDate(),
  };
  const endTime = set(interval.end, date);
  const dirtyTime = set(time, date);
  if (startTime >= endTime) {
    endTime.setDate(endTime.getDate() + 1);
  }
  return dirtyTime >= startTime && dirtyTime <= endTime;
};

export const intervalToBox = (
  interval: Interval,
  clampInterval: Interval,
  minutesPerY: number,
  verticalUnit: string
): Box | null => {
  console.log(interval);
  console.log(clampInterval);
  if (
    !isWithinTimeInterval(interval.start, clampInterval) &&
    !isWithinTimeInterval(interval.end, clampInterval)
  )
    return null;
  const { start, end } = interval;
  const { start: clampStart, end: clampEnd } = clampInterval;
  const top = differenceInMinutes(start, clampStart) / minutesPerY;
  const height = differenceInMinutes(end, start) / minutesPerY;
  return {
    top: { value: top, unit: verticalUnit },
    height: { value: height, unit: verticalUnit },
  };
};
