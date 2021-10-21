import "./EventGrid.scss";
import styled from "styled-components";
import { Course, CourseEvent, Size, Box } from "../types";
import {
  differenceInMinutesOfDay,
  isWithinTimeInterval,
  sizeToString,
} from "../utils/utils";
import { getDay, isSameDay, isBefore, differenceInMinutes } from "date-fns";

export const EventGrid = ({
  courses,
  timeInterval,
  cellHeight,
  minutesPerCell,
}: {
  courses: Course[];
  timeInterval: Interval;
  cellHeight: Size;
  minutesPerCell: number;
}) => {
  const minutesPerY = minutesPerCell / cellHeight.value;
  const events = mapCourseToDayOfWeek(courses);

  // console.log(minutesPerCell);
  // console.log(cellHeight);
  // const t = events[1][0].interval;
  // console.log(differenceInMinutes(t.end, t.start));
  const testEvent = intervalToBox(
    events[1][0].interval,
    timeInterval,
    minutesPerY,
    cellHeight.unit
  );
  // console.log(testEvent);

  return (
    <div className="event-grid">
      <div>
        {/* <div
            className="event-box"
            style={{ top: "20px", left: "0%", height: 30, width: "22%" }}
          ></div>
          <div
            className="event-box"
            style={{ top: "20px", left: "25%", height: 100, width: "22%" }}
          ></div>
          <div
            className="event-box"
            style={{ top: "20px", left: "50%", height: 30, width: "22%" }}
          ></div>
          <div
            className="event-box"
            style={{ top: "20px", left: "75%", height: 30, width: "22%" }}
          ></div> */}
      </div>
      <div>
        <div
          className="event-box"
          style={{
            top: sizeToString(testEvent!.top),
            left: "0%",
            height: sizeToString(testEvent!.height),
            width: "100%",
          }}
        ></div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

/**
 * Sort classes into days of the week, with Sunday is 0, Monday is 1...
 */
const mapCourseToDayOfWeek = (courses: Course[]) => {
  const events: CourseEvent[][] = [...Array(7)].map(() => []);
  for (let course of courses) {
    const { intervals, info } = course;
    for (let intvl of intervals) {
      const { start, end } = intvl;
      if (!isSameDay(start, end) || !isBefore(start, end))
        throw new RangeError("Invalid course interval");
      events[getDay(start)].push({ interval: intvl, info: info });
    }
  }
  return events;
};

export const intervalToBox = (
  interval: Interval,
  clampInterval: Interval,
  minutesPerY: number,
  verticalUnit: string
): Box | null => {
  if (
    !isWithinTimeInterval(interval.start, clampInterval) &&
    !isWithinTimeInterval(interval.end, clampInterval)
  )
    return null;
  const { start, end } = interval;
  const { start: clampStart } = clampInterval;
  const top = differenceInMinutesOfDay(start, clampStart) / minutesPerY;
  const height = differenceInMinutesOfDay(end, start) / minutesPerY;
  return {
    top: { value: top, unit: verticalUnit },
    height: { value: height, unit: verticalUnit },
  };
};
