import { useMemo } from "react";
import "../styles/Timetable.scss";
import styled from "styled-components";
import DayColumn from "./DayColumn";
import { Course, CourseEvent, Size, TimetableState } from "../types";
import { mapCourseToDayOfWeek, sizeToString } from "../utils/TimetableUtils";
import { format, eachMinuteOfInterval, roundToNearestMinutes } from "date-fns";
import { TimetableStateContext } from "../contexts/TimetableContext";

/**
 * Use `undefined` for 1-hour precision,
 * @see https://date-fns.org/v2.25.0/docs/roundToNearestMinutes
 */
const minutePrecision = {
  nearestTo: 30,
};

const defaultDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TimetableWrapper = styled.div`
  max-height: ${({ maxHeight }: { maxHeight: string }) => maxHeight};
`;
const Wrapper = styled.div`
  height: ${({ height }: { height: string }) => height};
`;

/**
 *
 * @param courses - Array of courses
 * @param timeInterval - The start and end time with precision equals `minutePrecision`.
 * For example, if `timeInterval.start = 07:12:00` and `minutePrecision = 15`
 * => `roundedTimeInterval.start = 07:15:00`
 * @param weekStartOnSunday
 * @param minutesPerCell
 * @param cellHeight
 */
export default function Timetable({
  courses = [],
  timeStart,
  timeEnd,
  weekStartOnSunday,
  minutesPerCell,
  cellHeight,
}: {
  courses: Course[];
  timeStart: Date;
  timeEnd: Date;
  weekStartOnSunday: boolean;
  minutesPerCell: number;
  cellHeight: Size;
}) {
  const days = defaultDays;
  const dayColumns = mapCourseToDayOfWeek(courses);
  const roundedStart = roundToNearestMinutes(timeStart, minutePrecision);
  const roundedEnd = roundToNearestMinutes(timeEnd, minutePrecision);
  const timemarks = eachMinuteOfInterval(
    { start: roundedStart, end: roundedEnd },
    { step: minutesPerCell }
  );
  const totalHeight = {
    value: cellHeight.value * timemarks.length,
    unit: cellHeight.unit,
  };
  // Move Sunday to the back
  if (!weekStartOnSunday) {
    days.push(days.shift()!);
    dayColumns.push(dayColumns.shift()!);
  }

  const timetableState = useMemo(
    (): TimetableState => ({
      timeStart: roundedStart,
      timeEnd: roundedEnd,
      minutesPerVertUnit: minutesPerCell / cellHeight.value,
      vertUnit: cellHeight.unit,
    }),
    [roundedStart, roundedEnd, minutesPerCell, cellHeight]
  );

  return (
    <TimetableStateContext.Provider value={timetableState}>
      <TimetableWrapper
        className="timetable"
        maxHeight={sizeToString(totalHeight)}
      >
        <Header days={days} />
        <Timeline timemarks={timemarks} height={totalHeight} />
        <div className="timetable-body">
          <Grid
            rowCount={timemarks.length}
            columnCount={days.length}
            height={totalHeight}
          />
          <EventGrid dayColumns={dayColumns} />
        </div>
      </TimetableWrapper>
    </TimetableStateContext.Provider>
  );
}

function Header({ days }: { days: String[] }) {
  return (
    <div className="timetable-header">
      {days.map((value, i) => (
        <div key={i}>{value}</div>
      ))}
    </div>
  );
}

function Timeline({ timemarks, height }: { timemarks: Date[]; height: Size }) {
  return (
    <Wrapper className="timeline" height={sizeToString(height)}>
      {timemarks.map((date, i) => (
        <div key={i}>{format(date, "HH:mm")}</div>
      ))}
    </Wrapper>
  );
}

function Grid({
  rowCount,
  columnCount,
  height,
}: {
  rowCount: number;
  columnCount: number;
  height: Size;
}) {
  const cells = [];
  for (let i = 0; i < rowCount; i++) {
    cells.push(<div key={i}></div>);
  }
  const cols = [];
  for (let i = 0; i < columnCount; i++) {
    cols.push(<div key={i}>{cells}</div>);
  }
  return (
    <Wrapper className="timetable-grid" height={sizeToString(height)}>
      {cols}
    </Wrapper>
  );
}

function EventGrid({ dayColumns }: { dayColumns: CourseEvent[][] }) {
  return (
    <div className="event-grid">
      {dayColumns.map((events, i) => (
        <DayColumn key={i} events={events} />
      ))}
    </div>
  );
}
