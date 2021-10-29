import { useMemo } from "react";
import styled from "styled-components";
import { useTimetableState } from "../contexts/TimetableContext";
import { CourseEvent } from "../types";
import { differenceInMinutesOfDay } from "../utils/TimeUtils";

export default function EventItem({
  info,
  leftPercent,
  widthPercent,
}: {
  info: CourseEvent;
  leftPercent: number;
  widthPercent: number;
}) {
  const { timeStart, minutesPerVertUnit, vertUnit } =
    useTimetableState();
  const { start, end } = info.time;

  const top = useMemo(
    () => differenceInMinutesOfDay(start, timeStart) / minutesPerVertUnit!,
    [start, timeStart, minutesPerVertUnit]
  );
  const height = useMemo(
    () => differenceInMinutesOfDay(end, start) / minutesPerVertUnit!,
    [end, start, minutesPerVertUnit]
  );

  console.log(info);
  console.log(leftPercent);
  console.log(widthPercent);
  console.log(top, height);

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
