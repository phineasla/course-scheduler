import { useMemo } from "react";
import styled from "styled-components";
import { CourseEvent, Size } from "../types";
import {
  compareAscTime,
  differenceInMinutesOfDay,
  getTimeOfDay,
} from "../utils/Utils";

export default function EventItem({
  info,
  timelineStart,
  timelineEnd,
  minutesPerY,
  leftPercent,
  widthPercent,
}: {
  info: CourseEvent;
  timelineStart: Date;
  timelineEnd: Date;
  minutesPerY: number;
  leftPercent: number;
  widthPercent: number;
}) {
  console.log(info);
  console.log(leftPercent);
  console.log(widthPercent);
  const { start, end } = info.time;

  const top = useMemo(
    () => differenceInMinutesOfDay(start, timelineStart) / minutesPerY,
    [info.time]
  );

  return <div></div>;
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
