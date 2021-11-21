import { useMemo } from "react";
import "../styles/EventItem.scss";
import styled from "styled-components";
import { useTimetableState } from "../contexts/TimetableContext";
import { Box, CourseEvent } from "../types";
import { differenceInMinutesOfDay } from "../utils/TimeUtils";

const EventItemWrapper = styled.div<Box>`
  top: ${(p) => p.top};
  height: ${(p) => p.height};
  left: ${(p) => p.left};
  width: ${(p) => p.width};
`;

export default function EventItem({
  info,
  leftPercent,
  widthPercent,
}: {
  info: CourseEvent;
  leftPercent: number;
  widthPercent: number;
}) {
  const { timeStart, minutesPerVertUnit, vertUnit } = useTimetableState();
  const { start, end } = info.time;

  // Don't know if this is "heavy" enough to useMemo
  const box = useMemo((): Box => {
    const withVertUnit = (value: number): string => `${value}${vertUnit}`;
    return {
      top: withVertUnit(
        differenceInMinutesOfDay(start, timeStart) / minutesPerVertUnit
      ),
      height: withVertUnit(
        differenceInMinutesOfDay(end, start) / minutesPerVertUnit
      ),
      left: leftPercent === 0 ? "-1px" : `calc(${leftPercent * 100}% + 1px)`,
      width:
        widthPercent === 0
          ? `calc(${widthPercent * 100}% + 1px)`
          : `calc(${widthPercent * 100}% - 1px)`,
    };
  }, [
    start,
    end,
    timeStart,
    minutesPerVertUnit,
    vertUnit,
    leftPercent,
    widthPercent,
  ]);

  console.log(info);
  console.log(leftPercent);
  console.log(widthPercent);
  console.log(box);

  return <EventItemWrapper className="event-item" {...box}></EventItemWrapper>;
}

// function timeIntervalToX(
//   interval: Interval,
//   clampInterval: Interval,
//   minutesPerY: number,
//   verticalUnit: string
// ) {
//   if (
//     !isWithinTimeInterval(interval.start, clampInterval) &&
//     !isWithinTimeInterval(interval.end, clampInterval)
//   )
//     return null;
//   const { start, end } = interval;
//   const { start: clampStart } = clampInterval;
//   const top = differenceInMinutesOfDay(start, clampStart) / minutesPerY;
//   const height = differenceInMinutesOfDay(end, start) / minutesPerY;
//   return {
//     top: { value: top, unit: verticalUnit },
//     height: { value: height, unit: verticalUnit },
//   };
// }
