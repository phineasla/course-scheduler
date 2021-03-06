import { set, setDay, differenceInMinutes, toDate, compareAsc } from "date-fns";

const unixEpoch = { year: 1970, month: 0, date: 1 };

/**
 * Shorthand for `new Date(0)`, [`setDay()`](https://date-fns.org/v2.25.0/docs/setDay)
 * and [`set()`](https://date-fns.org/v2.25.0/docs/set)
 * @returns Date
 */
export function setOnly({
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
}) {
  return set(day != null ? setDay(0, day) : 0, {
    hours: hour,
    minutes: min,
    seconds: sec,
    milliseconds: ms,
  });
}

/**
 * Get the Date object with year, month, date as to Unix Epoch
 * @param date - the given date
 */
export function getTimeOfDay(date: Date | number) {
  return set(toDate(date), unixEpoch);
}

/**
 * Get the signed number of full (rounded towards 0) minutes between the given time of day.
 * This means that year, month and date are removed.
 * @param dateLeft - the later date
 * @param dateRight - the earlier date
 * @param options - see [differenceInMinutes](https://date-fns.org/v2.25.0/docs/differenceInMinutes)
 */
export function differenceInMinutesOfDay(
  dateLeft: Date | number,
  dateRight: Date | number,
  options?: { roundingMethod: string }
) {
  const left = toDate(dateLeft);
  const right = toDate(dateRight);
  return differenceInMinutes(
    left,
    set(right, {
      year: left.getFullYear(),
      month: left.getMonth(),
      date: left.getDate(),
    }),
    options
  );
}

/**
 * Is the given time within the interval (ignoring date).
 * @param time - the time to check.
 * @param interval - the interval to check.
 */
export function isWithinTimeInterval(time: Date | number, interval: Interval) {
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
}

/**
 * Compare the two times (ignoring dates) and return 1 if the first date is after the second, 
 * -1 if the first date is before the second or 0 if dates are equal.
 * @see https://date-fns.org/v2.25.0/docs/compareAsc
 */
export function compareAscTime(
  dateLeft: Date | number,
  dateRight: Date | number
) {
  const left = toDate(dateLeft);
  const right = toDate(dateRight);
  return compareAsc(
    dateLeft,
    set(right, {
      year: left.getFullYear(),
      month: left.getMonth(),
      date: left.getDate(),
    })
  );
}

