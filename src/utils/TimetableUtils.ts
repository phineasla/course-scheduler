import { Size, Course, CourseEvent } from "../types";
import { areIntervalsOverlapping, getDay, isBefore, isSameDay } from "date-fns";

export function sizeToString({ value, unit }: Size) {
  return `${value}${unit}`;
}

/**
 * Sort classes into days of the week, with Sunday is 0, Monday is 1...
 */
export function mapCourseToDayOfWeek(courses: Course[]) {
  const events: CourseEvent[][] = [...Array(7)].map(() => []);
  for (let course of courses) {
    const { intervals, info } = course;
    for (let intvl of intervals) {
      const { start, end } = intvl;
      if (!isSameDay(start, end) || !isBefore(start, end))
        throw new RangeError("Invalid course interval");
      events[getDay(start)].push({ time: intvl, info: info });
    }
  }
  return events;
}

/**
 * Checks how many columns the event can expand into, without colliding with other events.
 * @param ev
 * @param iCol
 * @param columns
 * @returns
 */
export function expandWidth(
  ev: CourseEvent,
  iCol: number,
  columns: CourseEvent[][]
) {
  let colSpan = 1;
  for (let i = iCol + 1; i < columns.length; i++) {
    const col = columns[i];
    for (let j = 0; j < col.length; j++) {
      const ev1 = col[j];
      if (areIntervalsOverlapping(ev.time, ev1.time)) return colSpan;
      colSpan++;
    }
  }
  return colSpan;
}
